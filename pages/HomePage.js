import { BasePage } from '../pages/BasePage.js';
import urls from '../utils/urls.js';

export class HomePage extends BasePage {

    /**
    * @param {import('@playwright/test').Page} page
    */  

    #myAccountDropdown;
    #loginLink;
    #registerLink;

    constructor(page) {
        super(page);
        this.#myAccountDropdown = page.getByRole('button', { name: 'My account' });
        this.#loginLink = page.getByRole('link', { name: 'Login' });
        this.#registerLink = page.getByRole('link', { name: 'Register' });
    }

    async navigateToHomePage() {
        await this.navigateToUrl(urls.home);
    }

    async navigateToRegisterPageThroughHover() {
        await this.hoverOnElement(this.#myAccountDropdown);
        await this.clickOnElement(this.#registerLink);
    }

    async navigateToLoginPageThroughHover() {
        await this.hoverOnElement(this.#myAccountDropdown);
        await this.clickOnElement(this.#loginLink);
    }
}

export default HomePage;