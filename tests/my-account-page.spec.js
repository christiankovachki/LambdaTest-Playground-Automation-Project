import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { MyAccountPage } from '../pages/MyAccountPage.js';
import { EditAccountPage } from '../pages/EditAccountPage.js';
import { LogoutPage } from '../pages/LogoutPage.js';
import user from '../utils/user.js';
import messages from '../utils/messages.js';
import pageTitles from '../utils/pageTitles.js';

test.describe('My Account Tests', () => {
    let loginPage;
    let myAccountPage;
  
    test.beforeEach(async ({ page }) => {  
      loginPage = new LoginPage(page);
      await loginPage.navigateToLoginPage();
      await loginPage.populateFields(user.registeredEmail, user.password);
      await loginPage.clickLoginButton();

      myAccountPage = new MyAccountPage(page);
      await myAccountPage.waitForMyAccountPageUrl();
    });

    test.afterEach(async ({ page }) => {
        await page.close();
    });

    test('Successfully Update Personal Details', async ({ page }) => {
        await myAccountPage.clickEditAccount();

        const editAccountPage = new EditAccountPage(page);
        await editAccountPage.waitForEditAccountPageUrl();

        editAccountPage.generateUserData();
        await editAccountPage.populateFields(user.firstName, user.lastName, user.telephone);
        await editAccountPage.clickContinueButton();

        await myAccountPage.waitForMyAccountPageUrl();
        expect.soft(await myAccountPage.getSuccessMessageText()).toBe(messages.edit.successfullyUpdatedAccount);

        await myAccountPage.clickEditAccount();
        expect(await editAccountPage.getFirstNameInputText()).toBe(user.firstName);
        expect(await editAccountPage.getLastNameInputText()).toBe(user.lastName);
        expect(await editAccountPage.getTelephoneInputText()).toBe(user.telephone);
    });

    test('Logout from Side Menu', async ({ page }) => {
        await myAccountPage.clickLogoutFromSideMenu();

        const logoutPage = new LogoutPage(page);
        await logoutPage.waitForLogoutPageUrl();

        expect(await logoutPage.getLogoutPageTitle()).toBe(pageTitles.logout);
        expect(await logoutPage.isSuccessIconDisplayed()).toBeTruthy();
        expect(await logoutPage.isLoginLinkVisible()).toBeTruthy();
        expect(await logoutPage.isRegisterLinkVisible()).toBeTruthy();
    });

    test('Logout from Dropdown Menu', async ({ page }) => {
        await myAccountPage.clickLogoutFromDropdown();

        const logoutPage = new LogoutPage(page);
        await logoutPage.waitForLogoutPageUrl();

        expect(await logoutPage.getLogoutPageTitle()).toBe(pageTitles.logout);
        expect(await logoutPage.isSuccessIconDisplayed()).toBeTruthy();
        expect(await logoutPage.isLoginLinkVisible()).toBeTruthy();
        expect(await logoutPage.isRegisterLinkVisible()).toBeTruthy();
    });
});