describe('未ログインのユーザーがアクセスできる画面', () => {
  let page

  beforeAll(async () => {
    page = await browser.newPage()
  })

  afterAll(async () => {
    await page.close()
  })

  it('トップ画面をエラーなくレンダリングできている', async () => {
    await page.goto('http://127.0.0.1:9000')
    const url = await page.mainFrame().url()
    const text = await page.evaluate(() => document.body.textContent)
    await expect(url).toEqual('http://127.0.0.1:9000/')
    await expect(text).toContain('安心して介護をお願いしたいから')
  })

  it('新規登録画面をエラーなくレンダリングできている', async () => {
    await page.goto('http://127.0.0.1:9000/users/new')
    const url = await page.mainFrame().url()
    const ele = await page.$('h6')
    const titleText = await page.evaluate((elm) => elm.textContent, ele)
    await expect(url).toEqual('http://127.0.0.1:9000/users/new')
    await expect(titleText).toEqual('新規登録')
  })

  it('ログイン画面をエラーなくレンダリングできている', async () => {
    await page.goto('http://127.0.0.1:9000/users/login')
    const url = await page.mainFrame().url()
    const ele = await page.$('h6')
    const titleText = await page.evaluate((elm) => elm.textContent, ele)
    await expect(url).toEqual('http://127.0.0.1:9000/users/login')
    await expect(titleText).toEqual('ログイン')
  })

  it('プライバシーポリシー画面をエラーなくレンダリングできている', async () => {
    await page.goto('http://127.0.0.1:9000/users/privacy_policy')
    const url = await page.mainFrame().url()
    const ele = await page.$('h4')
    const titleText = await page.evaluate((elm) => elm.textContent, ele)
    await expect(url).toEqual('http://127.0.0.1:9000/users/privacy_policy')
    await expect(titleText).toEqual('プライバシーポリシー')
  })

  it('利用規約画面をエラーなくレンダリングできている', async () => {
    await page.goto('http://127.0.0.1:9000/users/terms')
    const url = await page.mainFrame().url()
    const ele = await page.$('h4')
    const titleText = await page.evaluate((elm) => elm.textContent, ele)
    await expect(url).toEqual('http://127.0.0.1:9000/users/terms')
    await expect(titleText).toEqual('利用規約')
  })

  it('お問い合わせ画面をエラーなくレンダリングできている', async () => {
    await page.goto('http://127.0.0.1:9000/users/contacts/new')
    const url = await page.mainFrame().url()
    const ele = await page.$('h4')
    const titleText = await page.evaluate((elm) => elm.textContent, ele)
    await expect(url).toEqual('http://127.0.0.1:9000/users/contacts/new')
    await expect(titleText).toEqual('お問い合わせ')
  })
})
