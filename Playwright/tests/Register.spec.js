const {test, expect} = require('@playwright/test')

test("Verify Error Message", async function({page}){
    await page.goto("http://localhost:4200/register")
    await page.waitForTimeout(3000)
    await page.locator("button[type='submit']").click()

    const errorMessage= await page.locator("//div[@class='error-list']").first().textContent()
    console.log("Error Message is "+errorMessage)
    expect(errorMessage.includes(" Should not")).toBeTruthy
    
})


test("Register a new User", async function({page}){
    await page.goto("http://localhost:4200/register")
    await page.waitForTimeout(3000)
    await page.locator("input[placeholder='Name']").fill("Vaibhav")
    await page.locator("input[placeholder='Email']").fill("payal1166@example.com")
    await page.locator("input[placeholder='Password']").fill("password")
    await page.locator("input[placeholder='Confirm Password']").fill("password")
    await page.locator("input[placeholder='Address']").fill("123 Street, City")
    await page.locator("button[type='submit']").click()

    await page.waitForTimeout(3000)

    await expect(page).toHaveTitle("Frontend")

})