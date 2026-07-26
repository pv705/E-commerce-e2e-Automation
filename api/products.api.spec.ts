import { test, expect } from "@playwright/test";

test("Verify Products API", async ({ request }) => {

    const response = await request.get(
        "https://automationexercise.com/api/productsList"
    );

    expect(response.status()).toBe(200);

    const body = await response.json();

    // Verify response code
    expect(body.responseCode).toBe(200);

    // Verify products exist
    expect(body.products.length).toBeGreaterThan(0);

    // Verify first product
    expect(body.products[0].id).toBe(1);
    expect(body.products[0].name).toBe("Blue Top");
    expect(body.products[0].brand).toBe("Polo");
    expect(body.products[0].price).toBe("Rs. 500");
});