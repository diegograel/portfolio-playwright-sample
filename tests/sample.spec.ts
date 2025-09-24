import { test, expect, Page } from '@playwright/test';

async function reachHomeScreen(page: Page){
    await page.goto('https://www.bestbuy.ca/en-ca');
    await expect(page.getByRole('heading', { name: 'Your privacy is important.' })).toBeVisible();
    await page.getByRole('button', { name: 'Close' }).click();
    await expect(page.getByTestId('search-input')).toBeVisible();
}

test('successfully reach home screen', async ({page}) =>{
    await reachHomeScreen(page)
    await expect(page).toHaveTitle(/Best Buy: Shop Online For Deals & Save | Best Buy Canada/)
})

test('search for an item at the home screen', async({page})=> {
    await reachHomeScreen(page)
    //await page.getByTestId('search-input').click()
    await page.getByTestId('search-input').fill('playstation 5')
    // await expect(page.getByText('Popular results for "')).toBeVisible()
    await expect(page.getByText(/Popular results/)).toBeVisible({timeout: 10000})
    //await page.getByRole('link', { name: 'PlayStation 5 Slim Digital Edition - 30th Anniversary Limited Edition Bundle (8' }).click()
    await page.getByRole('link', { name: /PlayStation 5 Slim/ }).nth(0).click();
    //await expect(page.getByText(/PlayStation 5 Slim/)).toBeVisible({timeout: 10000})
    await expect(page.getByRole('heading', { name: /PlayStation 5 Slim/ })).toBeVisible({ timeout: 15000 });
})