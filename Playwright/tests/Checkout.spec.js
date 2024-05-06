const {test, expect} = require('@playwright/test')

test("Add To Cart", async function({page}){
    await page.waitForTimeout(3000)
    await page.getByPlaceholder("Search Food Mine!").fill("Meatball")
    await page.locator('button:has-text("Search")').click()
    await page.waitForTimeout(3000)
    await page.locator("img[src='assets/food-2.jpg']").click()
    await page.waitForTimeout(3000)
    await page.locator('button:has-text("Add To Cart")').click()
    await page.waitForTimeout(3000)
    
    await page.locator("a[routerlink='/checkout']").click()
 
})