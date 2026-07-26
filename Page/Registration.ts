import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class Registration extends BasePage {

    // Signup Page
    readonly username: Locator;
    readonly email: Locator;
    readonly signupButton: Locator;

    // Account Information
    readonly mrRadio: Locator;
    readonly mrsRadio: Locator;
    readonly password: Locator;

    // DOB
    readonly dayDropdown: Locator;
    readonly monthDropdown: Locator;
    readonly yearDropdown: Locator;

    // Address
    readonly firstname: Locator;
    readonly lastname: Locator;
    readonly address: Locator;
    readonly country: Locator;
    readonly state: Locator;
    readonly city: Locator;
    readonly zipcode: Locator;
    readonly mobile: Locator;

    readonly createAccButton: Locator;

    constructor(page: Page) {
        super(page);

        this.username = page.getByPlaceholder('Name');
        this.email =  page.locator('[data-qa="signup-email"]');
        this.signupButton = page.getByRole('button',{name: 'Signup'})

        this.mrRadio = page.locator('#id_gender1');
        this.mrsRadio = page.locator('#id_gender2');

        this.password = page.locator('[data-qa="password"]');

        this.dayDropdown = page.locator('[data-qa="days"]');
        this.monthDropdown = page.locator('[data-qa="months"]');
        this.yearDropdown = page.locator('[data-qa="years"]');

        this.firstname = page.locator('[data-qa="first_name"]');
        this.lastname = page.locator('[data-qa="last_name"]');
        this.address = page.locator('[data-qa="address"]');
        this.country = page.locator('[data-qa="country"]');
        this.state = page.locator('[data-qa="state"]');
        this.city = page.locator('[data-qa="city"]');
        this.zipcode = page.locator('[data-qa="zipcode"]');
        this.mobile = page.locator('[data-qa="mobile_number"]');

        this.createAccButton = page.locator('[data-qa="create-account"]');
    }

    async selectSalutation(title: "Mr" | "Mrs") {

        if (title === "Mr") {
            await this.mrRadio.check();
        } else {
            await this.mrsRadio.check();
        }

    }

    async selectDOB(day: string, month: string, year: string) {

        await this.dayDropdown.selectOption(day);
        await this.monthDropdown.selectOption(month);
        await this.yearDropdown.selectOption(year);

    }

    async verifyAccountCreated() {

        await expect(this.page.locator('[data-qa="account-created"]')).toBeVisible();

    }
}