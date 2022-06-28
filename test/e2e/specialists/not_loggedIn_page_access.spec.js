describe('未ログインのケアマネがアクセスできる画面にすべてアクセスできる', () => {
  let page

  beforeAll(async () => {
    page = await browser.newPage()
  })

  afterAll(async () => {
    await page.close()
  })

  it('新規登録画面をエラーなくレンダリングできている', async () => {
    await page.goto('http://localhost:9000/specialists/users/new')
    const url = await page.mainFrame().url()
    const ele = await page.$('h6')
    const titleText = await page.evaluate((elm) => elm.textContent, ele)
    await expect(url).toEqual('http://localhost:9000/specialists/users/new')
    await expect(titleText).toEqual('新規登録')
  })

  it('ログイン画面をエラーなくレンダリングできている', async () => {
    await page.goto('http://localhost:9000/specialists/login')
    const url = await page.mainFrame().url()
    const ele = await page.$('h6')
    const titleText = await page.evaluate((elm) => elm.textContent, ele)
    await expect(url).toEqual('http://localhost:9000/specialists/login')
    await expect(titleText).toEqual('ログイン')
  })

  it('プライバシーポリシー画面をエラーなくレンダリングできている', async () => {
    await page.goto('http://localhost:9000/specialists/privacy_policy')
    const url = await page.mainFrame().url()
    const ele = await page.$('h4')
    const titleText = await page.evaluate((elm) => elm.textContent, ele)
    await expect(url).toEqual(
      'http://localhost:9000/specialists/privacy_policy'
    )
    await expect(titleText).toEqual('プライバシーポリシー')
  })

  it('利用規約画面をエラーなくレンダリングできている', async () => {
    await page.goto('http://localhost:9000/specialists/terms')
    const url = await page.mainFrame().url()
    const ele = await page.$('h4')
    const titleText = await page.evaluate((elm) => elm.textContent, ele)
    await expect(url).toEqual('http://localhost:9000/specialists/terms')
    await expect(titleText).toEqual('利用規約')
  })

  it('お問い合わせ画面をエラーなくレンダリングできている', async () => {
    await page.goto('http://localhost:9000/specialists/contacts/new')
    const url = await page.mainFrame().url()
    const ele = await page.$('h4')
    const titleText = await page.evaluate((elm) => elm.textContent, ele)
    await expect(url).toEqual('http://localhost:9000/specialists/contacts/new')
    await expect(titleText).toEqual('お問い合わせ')
  })
})
