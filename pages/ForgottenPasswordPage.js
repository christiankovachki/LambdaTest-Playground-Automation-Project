import { BasePage } from '../pages/BasePage.js';
import urls from '../utils/urls.js';

export class ForgottenPasswordPage extends BasePage {

    /**
    * @param {import('@playwright/test').Page} page
    */  

    #emailAddressInput;
    
    constructor(page) {
        super(page);
        this.#emailAddressInput = page.locator('#input-email');
    }

    async waitForForgottenPasswordPageUrl() {
        await this.waitForPageUrl(urls.forgottenPassword);
    }

    async getForgottenPasswordPageTitle() {
        return await this.getPageTitle();
    }

    async isEmailAddressInputVisible() {
        return await this.isElementVisible(this.#emailAddressInput);
    }
}

export default ForgottenPasswordPage;