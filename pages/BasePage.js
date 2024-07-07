export class BasePage {
    /**
    * @param {import('@playwright/test').Page} page
    */

    constructor(page) {
        this.page = page;
    }

    async navigateToUrl(url) {
        await this.page.goto(url);
    }

    async waitForPageUrl(url) {
        await this.page.waitForURL(url);
    }

    async waitForLocator(locator) {
        await locator.waitFor();
    }

    async getPageUrl() {
        return this.page.url();
    }

    async getPageTitle() {
        return await this.page.title();
    }

    async clickOnElement(locator) {
		await locator.click();
	}

    async selectCheckbox(locator) {
        await locator.check();
    }

    async typeInField(locator, input) {
        await locator.fill(input);
    }

    async hoverOnElement(locator) {
        await locator.hover();
    }

    async isElementVisible(locator) {
        return await locator.isVisible();
    }

    async isElementChecked(locator) {
        return await locator.isChecked();
    }

    async getElementText(locator) {
        const text = await locator.textContent();

        return text.trim();
	}

    async getElementAttribute(locator, attribute) {
        return await locator.getAttribute(attribute);
    }
}

export default BasePage;