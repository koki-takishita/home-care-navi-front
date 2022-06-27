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
    const text = await page.evaluate(() => document.body.textContent)
    await expect(text).toContain('安心して介護をお願いしたいから')
  })

  it('新規登録画面をエラーなくレンダリングできている', async () => {
    await page.goto('http://127.0.0.1:9000/users/new')
    const text = await page.evaluate(() => document.body.textContent)
    await expect(text).toContain('新規登録')
  })

  it('ログイン画面をエラーなくレンダリングできている', async () => {
    await page.goto('http://127.0.0.1:9000/users/login')
    const text = await page.evaluate(() => document.body.textContent)
    await expect(text).toContain('ログイン')
  })

  it('プライバシーポリシー画面をエラーなくレンダリングできている', async () => {
    await page.goto('http://127.0.0.1:9000/users/privacy_policy')
    const text = await page.evaluate(() => document.body.textContent)
    await expect(text).toContain('プライバシーポリシー')
  })

  it('利用規約画面をエラーなくレンダリングできている', async () => {
    await page.goto('http://127.0.0.1:9000/users/terms')
    const text = await page.evaluate(() => document.body.textContent)
    await expect(text).toContain('利用規約')
  })

  it('お問い合わせ画面をエラーなくレンダリングできている', async () => {
    await page.goto('http://127.0.0.1:9000/users/contacts/new')
    const text = await page.evaluate(() => document.body.textContent)
    await expect(text).toContain('お問い合わせ')
  })
})
