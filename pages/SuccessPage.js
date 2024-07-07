import { BasePage } from '../pages/BasePage.js';
import urls from '../utils/urls.js';

export class SuccessPage extends BasePage {

    /**
    * @param {import('@playwright/test').Page} page
    */  

    #logoutLink;
    #editAccountLink;
    #successIcon;

    constructor(page) {
        super(page);
        this.#logoutLink = page.getByRole('link', { name: 'Logout' });
        this.#editAccountLink = page.getByRole('link', { name: 'Edit Account' });
        this.#successIcon = page.locator('.text-success');
    }

    async waitForSuccessPageUrl() {
        await this.waitForPageUrl(urls.successRegister);
    }

    async waitForSuccessfulOrderPageUrl() {
        await this.waitForPageUrl(urls.successOrder);
    }

    async getSuccessPageTitle() {
        return await this.getPageTitle();
    }

    async isLogoutVisible() {
        return await this.isElementVisible(this.#logoutLink);
    }
    
    async isEditAccountVisible() {
        return await this.isElementVisible(this.#editAccountLink);
    }

    async isSuccessIconDisplayed() {
        return await this.isElementVisible(this.#successIcon);
    }
}

export default SuccessPage;