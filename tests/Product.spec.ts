import {test , expect} from '@playwright/test';

test ('Verify Product Added To Cart', async({page}) => {
    const product = page.locator('.card-body').filter({
    hasText: 'ZARA COAT 3'
});

await page.goto('https://rahulshettyacademy.com/client')
await page.getByPlaceholder('email@example.com').fill('johndoe75@gmail.com');
await page.getByRole('textbox', { name: 'enter your passsword' }).fill('Jd@12345');
await page.getByRole('button', {name: 'Login', exact:true}).click();
await expect (page.getByText('ZARA COAT 3')).toBeVisible();
await product.getByRole('button', { name: 'Add To Cart' }).click();
await expect (page.getByText('Product Added to Cart')).toBeVisible();
await page.locator('button[routerlink="/dashboard/cart"]').click();
await expect (page.getByText('ZARA COAT 3')).toBeVisible();



})

// await page.locator('await page.getByRole('textbox', { name: 'email@example.com' }).dblclick();
// await page.getByRole('textbox', { name: 'email@example.com' }).press('CapsLock');
// await page.getByRole('textbox', { name: 'email@example.com' }).fill('johndoe75@gmail.com');
// await page.getByRole('textbox', { name: 'enter your passsword' }).dblclick();
// await page.getByRole('textbox', { name: 'enter your passsword' }).press('CapsLock');
// await page.getByRole('textbox', { name: 'enter your passsword' }).fill('Jd@12345');
// await page.getByRole('textbox', { name: 'enter your passsword' }).press('Enter');