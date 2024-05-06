const {test, expect} = require('@playwright/test')

test("To Verify Title", async function({page}){

    await page.goto("http://localhost:4200/")
    const url= page.url
    console.log("Title is "+url)

    const title = await page.title
    console.log("Title is "+title)

    await expect(page).toHaveTitle("Frontend")
})