import { BasePage } from '../pages/BasePage.js';
import urls from '../utils/urls.js';
import messages from '../utils/messages.js';

export class LoginPage extends BasePage {
    
    /**
    * @param {import('@playwright/test').Page} page
    */

    #loginForm;
    #emailInput;
    #passwordInput;
    #loginButton;
    #invalidLogin;
    #forgottenPasswordLink;

    constructor(page) {
        super(page);
        this.#loginForm = page.locator(`form[action='${urls.login}']`);
        this.#emailInput = page.locator('#input-email');
        this.#passwordInput = page.locator('#input-password');
        this.#loginButton = page.getByRole('button', { name: 'Login' });
        this.#invalidLogin = page.getByText(messages.login.invalid);
        this.#forgottenPasswordLink = page.getByRole('link', { name: 'Forgotten Password', exact: true });
    }

    async navigateToLoginPage() {
        await this.navigateToUrl(urls.login);
    }

    async waitForLoginPageUrl() {
        await this.waitForPageUrl(urls.login);
    }

    async getLoginPageUrl() {
        return await this.getPageUrl();
    }

    async getLoginPageTitle() {
        return await this.getPageTitle();
    }

    async populateFields(email, password) {
        await this.waitForLocator(this.#loginForm);
        await this.typeInField(this.#emailInput, email);
        await this.typeInField(this.#passwordInput, password);
    }

    async clickLoginButton() {
        await this.clickOnElement(this.#loginButton);
    }

    async clickForgottenPasswordLink() {
        await this.clickOnElement(this.#forgottenPasswordLink);
    }

    async isLoginFormVisible() {
        return await this.isElementVisible(this.#loginForm);
    }

    async isEmailInputVisible() {
        return await this.isElementVisible(this.#emailInput);
    }

    async isPasswordInputVisible() {
        return await this.isElementVisible(this.#passwordInput);
    }

    async isForgottenPasswordVisible() {
        return await this.isElementVisible(this.#forgottenPasswordLink);
    }

    async isLoginButtonVisible() {
        return await this.isElementVisible(this.#loginButton);
    }

    async isInvalidLoginMessageDisplayed() {
        return await this.isElementVisible(this.#invalidLogin);
    }
}

export default LoginPage;