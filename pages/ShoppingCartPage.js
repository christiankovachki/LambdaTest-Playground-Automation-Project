import { BasePage } from './BasePage.js';
import urls from '../utils/urls.js';

export class ShoppingCartPage extends BasePage {
    
    /**
    * @param {import('@playwright/test').Page} page
    */  

    #checkoutButton;

    constructor(page) {
        super(page);
        this.#checkoutButton = page.locator(`a[href='${urls.checkout}']`);
    }

    async waitForShoppingCartPageUrl() {
        await this.waitForPageUrl(urls.shoppingCart);
    }

    async getShoppingCartPageTitle() {
        return await this.getPageTitle();
    }

    async clickCheckoutButton() {
        await this.clickOnElement(this.#checkoutButton);
    }
}

export default ShoppingCartPage;