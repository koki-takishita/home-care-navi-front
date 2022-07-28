let page
let url
let text
let ele
let titleText
let name
const kana = 'すたっふ'
let introduction
const randomName = require('../randomName')
describe('ケアマネージャーがスタッフを登録できる', () => {
  beforeAll(async () => {
    page = await browser.newPage()
  })

  afterAll(async () => {
    await page.close()
  })

  it('事業所編集画面に遷移する', async () => {
    await page.goto('http://localhost:8000/specialists/office/edit')
    await page.waitForTimeout(1000)
    url = await page.mainFrame().url()
    ele = await page.$('h3')
    text = await page.evaluate(() => document.body.textContent)
    await expect(url).toEqual('http://localhost:8000/specialists/office/edit')
    await expect(text).toContain('事業所編集')
    await expect(text).toContain('ケアパーク')
  })

  it('ヘッダーからスタッフ登録画面に遷移する', async () => {
    await page.click('#menu')
    await page.evaluate(() => {
      document
        .querySelector('a[href="/specialists/office/staffs?page=1"]')
        .click()
    })
    await page.waitForTimeout(1000)
    url = await page.mainFrame().url()
    ele = await page.$('h3')
    titleText = await page.evaluate((elm) => elm.textContent, ele)
    await expect(url).toEqual(
      'http://localhost:8000/specialists/office/staffs?page=1'
    )
    await expect(titleText).toContain('スタッフ情報')
  })

  it('「スタッフを追加する」ボタンを押し、登録画面に遷移する', async () => {
    await page.click('a[href$="staffs/new"]')
    url = await page.mainFrame().url()
    ele = await page.$('h3')
    titleText = await page.evaluate((elm) => elm.textContent, ele)
    await expect(url).toEqual(
      'http://localhost:8000/specialists/office/staffs/new'
    )
    await expect(titleText).toContain('スタッフ登録')
  })

  it('フォームに値を入力する', async () => {
    await expect(await page.$eval('#send', (el) => el.disabled)).toBe(true)
    await page.click('#name')
    name = randomName('スタッフ')
    await page.keyboard.sendCharacter(name)
    await page.click('#kana')
    await page.keyboard.sendCharacter(kana)
    await page.click('#introduction')
    introduction = name + 'の紹介文が入ります。'
    await page.keyboard.sendCharacter(introduction)
    await expect(await page.$eval('#send', (el) => el.disabled)).toBe(false)
  })

  it('登録ボタンを押し、一覧画面に遷移する', async () => {
    await Promise.all([
      page.waitForNavigation({ timeout: 6000, waitUntil: 'load' }),
      await page.click('#send'),
    ])
    await page.waitForTimeout(1000)
    url = await page.mainFrame().url()
    ele = await page.$('h3')
    titleText = await page.evaluate((elm) => elm.textContent, ele)
    await expect(url).toEqual(
      'http://localhost:8000/specialists/office/staffs?page=1'
    )
    await expect(titleText).toContain('スタッフ情報')
  })

  it('登録したスタッフが一覧に表示される', async () => {
    text = await page.evaluate(() => document.body.textContent)
    await expect(text).toContain(name)
    await expect(text).toContain(kana)
    await expect(text).toContain(introduction)
  })

  it('編集ボタンを押し、編集画面に遷移する', async () => {
    await page.click('#edit')
    url = await page.mainFrame().url()
    text = await page.evaluate(() => document.body.textContent)
    ele = await page.$('h3')
    titleText = await page.evaluate((elm) => elm.textContent, ele)
    await expect(url).toContain(
      'http://localhost:8000/specialists/office/staffs'
    )
    await expect(url).toContain('edit')
    await expect(titleText).toContain('スタッフ情報編集')
  })

  it('フォームに値を入力する', async () => {
    await page.click('#introduction')
    const addIntroduction = '更新しました。'
    await page.keyboard.sendCharacter(addIntroduction)
    introduction += addIntroduction
  })

  it('変更ボタンを押し、一覧画面に遷移する', async () => {
    await Promise.all([
      page.waitForNavigation({ timeout: 6000, waitUntil: 'load' }),
      await page.click('#send'),
    ])
    await page.waitForTimeout(1000)
    url = await page.mainFrame().url()
    ele = await page.$('h3')
    titleText = await page.evaluate((elm) => elm.textContent, ele)
    await expect(url).toEqual(
      'http://localhost:8000/specialists/office/staffs?page=1'
    )
    await expect(titleText).toContain('スタッフ情報')
  })

  it('変更したスタッフが一覧に表示される', async () => {
    text = await page.evaluate(() => document.body.textContent)
    await expect(text).toContain(name)
    await expect(text).toContain(kana)
    await expect(text).toContain(introduction)
  })

  it('削除ボタンを押し、スタッフを削除する', async () => {
    await page.click('#modal')
    await Promise.all([
      page.waitForNavigation({ timeout: 6000, waitUntil: 'load' }),
      await page.click('#delete'),
    ])
    await page.waitForTimeout(1000)
    text = await page.evaluate(() => document.body.textContent)
    await expect(text).not.toContain(name)
    await expect(text).not.toContain(kana)
    await expect(text).not.toContain(introduction)
  })
})
