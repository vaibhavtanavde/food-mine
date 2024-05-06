const {test, expect} = require('@playwright/test')

test("Remove from Cart", async function({page}){
    await page.waitForTimeout(3000)
    await page.locator("button[class='remove-button']").click()
    await page.waitForTimeout(3000)
    await page.locator("a[class='logo']").click()

    await expect(page).toHaveTitle("Frontend")
})