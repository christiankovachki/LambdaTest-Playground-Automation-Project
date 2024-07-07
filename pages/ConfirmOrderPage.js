import { BasePage } from './BasePage.js';
import urls from '../utils/urls.js';

export class ConfirmOrderPage extends BasePage {
    
    /**
    * @param {import('@playwright/test').Page} page
    */  

    #confirmOrderButton;

    constructor(page) {
        super(page);
        this.#confirmOrderButton = page.locator('#button-confirm');
    }

    async waitForConfirmOrderPageUrl() {
        await this.waitForPageUrl(urls.confirmOrder);
    }

    async getConfirmOrderPageTitle() {
        return await this.getPageTitle();
    }

    async clickConfirmOrderButton() {
        await this.clickOnElement(this.#confirmOrderButton);
    }
}

export default ConfirmOrderPage;