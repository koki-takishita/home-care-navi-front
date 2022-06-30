let page
let url
let text
let ele
let titleText
const randomNum = require('../randomNum')
describe('ケアマネージャーが事業所を登録できる', () => {
  beforeAll(async () => {
    page = await browser.newPage()
  })

  afterAll(async () => {
    await page.close()
  })

  it('事業所登録画面からフォームに値を入力する', async () => {
    await page.goto('http://localhost:9000/specialists/office/new')
    url = await page.mainFrame().url()
    ele = await page.$('h3')
    titleText = await page.evaluate((elm) => elm.textContent, ele)
    await expect(url).toEqual('http://localhost:9000/specialists/office/new')
    await expect(titleText).toContain('事業所登録')

    await expect(await page.$eval('#send', (el) => el.disabled)).toBe(true)
    await page.click('#name')
    const name = require('../randomName')
    await page.keyboard.sendCharacter(name('ケアパーク'))
    await page.click('#title')
    await page.keyboard.sendCharacter('事業所紹介タイトル')
    await page.click('#title_detail')
    await page.keyboard.sendCharacter('事業所の特徴テキスト')
    await page.click('#日')
    await page.click('#土')
    await page.click('#business_day_detail')
    await page.keyboard.sendCharacter('営業日に関する説明')
    await page.click('#phone_number')
    const phoneNumber =
      '080' + '-' + randomNum(9999, 1000) + '-' + randomNum(9999, 1000)
    await page.keyboard.sendCharacter(phoneNumber)
    await page.click('#fax_number')
    const faxNumber =
      '090' + '-' + randomNum(9999, 1000) + '-' + randomNum(9999, 1000)
    await page.keyboard.sendCharacter(faxNumber)
    await page.click('#post_code')
    const postCode = randomNum(999, 100) + '-' + randomNum(9999, 1000)
    await page.keyboard.sendCharacter(postCode)
    await page.click('#address')
    await page.keyboard.sendCharacter('東京都世田谷区祖父谷4-3-15')
    await page.click('#service_type')
    await page.keyboard.sendCharacter('介護付きホーム')
    await expect(await page.$eval('#send', (el) => el.disabled)).toBe(false)
  })

  it('登録ボタンを押し、登録後、事業所編集画面に遷移する', async () => {
    await Promise.all([
      page.waitForNavigation({ timeout: 5000, waitUntil: 'load' }),
      await page.click('#send'),
    ])
    url = await page.mainFrame().url()
    text = await page.evaluate(() => document.body.textContent)
    // URLに含まれている事業所IDを取得できないため、部分一致でURLの確認を行う
    await expect(url).toContain('http://localhost:9000/specialists/office')
    await expect(url).toContain('edit')
    await expect(text).toContain('事業所編集')
    // 登録した事業所名が取得できているか
    await expect(text).toContain('ケアパーク')
  })
})
