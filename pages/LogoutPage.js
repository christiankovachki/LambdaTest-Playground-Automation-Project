import { BasePage } from '../pages/BasePage.js';
import urls from '../utils/urls.js';

export class LogoutPage extends BasePage {

    /**
    * @param {import('@playwright/test').Page} page
    */  

    #loginLink;
    #registerLink;
    #successIcon;

    constructor(page) {
        super(page);
        this.#loginLink = page.getByRole('link', { name: 'Login' });
        this.#registerLink = page.getByRole('link', { name: 'Register' });
        this.#successIcon = page.locator('.text-success');
    }

    async waitForLogoutPageUrl() {
        await this.waitForPageUrl(urls.logout);
    }

    async getLogoutPageTitle() {
        return await this.getPageTitle();
    }

    async isLoginLinkVisible() {
        return await this.isElementVisible(this.#loginLink);
    }

    async isRegisterLinkVisible() {
        return await this.isElementVisible(this.#registerLink);
    }

    async isSuccessIconDisplayed() {
        return await this.isElementVisible(this.#successIcon);
    }
}

export default LogoutPage;