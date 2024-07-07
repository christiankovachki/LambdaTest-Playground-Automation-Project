import { expect } from '@playwright/test';
import { BasePage } from '../pages/BasePage.js';

export class SearchPage extends BasePage {

    /**
    * @param {import('@playwright/test').Page} page
    */

    #searchForProductsInput;
    #searchButton;
    #firstProduct;
    #firstProductAddToCartButton;
    #toastMessage;
    #checkoutButton;

    constructor(page) {
        super(page);
        this.#searchForProductsInput = page.getByRole('textbox', { name: 'Search For Products' });
        this.#searchButton = page.getByRole('button', { name: 'Search' });
        this.#firstProduct = page.locator('.product-layout').first();
        this.#firstProductAddToCartButton = page.getByTitle('Add to Cart').first();
        this.#toastMessage = page.locator('.toast-body');
        this.#checkoutButton = page.getByRole('link', { name: 'Checkout' });
    }

    async populateSearchInput(product) {
        await this.typeInField(this.#searchForProductsInput, product);
    }

    async clickSearchButton() {
        await this.clickOnElement(this.#searchButton);
    }

    async waitLoadSpinner() {
        await expect(this.page.locator('.loader-spinner')).toHaveCount(1);
    }

    async clickAddToCart() {
        await this.hoverOnElement(this.#firstProduct);
        await this.clickOnElement(this.#firstProductAddToCartButton);
    }

    async clickCheckoutButtonOnToastMessage() {
        await this.waitForLocator(this.#toastMessage);
        await this.clickOnElement(this.#checkoutButton);
    }
}

export default SearchPage;