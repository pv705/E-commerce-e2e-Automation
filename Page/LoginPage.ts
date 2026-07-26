import { Locator, expect , Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class loginPage extends BasePage{
     readonly loginEmail: Locator;
    readonly loginPassword: Locator;
    readonly loginButton: Locator;

    readonly logoutButton: Locator;
    readonly loggedInUser: Locator;
    readonly invalidLoginMessage: Locator;

    constructor(page: Page){
        super(page);

        this.loginEmail = page.locator('[data-qa="login-email"]');
        this.loginPassword = page.locator('[data-qa="login-password"]');
        this.loginButton = page.locator('[data-qa="login-button"]');

        this.logoutButton = page.locator('a[href="/logout"]');
        this.loggedInUser = page.locator('a:has-text("Logged in as")');

        this.invalidLoginMessage = page.locator('text=Your email or password is incorrect!');
    }

    async navigateTologinPage() {
    await this.page.getByRole("link", {
        name: /Signup\s*\/\s*Login/
    }).click();
}

     async login(email: string, password: string) {
        await this.loginEmail.fill(email);
        await this.loginPassword.fill(password);
        await this.loginButton.click();
    }

    async logout() {
        await this.logoutButton.click();
    }

    async verifySuccessfulLogin() {
        await expect(this.loggedInUser).toBeVisible();
    }

    async verifyInvalidLogin() {
        await expect(this.invalidLoginMessage).toBeVisible();
    }

    





}