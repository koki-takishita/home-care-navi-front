describe('ユーザーがフッターのリンクにすべてアクセスできる', () => {
  let page
  let url
  let text
  let ele
  let titleText

  beforeAll(async () => {
    page = await browser.newPage()
  })

  afterAll(async () => {
    await page.close()
  })

  it('TOP画面に遷移し、フッターからプライバシーポリシー画面に遷移する', async () => {
    await page.goto('http://localhost:9000/')
    url = await page.mainFrame().url()
    text = await page.evaluate(() => document.body.textContent)
    await expect(url).toEqual('http://localhost:9000/')
    await expect(text).toContain('安心して介護をお願いしたいから')

    await page.click('a[href="/users/privacy_policy"]')
    url = await page.mainFrame().url()
    ele = await page.$('h4')
    titleText = await page.evaluate((elm) => elm.textContent, ele)
    await expect(url).toEqual('http://localhost:9000/users/privacy_policy')
    await expect(titleText).toEqual('プライバシーポリシー')
  })

  it('フッターから利用規約画面に遷移する', async () => {
    await page.click('a[href="/users/terms"]')
    url = await page.mainFrame().url()
    ele = await page.$('h4')
    titleText = await page.evaluate((elm) => elm.textContent, ele)
    await expect(url).toEqual('http://localhost:9000/users/terms')
    await expect(titleText).toEqual('利用規約')
  })

  it('フッターからお問い合わせ画面に遷移する', async () => {
    await page.click('a[href="/users/contacts/new"]')
    url = await page.mainFrame().url()
    ele = await page.$('h4')
    titleText = await page.evaluate((elm) => elm.textContent, ele)
    await expect(url).toEqual('http://localhost:9000/users/contacts/new')
    await expect(titleText).toEqual('お問い合わせ')
  })
})
