import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { RegisterPage } from '../pages/RegisterPage.js';
import pageTitles from '../utils/pageTitles.js';

test.describe('Home Page Tests', () => {
    let homePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);

        await homePage.navigateToHomePage();
    });
    
    test.afterEach(async ({ page }) => {
        await page.close();
    });

    test('User is successfully redirected to Login Page through hover', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await homePage.navigateToLoginPageThroughHover();
        
        await loginPage.waitForLoginPageUrl();
        expect(await loginPage.getLoginPageTitle()).toBe(pageTitles.login);
        expect(await loginPage.isLoginFormVisible()).toBeTruthy();
        expect(await loginPage.isEmailInputVisible()).toBeTruthy();
        expect(await loginPage.isPasswordInputVisible()).toBeTruthy();
        expect(await loginPage.isForgottenPasswordVisible()).toBeTruthy();
        expect(await loginPage.isLoginButtonVisible()).toBeTruthy();
    });

    test('User is successfully redirected to Register Page through hover', async ({ page }) => {
        const registerPage = new RegisterPage(page);

        await homePage.navigateToRegisterPageThroughHover();

        await registerPage.waitForRegisterPageUrl();
        expect(await registerPage.getRegisterPageTitle()).toBe(pageTitles.register);
        expect(await registerPage.isRegisterFormVisible()).toBeTruthy();
        expect(await registerPage.isFirstNameInputVisible()).toBeTruthy();
        expect(await registerPage.isLastNameInputVisible()).toBeTruthy();
        expect(await registerPage.isEmailInputVisible()).toBeTruthy();
        expect(await registerPage.isTelephoneInputVisible()).toBeTruthy();
        expect(await registerPage.isPasswordInputVisible()).toBeTruthy();
        expect(await registerPage.isConfirmPasswordInputVisible()).toBeTruthy();
        expect(await registerPage.isPrivacyPolicyCheckboxVisible()).toBeTruthy();
        expect(await registerPage.isContinueButtonVisible()).toBeTruthy();
    });
});