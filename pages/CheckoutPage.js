import { BasePage } from '../pages/BasePage.js';
import messages from '../utils/messages.js';
import urls from '../utils/urls.js';
import user from '../utils/user.js';
import Chance from 'chance';

export class CheckoutPage extends BasePage {

    /**
    * @param {import('@playwright/test').Page} page
    */

    #telephoneInput;
    #paymentForm;
    #existingAddressRadioButton;
    #newAddressRadioButton;
    #firstNameInput;
    #lastNameInput;
    #addressFirstInput;
    #addressSecondInput;
    #cityInput;
    #postalCodeInput;
    #countryDropdown;
    #regionDropdown;
    #termsAndConditionsCheckbox;
    #continueButton;
    #cashOnDeliveryRadioButton;
    #flatShippingRateRadioButton;
    #invalidFirstName;
    #invalidLastName;
    #invalidAddress;
    #invalidCity;
    #invalidPostCode

    constructor(page) {
        super(page);
        this.#telephoneInput = page.locator('#input-telephone');
        this.#paymentForm = page.locator('#payment-address');
        this.#existingAddressRadioButton = page.locator('#payment-address').getByText('I want to use an existing');
        this.#newAddressRadioButton = page.locator('#payment-address').getByText('I want to use a new address');
        this.#firstNameInput = page.locator('#input-payment-firstname');
        this.#lastNameInput = page.locator('#input-payment-lastname');
        this.#addressFirstInput = page.locator('#input-payment-address-1');
        this.#addressSecondInput = page.locator('#input-payment-address-2');
        this.#cityInput = page.locator('#input-payment-city');
        this.#postalCodeInput = page.locator('#input-payment-postcode');
        this.#countryDropdown = page.locator('#input-payment-country');
        this.#regionDropdown = page.locator('#input-payment-zone');
        this.#termsAndConditionsCheckbox = page.getByText('I have read and agree to the Terms & Conditions');
        this.#continueButton = page.locator('#button-save');
        this.#cashOnDeliveryRadioButton = page.getByText('Cash On Delivery');
        this.#flatShippingRateRadioButton = page.getByText(/Flat Shipping Rate - \$/);
        this.#invalidFirstName = page.getByText(messages.checkout.invalidFirstName);
        this.#invalidLastName = page.getByText(messages.checkout.invalidLastName);
        this.#invalidAddress = page.getByText(messages.checkout.invalidAddress);
        this.#invalidCity = page.getByText(messages.checkout.invalidCity);
        this.#invalidPostCode = page.getByText(messages.checkout.invalidPostCode);
    }

    async waitForCheckoutPageUrl() {
        await this.waitForPageUrl(urls.checkout);
    }

    async getCheckoutPageTitle() {
        return await this.getPageTitle();
    }

    async getTelephoneInputText() {
        return await this.getElementAttribute(this.#telephoneInput, 'value');
    }

    async selectTermsCheckbox() {
        await this.selectCheckbox(this.#termsAndConditionsCheckbox);
    }

    async selectExistingAddressRadioButton() {
        await this.selectCheckbox(this.#existingAddressRadioButton);
    }

    async selectNewAddressRadioButton() {
        await this.selectCheckbox(this.#newAddressRadioButton);
    }

    async selectCashOnDeliveryRadioButton() {
        await this.selectCheckbox(this.#cashOnDeliveryRadioButton);
    }

    async selectFlatShippingRateRadioButton() {
        await this.selectCheckbox(this.#flatShippingRateRadioButton);
    }

    async clickContinueButton() {
        await this.clickOnElement(this.#continueButton);
    }

    async isExistingAddressRadioButtonVisible() {
        return await this.isElementVisible(this.#existingAddressRadioButton);
    }

    async isExistingAddressRadioButtonSelected() {
        return await this.isElementChecked(this.#existingAddressRadioButton);
    }

    async isCashOnDeliveryRadioButtonSelected() {
        return await this.isElementChecked(this.#cashOnDeliveryRadioButton);
    }

    async isFlatShippingRateRadioButtonSelected() {
        return await this.isElementChecked(this.#flatShippingRateRadioButton);
    }

    async isNewAddressRadioButtonVisible() {
        return await this.isElementVisible(this.#newAddressRadioButton);
    }

    async isInvalidFirstNameMessageDisplayed() {
        await this.waitForLocator(this.#invalidFirstName);
        return await this.isElementVisible(this.#invalidFirstName);
    }

    async isInvalidLastNameMessageDisplayed() {
        await this.waitForLocator(this.#invalidLastName);
        return await this.isElementVisible(this.#invalidLastName);
    }

    async isInvalidAddressMessageDisplayed() {
        await this.waitForLocator(this.#invalidAddress);
        return await this.isElementVisible(this.#invalidAddress);
    }

    async isInvalidCityMessageDisplayed() {
        await this.waitForLocator(this.#invalidCity);
        return await this.isElementVisible(this.#invalidCity);
    }

    async isInvalidPostCodeMessageDisplayed() {
        await this.waitForLocator(this.#invalidPostCode);
        return await this.isElementVisible(this.#invalidPostCode);
    }

    async populateBillingAddressForm() {
        this.generateBillingData();

        await this.waitForLocator(this.#paymentForm);
        await this.typeInField(this.#firstNameInput, user.firstName);
        await this.typeInField(this.#lastNameInput, user.lastName);
        await this.typeInField(this.#addressFirstInput, user.address);
        await this.typeInField(this.#cityInput, user.city);
        await this.typeInField(this.#postalCodeInput, user.postalCode);
        // await this.typeInField(this.#countryDropdown, user.country);
        // await this.typeInField(this.#regionDropdown, user.region);
    }

    generateBillingData() {
        const chance = new Chance();
        const name = chance.name().split(' ');

        user.firstName = name[0];
        user.lastName = name[1];
        user.address = '10 Watery Ln';
        user.city = 'Preston';
        user.postalCode = 'PR2 2NN';
    }
}

export default CheckoutPage;