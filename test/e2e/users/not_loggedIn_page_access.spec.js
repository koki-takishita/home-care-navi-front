describe('未ログインのユーザーがアクセスできる画面にすべてアクセスできる', () => {
  let page

  beforeAll(async () => {
    page = await browser.newPage()
  })

  afterAll(async () => {
    await page.close()
  })

  it('プライバシーポリシー画面をエラーなくレンダリングできている', async () => {
    await page.goto('http://localhost:9000/users/privacy_policy')
    const url = await page.mainFrame().url()
    const ele = await page.$('h4')
    const titleText = await page.evaluate((elm) => elm.textContent, ele)
    await expect(url).toEqual('http://localhost:9000/users/privacy_policy')
    await expect(titleText).toEqual('プライバシーポリシー')
  })

  it('利用規約画面をエラーなくレンダリングできている', async () => {
    await page.goto('http://localhost:9000/users/terms')
    const url = await page.mainFrame().url()
    const ele = await page.$('h4')
    const titleText = await page.evaluate((elm) => elm.textContent, ele)
    await expect(url).toEqual('http://localhost:9000/users/terms')
    await expect(titleText).toEqual('利用規約')
  })

  it('お問い合わせ画面をエラーなくレンダリングできている', async () => {
    await page.goto('http://localhost:9000/users/contacts/new')
    const url = await page.mainFrame().url()
    const ele = await page.$('h4')
    const titleText = await page.evaluate((elm) => elm.textContent, ele)
    await expect(url).toEqual('http://localhost:9000/users/contacts/new')
    await expect(titleText).toEqual('お問い合わせ')
  })
})
