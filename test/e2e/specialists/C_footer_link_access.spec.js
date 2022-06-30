describe('ケアマネージャーがフッターのリンクにすべてアクセスできる', () => {
  let page
  let url
  let ele
  let titleText

  beforeAll(async () => {
    page = await browser.newPage()
  })

  afterAll(async () => {
    await page.close()
  })

  it('ログイン画面に遷移し、フッターからプライバシーポリシー画面に遷移する', async () => {
    await page.goto('http://localhost:9000/specialists/login')
    url = await page.mainFrame().url()
    ele = await page.$('h6')
    titleText = await page.evaluate((elm) => elm.textContent, ele)
    await expect(url).toEqual('http://localhost:9000/specialists/login')
    await expect(titleText).toEqual('ログイン')

    await page.click('a[href="/specialists/privacy_policy"]')
    url = await page.mainFrame().url()
    ele = await page.$('h4')
    titleText = await page.evaluate((elm) => elm.textContent, ele)
    await expect(url).toEqual(
      'http://localhost:9000/specialists/privacy_policy'
    )
    await expect(titleText).toEqual('プライバシーポリシー')
  })

  it('フッターから利用規約画面に遷移する', async () => {
    await page.click('a[href="/specialists/terms"]')
    url = await page.mainFrame().url()
    ele = await page.$('h4')
    titleText = await page.evaluate((elm) => elm.textContent, ele)
    await expect(url).toEqual('http://localhost:9000/specialists/terms')
    await expect(titleText).toEqual('利用規約')
  })

  it('フッターからお問い合わせ画面に遷移する', async () => {
    await page.click('a[href="/specialists/contacts/new"]')
    url = await page.mainFrame().url()
    ele = await page.$('h4')
    titleText = await page.evaluate((elm) => elm.textContent, ele)
    await expect(url).toEqual('http://localhost:9000/specialists/contacts/new')
    await expect(titleText).toEqual('お問い合わせ')
  })

  describe('ケアマネージャーがログアウトをする', () => {
    it('ログアウトボタンを押し、ログアウトする', async () => {
      await page.click('#header-logout')

      url = await page.mainFrame().url()
      const loginBtn = await page.$eval('#header-login', (item) => {
        return item.textContent
      })
      ele = await page.$('h6')
      titleText = await page.evaluate((elm) => elm.textContent, ele)
      await expect(url).toEqual('http://localhost:9000/specialists/login')
      await expect(loginBtn).toEqual('ログイン')
      await expect(titleText).toEqual('ログイン')
    })
  })
})
