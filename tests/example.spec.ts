import { test, expect, Page } from 'playwright/test';

const BASE_URL = 'https://webix.com/demos/bank-app/#!/top/transactions';

let page: Page;

test.beforeEach(async ({ browser }) => {
    var context = await browser.newContext();
    page = await context.newPage();
    await page.goto(BASE_URL);
});

//completed
test('Verify page URL', { tag: '@regression'} ,async () => {
    await expect(page).toHaveURL(BASE_URL);
    console.log("Executed: Verify page URL");
});

test('Verify page title',  { tag: '@regression'},  async () => {
    await expect(page).toHaveTitle(/Webix Banking App/i);
    console.log("Executed: Verify page title");
});

//completed
test('Filter transactions by type (Incoming)', async () => {
    // Click the "Incoming" filter button
    await page.locator('button[button_id="1"]').click();

    // Wait for UI to update after applying filter
    await page.waitForLoadState('domcontentloaded');

    // Ensure transactions are filtered by counting rows
    const rows = await page.locator("//div[@class='webix_column  webix_first webix_select_mark']/div").count();
    
    
    // Expect at least one transaction to be displayed
    expect(rows).toBeGreaterThan(0);

    console.log("Executed: Filter transactions by type (Incoming) tests");    
});

//completed
test('Sort transactions by amount (Sum)', async () => {

    // Get the first amount value after sorting
    const firstAmountBeforeSort = await page.locator("(//div[@class='webix_column '])[4]/div[1]").textContent();
    //console.log("firstAmountBeforeSort: ", firstAmountBeforeSort);
    
    await page.waitForTimeout(3000);

    // Click the "Amount" column header
    page.locator('//div[contains(@class, "webix_hcell") and text()="Sum"]').click();

    await page.waitForTimeout(3000);

    // Wait for sorting to reflect
    await page.waitForSelector('.webix_dtable');

    // Get the first amount value after sorting
    const firstAmountAfterSort = await page.locator("(//div[@class='webix_column '])[4]/div[1]").textContent();
    //console.log("firstAmountAfterSort: ", firstAmountAfterSort);
    
    await page.waitForTimeout(3000);

    // Ensure that the first amount value is not null
    expect(firstAmountAfterSort).not.toBeNull();

    console.log("Executed: Sort transactions by amount (Sum) tests");
    
});

//completed
test('Retrive Total Payment based on Payment History', async () => {
    await page.locator("//div[@webix_tm_id='payhistoryview']/span[text()='Payment History']").click();
    await page.waitForTimeout(1000);
    
    let totalPaymentBeforeSplit = await page.locator("//div[@class='webix_hcolumn']/div[@class='webix_hcell webix_last webix_last_row']").nth(1).innerText();
    let totalPaymanetAfterSplit = totalPaymentBeforeSplit.split('$');
    let totalPayment = totalPaymanetAfterSplit[1];
    //console.log("totalPayment: ", totalPayment);

    console.log("Execuuted: Retrive Total Payment based on Payment History tests");
    
    
});

//completed
test('Test Notification', async () => {

    await page.locator("//button[@class='webix_icon_button']/following::span[@class='webix_badge']").click();
    await page.waitForTimeout(3000);
    var notifications = await page.locator("//span[@class='message']").allTextContents();
    for (let i = 0; i < notifications.length; i++) {
        const notification = notifications[i];
        //console.log(notification);
    } 

    expect(notifications.length).toBeGreaterThan(0);

    console.log("Executed: Test Notification tests");
    
});

//completed
test('Verify Add Customer Flow',  { tag: '@regression'},async()=>{

  await page.locator("//div[@webix_tm_id='customers']").click();
  await page.getByPlaceholder('First name').fill("First Name");
  await page.getByPlaceholder('Last name').fill("Last Name");
  await page.getByPlaceholder('Address').fill("Address");
  await page.getByPlaceholder('Address').fill("test@test.com");

  await page.getByRole('button', {name: 'Save'}).click();

  await expect(page.locator("//div[@class='webix_message webix_info']")).toBeVisible();

  //console.log("User Profile Created");

  console.log("Executed: Verify Add Customer Flows");
  
});
