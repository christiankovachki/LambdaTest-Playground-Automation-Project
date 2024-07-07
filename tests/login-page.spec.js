import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { MyAccountPage } from '../pages/MyAccountPage.js';
import { RegisterPage } from '../pages/RegisterPage.js';
import { SuccessPage } from '../pages/SuccessPage.js';
import { ForgottenPasswordPage } from '../pages/ForgottenPasswordPage.js';
import pageTitles from '../utils/pageTitles.js';
import urls from '../utils/urls.js';
import user from '../utils/user.js';

test.describe('User Login Tests', () => {
  let loginPage;
  let myAccountPage;
  let email;
  let context;
  let page;

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();

    const registerPage = new RegisterPage(page);

    registerPage.generateUser();
    email = user.email;

    await registerPage.navigateToRegisterPage();
    await registerPage.populateMandatoryFields(user.firstName, user.lastName, email, user.telephone, user.password, user.confirmPass);
    await registerPage.clickPrivacyPolicyCheckbox();
    await registerPage.clickContinueButton();

    const successPage = new SuccessPage(page);
    await successPage.waitForSuccessPageUrl();

    await page.close();
  });

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    myAccountPage = new MyAccountPage(page);

    await loginPage.navigateToLoginPage();
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test('With Valid User Credentials', async () => {
    await loginPage.populateFields(email, user.password);
    await loginPage.clickLoginButton();

    await myAccountPage.waitForMyAccountPageUrl();
    expect(await myAccountPage.getMyAccountPageTitle()).toBe(pageTitles.myAccount);
    expect(await myAccountPage.isEditAccountVisible()).toBeTruthy();
    expect(await myAccountPage.isLogoutVisible()).toBeTruthy();
  });

  test('With Blank Fields', async () => {
    await loginPage.clickLoginButton();

    expect(await loginPage.getLoginPageUrl()).toBe(urls.login);
    expect(await loginPage.getLoginPageTitle()).toBe(pageTitles.login);
    expect(await loginPage.isInvalidLoginMessageDisplayed()).toBeTruthy();
  });

  test('With Invalid Password Field', async () => {
    // The password, which is used to log in is not associated with that email address
    const invalidPassword = '123123';

    await loginPage.populateFields(email, invalidPassword);
    await loginPage.clickLoginButton();

    expect(await loginPage.getLoginPageUrl()).toBe(urls.login);
    expect(await loginPage.getLoginPageTitle()).toBe(pageTitles.login);
    expect(await loginPage.isInvalidLoginMessageDisplayed()).toBeTruthy();
  });

  test('With Invalid Email Field', async () => {
    // The email, used for log in is not registered yet
    const unregisteredEmail = 'random@random.com';

    await loginPage.populateFields(unregisteredEmail, user.password);
    await loginPage.clickLoginButton();

    expect(await loginPage.getLoginPageUrl()).toBe(urls.login);
    expect(await loginPage.getLoginPageTitle()).toBe(pageTitles.login);
    expect(await loginPage.isInvalidLoginMessageDisplayed()).toBeTruthy();
  });

  test('Verify Forgotten Password Link Redirects To Forgotten Password Page', async ({ page }) => {
    await loginPage.clickForgottenPasswordLink();

    const forgottenPasswordPage = new ForgottenPasswordPage(page);
    await forgottenPasswordPage.waitForForgottenPasswordPageUrl();

    expect(await forgottenPasswordPage.getForgottenPasswordPageTitle()).toBe(pageTitles.forgottenPassword);
    expect(await forgottenPasswordPage.isEmailAddressInputVisible()).toBeTruthy();
  });
});