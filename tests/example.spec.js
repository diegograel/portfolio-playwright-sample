// @ts-check
import { test, expect } from '@playwright/test';

test('dashboard displayed', async ({ page }) => {
  await page.goto('https://www.bestbuy.ca/en-ca/', { waitUntil: 'domcontentloaded'});

  // Expect a text on the dashboard.
  await page.getByText('My Best Buy Account');
});

test('find search box', async ({ page }) => {
  await page.goto('https://www.bestbuy.ca/en-ca/', { waitUntil: 'domcontentloaded'});
  await page.getByRole('button', { name: 'Close' }).click();

  // Click and fill search box.
  await page.getByTestId('search-input').click();
  await page.getByTestId('search-input').fill('apple airpod pro');
  await page.getByTestId('search-submit').click();
  await expect(page.locator('h1')).toContainText('Results for: air pods pro');
  //await expect(page.getByRole('heading', { name: 'Results for: air pods pro' })).toBeVisible();
  //await page.locator('[id="17543757-2-0-caption"]').getByRole('link', { name: 'Open Box - Apple AirPods Pro' }).click();
  //await expect(page.getByRole('link', { name: 'Open Box - Apple AirPods Pro (2nd generation) Noise Cancelling True Wireless Earbuds with USB-C MagSafe Charging Case (18 Reviews)', exact: true})).toBeVisible();
  await page.getByRole('link', { name: 'Open Box - Apple AirPods Pro (2nd generation) Noise Cancelling True Wireless Earbuds with USB-C MagSafe Charging Case'}).click();

  // Assert the correct one was clicked
  await expect(page.locator('h1')).toContainText('Open Box - Apple AirPods Pro (2nd generation) Noise Cancelling True Wireless Earbuds with USB-C MagSafe Charging Case', {timeout:3000});
});

