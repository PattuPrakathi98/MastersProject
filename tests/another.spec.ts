import { test, expect, Page } from 'playwright/test';

const BASE_URL = 'https://webix.com/demos/bank-app/#!/top/transactions';

let page: Page;

test.beforeEach(async ({ browser }) => {
    var context = await browser.newContext();
    page = await context.newPage();
    await page.goto(BASE_URL);
});

//completed
test('Verify title another time',  { tag: '@regression'},async () => {
    await expect(page).toHaveURL(BASE_URL);
    await expect(page).toHaveTitle(/Webix Banking App/i);
    console.log("Executed: Re-running regression tc");
});

test('Verify title', async () => {
    await expect(page).toHaveURL(BASE_URL);
    await expect(page).toHaveTitle(/Webix Banking App/i);
    console.log("Executed: Non-regression");
});

test('Newly added one', async () => {
    await expect(page).toHaveURL(BASE_URL);
    await expect(page).toHaveTitle(/Webix Banking App/i);
    console.log("Executed: Newly added one");
});


