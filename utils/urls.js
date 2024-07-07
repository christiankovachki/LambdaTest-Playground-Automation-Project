const baseUrl = 'https://ecommerce-playground.lambdatest.io'

export default {
    home: baseUrl + '/index.php?route=common/home',
    login: baseUrl + '/index.php?route=account/login',
    logout: baseUrl + '/index.php?route=account/logout',
    register: baseUrl + '/index.php?route=account/register',
    myAccount: baseUrl + '/index.php?route=account/account',
    successRegister: baseUrl + '/index.php?route=account/success',
    editAccount: baseUrl + '/index.php?route=account/edit',
    forgottenPassword: baseUrl + '/index.php?route=account/forgotten',
    checkout: baseUrl + '/index.php?route=checkout/checkout',
    shoppingCart: baseUrl + '/index.php?route=checkout/cart',
    successOrder: baseUrl + '/index.php?route=checkout/success',
    confirmOrder: baseUrl + '/index.php?route=extension/maza/checkout/confirm',
};