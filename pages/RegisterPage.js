import { BasePage } from '../pages/BasePage.js';
import messages from '../utils/messages.js';
import urls from '../utils/urls.js';
import user from '../utils/user.js';
import Chance from 'chance';

export class RegisterPage extends BasePage {
    
    /**
    * @param {import('@playwright/test').Page} page
    */

    #registerForm;
    #firstNameInput;
    #invalidFirstName;
    #lastNameInput;
    #invalidLastName;
    #emailInput;
    #invalidEmail;
    #telephoneInput;
    #invalidTelephone;
    #passwordInput;
    #invalidPassword;
    #confirmInput;
    #invalidConfirm;
    #privacyPolicyCheckbox;
    #continueButton;
    #privacyPolicyWarning;

    constructor(page) {
        super(page);
        this.#registerForm = page.locator(`form[action='${urls.register}']`);
        this.#firstNameInput = page.locator('#input-firstname');
        this.#invalidFirstName = page.getByText(messages.register.invalidFirstName);
        this.#lastNameInput = page.locator('#input-lastname');
        this.#invalidLastName = page.getByText(messages.register.invalidLastName);
        this.#emailInput = page.locator('#input-email');
        this.#invalidEmail = page.getByText(messages.register.invalidEmail);
        this.#telephoneInput = page.locator('#input-telephone');
        this.#invalidTelephone = page.getByText(messages.register.invalidTelephone);
        this.#passwordInput = page.locator('#input-password');
        this.#invalidPassword = page.getByText(messages.register.invalidPassword);
        this.#confirmInput = page.locator('#input-confirm');
        this.#invalidConfirm = page.getByText(messages.register.invalidConfirmPassword);
        this.#privacyPolicyCheckbox = page.getByText('I have read and agree to the');
        this.#continueButton = page.getByRole('button', { name: 'Continue' });
        this.#privacyPolicyWarning = page.getByText('Warning: You must agree to');
    }

    async navigateToRegisterPage() {
        await this.navigateToUrl(urls.register);
    }

    async waitForRegisterPageUrl() {
        await this.waitForPageUrl(urls.register);
    }

    async getRegisterPageUrl() {
        return await this.getPageUrl();
    }

    async getRegisterPageTitle() {
        return await this.getPageTitle();
    }

    async populateMandatoryFields(firstName, lastName, email, telephone, password, confirmPass) {
        await this.waitForLocator(this.#registerForm);
        
        await this.typeInField(this.#firstNameInput, firstName);
        await this.typeInField(this.#lastNameInput, lastName);
        await this.typeInField(this.#emailInput, email);
        await this.typeInField(this.#telephoneInput, telephone);
        await this.typeInField(this.#passwordInput, password);
        await this.typeInField(this.#confirmInput, confirmPass);
    }

    async clickPrivacyPolicyCheckbox() {
        await this.clickOnElement(this.#privacyPolicyCheckbox);
    }

    async clickContinueButton() {
        await this.clickOnElement(this.#continueButton);
    }

    async isRegisterFormVisible() {
        return await this.isElementVisible(this.#registerForm);
    }

    async isFirstNameInputVisible() {
        return await this.isElementVisible(this.#firstNameInput);
    }

    async isLastNameInputVisible() {
        return await this.isElementVisible(this.#lastNameInput);
    }

    async isEmailInputVisible() {
        return await this.isElementVisible(this.#emailInput);
    }

    async isTelephoneInputVisible() {
        return await this.isElementVisible(this.#telephoneInput);
    }

    async isPasswordInputVisible() {
        return await this.isElementVisible(this.#passwordInput);  
    }

    async isConfirmPasswordInputVisible() {
        return await this.isElementVisible(this.#confirmInput);  
    }

    async isPrivacyPolicyCheckboxVisible() {
        return await this.isElementVisible(this.#privacyPolicyCheckbox);  
    }

    async isContinueButtonVisible() {
        return await this.isElementVisible(this.#continueButton);    
    }

    async isInvalidFirstNameMessageDisplayed() {
        return await this.isElementVisible(this.#invalidFirstName);
    }

    async isInvalidLastNameMessageDisplayed() {
        return await this.isElementVisible(this.#invalidLastName);
    }

    async isInvalidEmailMessageDisplayed() {
        return await this.isElementVisible(this.#invalidEmail);
    }

    async isInvalidTelephoneMessageDisplayed() {
        return await this.isElementVisible(this.#invalidTelephone);
    }

    async isInvalidPasswordMessageDisplayed() {
        return await this.isElementVisible(this.#invalidPassword);
    }

    async isInvalidConfirmPasswordMessageDisplayed() {
        return await this.isElementVisible(this.#invalidConfirm);
    }

    async isPrivacyPolicyWarningMessageDisplayed() {
        return await this.isElementVisible(this.#privacyPolicyWarning);
    }

    generateUser() {
        const chance = new Chance();
        const name = chance.name().split(' ');

        user.firstName = name[0];
        user.lastName = name[1];
        user.email = chance.email({ domain: "example.com" });
        user.telephone = chance.phone();
    }
}

export default RegisterPage;