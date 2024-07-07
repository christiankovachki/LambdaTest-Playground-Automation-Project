import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { MyAccountPage } from '../pages/MyAccountPage.js';
import { SearchPage } from '../pages/SearchPage.js';
import { CheckoutPage } from '../pages/CheckoutPage.js';
import { ConfirmOrderPage } from '../pages/ConfirmOrderpage.js';
import { SuccessPage } from '../pages/SuccessPage.js';
import user from '../utils/user.js';
import messages from '../utils/messages.js';
import pageTitles from '../utils/pageTitles.js';

test.describe.configure({ mode: 'serial' });

test.describe('Checkout Tests', () => {
    let searchPage;
    let checkoutPage;
    let confirmOrderPage;
    let successPage;

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigateToLoginPage();
        await loginPage.populateFields(user.registeredEmail, user.password);
        await loginPage.clickLoginButton();
  
        const myAccountPage = new MyAccountPage(page);
        await myAccountPage.waitForMyAccountPageUrl();

        searchPage = new SearchPage(page);
        await searchPage.populateSearchInput('HTC Touch HD');
        await searchPage.clickSearchButton();
        await searchPage.waitLoadSpinner();
        await searchPage.clickAddToCart();
        await searchPage.clickCheckoutButtonOnToastMessage();

        checkoutPage = new CheckoutPage(page);
        await checkoutPage.waitForCheckoutPageUrl();

        confirmOrderPage = new ConfirmOrderPage(page);
        successPage = new SuccessPage(page);
    });
  
    test.afterEach(async ({ page }) => {
          await page.close();
    });

    test('User Can Successfully Checkout With New Address', async () => {
        if (await checkoutPage.isExistingAddressRadioButtonSelected() === true) {
            await checkoutPage.selectNewAddressRadioButton();
        }

        await checkoutPage.populateBillingAddressForm();
        await checkoutPage.selectCashOnDeliveryRadioButton();
        await checkoutPage.selectFlatShippingRateRadioButton();
        await checkoutPage.selectTermsCheckbox();
        await checkoutPage.clickContinueButton();
        
        await confirmOrderPage.waitForConfirmOrderPageUrl();
        await confirmOrderPage.clickConfirmOrderButton();

        await successPage.waitForSuccessfulOrderPageUrl();
        expect(await successPage.isSuccessIconDisplayed()).toBeTruthy();
        expect(await successPage.getSuccessPageTitle()).toBe(messages.order.successfulOrder);
    });

    test('User Can Successfully Checkout With Existing Address', async () => {
        await checkoutPage.selectCashOnDeliveryRadioButton();
        await checkoutPage.selectFlatShippingRateRadioButton();
        await checkoutPage.selectTermsCheckbox();
        await checkoutPage.clickContinueButton();
        
        await confirmOrderPage.waitForConfirmOrderPageUrl();
        await confirmOrderPage.clickConfirmOrderButton();

        await successPage.waitForSuccessfulOrderPageUrl();
        expect(await successPage.isSuccessIconDisplayed()).toBeTruthy();
        expect(await successPage.getSuccessPageTitle()).toBe(messages.order.successfulOrder);
    });

    test('User Cannot Checkout With Empty Billing Address Form', async ({ page }) => {
        if (await checkoutPage.isExistingAddressRadioButtonSelected() === true) {
            await checkoutPage.selectNewAddressRadioButton();
        }

        await checkoutPage.selectCashOnDeliveryRadioButton();
        await checkoutPage.selectFlatShippingRateRadioButton();
        await checkoutPage.selectTermsCheckbox();
        await checkoutPage.clickContinueButton();

        await checkoutPage.waitForCheckoutPageUrl();
        expect(await checkoutPage.getCheckoutPageTitle()).toBe(pageTitles.checkout);
        expect(await checkoutPage.isInvalidFirstNameMessageDisplayed()).toBeTruthy();
        expect(await checkoutPage.isInvalidLastNameMessageDisplayed()).toBeTruthy();
        expect(await checkoutPage.isInvalidAddressMessageDisplayed()).toBeTruthy();
        expect(await checkoutPage.isInvalidCityMessageDisplayed()).toBeTruthy();
        expect(await checkoutPage.isInvalidPostCodeMessageDisplayed()).toBeTruthy();
    });
});