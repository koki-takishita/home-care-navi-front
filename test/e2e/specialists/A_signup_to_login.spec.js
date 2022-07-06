let page
let text
let url
let ele
let titleText
const randomNum = require('../randomNum')
let email
const password = 'password'
describe('ケアマネージャーが新規登録してログインできる', () => {
  beforeAll(async () => {
    page = await browser.newPage()
  })

  afterAll(async () => {
    await page.close()
  })

  it('TOP画面からログインボタンを押し、ユーザーのログイン画面に遷移する', async () => {
    await page.goto('http://localhost:8000/')
    url = await page.mainFrame().url()
    text = await page.evaluate(() => document.body.textContent)
    await expect(url).toEqual('http://localhost:8000/')
    await expect(text).toContain('安心して介護をお願いしたいから')
    await page.click('a[href="/users/login"]')

    url = await page.mainFrame().url()
    ele = await page.$('h6')
    titleText = await page.evaluate((elm) => elm.textContent, ele)
    await expect(url).toEqual('http://localhost:8000/users/login')
    await expect(titleText).toEqual('ログイン')
  })

  it('ユーザーのログイン画面から、ケアマネージャーのログイン画面に遷移する', async () => {
    await page.click('a[href="/specialists/login/"]')
    url = await page.mainFrame().url()
    ele = await page.$('h6')
    titleText = await page.evaluate((elm) => elm.textContent, ele)
    await expect(url).toEqual('http://localhost:8000/specialists/login/')
    await expect(titleText).toEqual('ログイン')
  })

  it('ログイン画面から、新規登録画面に遷移する', async () => {
    await page.click('#header-signup')
    url = await page.mainFrame().url()
    ele = await page.$('h6')
    titleText = await page.evaluate((elm) => elm.textContent, ele)
    await expect(url).toEqual('http://localhost:8000/specialists/users/new')
    await expect(titleText).toEqual('新規登録')
  })

  it('フォームに値を入力する', async () => {
    // 何も入力してないときに、登録ボタンを押せなくなっているか
    await expect(await page.$eval('#send', (el) => el.disabled)).toBe(true)

    await page.click('#name')
    const name = require('../randomName')
    await page.keyboard.sendCharacter(name('スペシャリスト'))
    await page.click('#email')
    email = 'specialist' + randomNum(9999999, 1000) + '@example.com'
    await page.keyboard.sendCharacter(email)
    await page.click('#password')
    await page.keyboard.sendCharacter(password)
    await page.click('#password_confirm')
    await page.keyboard.sendCharacter(password)
    await page.click('#phone_number')
    const phoneNumber =
      '080' + '-' + randomNum(9999, 1000) + '-' + randomNum(9999, 1000)
    await page.keyboard.sendCharacter(phoneNumber)
    await page.click('#post_code')
    const postCode = randomNum(999, 100) + '-' + randomNum(9999, 1000)
    await page.keyboard.sendCharacter(postCode)
    await page.click('#address')
    await page.keyboard.sendCharacter('新潟県佐渡市秋津417-9')

    // 必須入力項目をすべて入力したら、登録ボタンを押せるようになっているか
    await expect(await page.$eval('#send', (el) => el.disabled)).toBe(false)
  })

  it('登録ボタンを押し、仮登録完了画面に遷移する', async () => {
    await Promise.all([
      page.waitForNavigation({ timeout: 6000, waitUntil: 'load' }),
      page.click('#send'),
    ])
    url = await page.mainFrame().url()
    ele = await page.$('h1')
    titleText = await page.evaluate((elm) => elm.textContent, ele)
    await expect(url).toEqual('http://localhost:8000/specialists/users/send')
    await expect(titleText).toEqual('仮登録完了')
  })

  it('メールキャッチャーにアクセスし、届いたメールからアカウントの有効化をする', async () => {
    await page.goto('http://localhost:1080/')
    url = await page.mainFrame().url()
    ele = await page.$('h1')
    titleText = await page.evaluate((elm) => elm.textContent, ele)
    await expect(url).toEqual('http://localhost:1080/')
    await expect(titleText).toEqual('MailCatcher')

    await page.click('tr[data-message-id]')
    const count = await page.$$eval('tr', (ele) => ele.length)
    await page.goto(`http://localhost:1080/messages/${count - 1}.html`)
    url = await page.mainFrame().url()
    await expect(url).toEqual(
      `http://localhost:1080/messages/${count - 1}.html`
    )
    const bodyText = await page.$eval('body', (item) => {
      return item.textContent
    })
    await expect(bodyText).toContain(email)
    await expect(bodyText).toContain('スペシャリスト')
    await expect(bodyText).toContain('アカウントを有効化する')
    await page.click('a[href^="http://localhost:3000/api/users/confirmation?"]')

    url = await page.mainFrame().url()
    ele = await page.$('h6')
    titleText = await page.evaluate((elm) => elm.textContent, ele)
    await expect(url).toEqual(
      'http://localhost:8000/specialists/login?account_confirmation_success=true'
    )
    await expect(titleText).toEqual('ログイン')
  })

  it('フォームに値を入力する', async () => {
    await page.click('#email')
    await page.keyboard.sendCharacter(email)
    await page.click('#password')
    await page.keyboard.sendCharacter(password)
  })

  it('ログインボタンを押し、事業所登録画面に遷移する', async () => {
    await Promise.all([
      page.waitForNavigation({ timeout: 6000, waitUntil: 'load' }),
      await page.click('#login'),
    ])
    url = await page.mainFrame().url()
    ele = await page.$('h3')
    titleText = await page.evaluate((elm) => elm.textContent, ele)
    const logoutBtn = await page.$eval('#header-logout', (item) => {
      return item.textContent
    })
    await expect(url).toEqual('http://localhost:8000/specialists/office/new')
    await expect(titleText).toContain('事業所登録')
    await expect(logoutBtn).toEqual('ログアウト')
  })
})
