import { BasePage } from '../pages/BasePage.js';
import urls from '../utils/urls.js';
import user from '../utils/user.js';
import Chance from 'chance';

export class EditAccountPage extends BasePage {
    
    /**
    * @param {import('@playwright/test').Page} page
    */  

    #editForm;
    #firstNameInput;
    #lastNameInput;
    #emailInput;
    #telephoneInput;
    #continueButton;

    constructor(page) {
        super(page);
        this.#editForm = page.locator(`form[action='${urls.editAccount}']`);
        this.#firstNameInput = page.locator('#input-firstname');
        this.#lastNameInput = page.locator('#input-lastname');
        this.#emailInput = page.locator('#input-email');
        this.#telephoneInput = page.locator('#input-telephone');
        this.#continueButton = page.getByRole('button', { name: 'Continue' });
    }

    async waitForEditAccountPageUrl() {
        await this.waitForPageUrl(urls.editAccount);
    }

    async populateFields(firstName, lastName, telephone) {
        await this.waitForLocator(this.#editForm);
        await this.typeInField(this.#firstNameInput, firstName);
        await this.typeInField(this.#lastNameInput, lastName);
        await this.typeInField(this.#telephoneInput, telephone);
    }

    async clickContinueButton() {
        await this.clickOnElement(this.#continueButton);
    }

    async getFirstNameInputText() {
        return await this.getElementAttribute(this.#firstNameInput, 'value');
    }

    async getLastNameInputText() {
        return await this.getElementAttribute(this.#lastNameInput, 'value');
    }

    async getTelephoneInputText() {
        return await this.getElementAttribute(this.#telephoneInput, 'value');
    }

    generateUserData() {
        const chance = new Chance();
        const name = chance.name().split(' ');

        user.firstName = name[0];
        user.lastName = name[1];
        user.telephone = chance.phone();
    }
}

export default EditAccountPage;