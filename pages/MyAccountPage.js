import { BasePage } from '../pages/BasePage.js';
import urls from '../utils/urls.js';

export class MyAccountPage extends BasePage {

    /**
    * @param {import('@playwright/test').Page} page
    */  

    #editAccountLink;
    #myAccountDropdown;
    #logoutDropdownLink;
    #logoutMenuLink;
    #successMessage;

    constructor(page) {
        super(page);
        this.#editAccountLink = page.getByRole('link', { name: 'Edit your account' });
        this.#myAccountDropdown = page.getByRole('button', { name: 'My account' });
        this.#logoutDropdownLink = page.locator('.dropdown-item .info .title', { hasText: 'Logout' });
        this.#logoutMenuLink = page.locator(`#column-right div a[href='${urls.logout}']`);
        this.#successMessage = page.locator('.alert-success');
    }

    async waitForMyAccountPageUrl() {
        await this.waitForPageUrl(urls.myAccount);
    }

    async getMyAccountPageTitle() {
        return await this.getPageTitle();
    }

    async isEditAccountVisible() {
        return await this.isElementVisible(this.#editAccountLink);
    }

    async isLogoutVisible() {
        return await this.isElementVisible(this.#logoutMenuLink);
    }

    async clickEditAccount() {
        await this.clickOnElement(this.#editAccountLink);
    }

    async clickLogoutFromDropdown() {
        await this.hoverOnElement(this.#myAccountDropdown);
        await this.clickOnElement(this.#logoutDropdownLink);
    }

    async clickLogoutFromSideMenu() {
        await this.clickOnElement(this.#logoutMenuLink);
    }

    async getSuccessMessageText() {
        return await this.getElementText(this.#successMessage);
    }

}

export default MyAccountPage;