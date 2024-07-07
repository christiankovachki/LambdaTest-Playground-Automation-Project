import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage.js';
import { SuccessPage } from '../pages/SuccessPage.js';
import urls from '../utils/urls.js';
import user from '../utils/user.js';
import pageTitles from '../utils/pageTitles.js';

test.describe.configure({ mode: 'parallel' });

test.describe('User Registration Tests', () => {
  let registerPage;
  let firstName;
  let lastName;
  let email;
  let telephone;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);

    registerPage.generateUser();
    firstName = user.firstName;
    lastName = user.lastName;
    email = user.email;
    telephone = user.telephone;

    await registerPage.navigateToRegisterPage();
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test('With Valid Credentials', async ({ page }) => {
    await registerPage.populateMandatoryFields(firstName, lastName, email, telephone, user.password, user.confirmPass);
    await registerPage.clickPrivacyPolicyCheckbox();
    await registerPage.clickContinueButton();

    const successPage = new SuccessPage(page);
    await successPage.waitForSuccessPageUrl();

    expect(await successPage.getSuccessPageTitle()).toBe(pageTitles.success);
    expect(await successPage.isSuccessIconDisplayed()).toBeTruthy();
    expect(await successPage.isEditAccountVisible()).toBeTruthy();
    expect(await successPage.isLogoutVisible()).toBeTruthy();
  });

  test('With Blank Fields', async () => {
    await registerPage.clickPrivacyPolicyCheckbox();
    await registerPage.clickContinueButton();

    expect(await registerPage.getRegisterPageUrl()).toBe(urls.register);
    expect(await registerPage.isInvalidFirstNameMessageDisplayed()).toBeTruthy();
    expect(await registerPage.isInvalidLastNameMessageDisplayed()).toBeTruthy();
    expect(await registerPage.isInvalidEmailMessageDisplayed()).toBeTruthy();
    expect(await registerPage.isInvalidTelephoneMessageDisplayed()).toBeTruthy();
    expect(await registerPage.isInvalidPasswordMessageDisplayed()).toBeTruthy();
  });

  test('With Invalid First Name Field', async () => {
    // First Name with 33 chars (1 above the upper limit of 32)
    const invalidFirstName = 'InvalidFirstNameFieldInvalidFirst'

    await registerPage.populateMandatoryFields(invalidFirstName, lastName, email, telephone, user.password, user.confirmPass);
    await registerPage.clickPrivacyPolicyCheckbox();
    await registerPage.clickContinueButton();

    expect(await registerPage.getRegisterPageUrl()).toBe(urls.register);
    expect(await registerPage.isInvalidFirstNameMessageDisplayed()).toBeTruthy();
  });

  test('With Invalid Last Name Field', async () => {
    // Last Name with 33 chars (1 above the upper limit of 32)
    const invalidLastName = 'InvalidLastNameFieldInvalidLastNa';

    await registerPage.populateMandatoryFields(firstName, invalidLastName, email, telephone, user.password, user.confirmPass);
    await registerPage.clickPrivacyPolicyCheckbox();
    await registerPage.clickContinueButton();

    expect(await registerPage.getRegisterPageUrl()).toBe(urls.register);
    expect(await registerPage.isInvalidLastNameMessageDisplayed()).toBeTruthy();
  });

  test('With Invalid Email', async () => {
    const invalidEmail = 'invalidemail@invalid';

    await registerPage.populateMandatoryFields(firstName, lastName, invalidEmail, telephone, user.password, user.confirmPass);
    await registerPage.clickPrivacyPolicyCheckbox();
    await registerPage.clickContinueButton();

    expect(await registerPage.getRegisterPageUrl()).toBe(urls.register);
    expect(await registerPage.isInvalidEmailMessageDisplayed()).toBeTruthy();
  });

  test('With Invalid Telephone', async () => {
    const invalidTelephone = '00';

    await registerPage.populateMandatoryFields(firstName, lastName, email, invalidTelephone, user.password, user.confirmPass);
    await registerPage.clickPrivacyPolicyCheckbox();
    await registerPage.clickContinueButton();

    expect(await registerPage.getRegisterPageUrl()).toBe(urls.register);
    expect(await registerPage.isInvalidTelephoneMessageDisplayed()).toBeTruthy();
  });

  test('With Invalid Password', async () => {
    // Password which consists of 3 characters (1 less than the lower limit which is 4 chars)
    const invalidPassword = '123';

    await registerPage.populateMandatoryFields(firstName, lastName, email, telephone, invalidPassword, invalidPassword);
    await registerPage.clickPrivacyPolicyCheckbox();
    await registerPage.clickContinueButton();

    expect(await registerPage.getRegisterPageUrl()).toBe(urls.register);
    expect(await registerPage.isInvalidPasswordMessageDisplayed()).toBeTruthy();
  });

  test('With Invalid Confirm Password', async () => {
    // Confirm Password which doesn't match the Password (the Password is valid)
    await registerPage.populateMandatoryFields(firstName, lastName, email, telephone, user.password, user.invalidConfirmPass);
    await registerPage.clickPrivacyPolicyCheckbox();
    await registerPage.clickContinueButton();

    expect(await registerPage.getRegisterPageUrl()).toBe(urls.register);
    expect(await registerPage.isInvalidConfirmPasswordMessageDisplayed()).toBeTruthy();
  });

  test('With unchecked Privacy Policy checkbox', async () => {
    await registerPage.populateMandatoryFields(firstName, lastName, email, telephone, user.password, user.invalidConfirmPass);
    await registerPage.clickContinueButton();

    expect(await registerPage.getRegisterPageUrl()).toBe(urls.register);
    expect(await registerPage.isPrivacyPolicyWarningMessageDisplayed()).toBeTruthy();
  });
});