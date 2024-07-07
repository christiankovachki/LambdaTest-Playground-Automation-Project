# LAMBDATEST ECOMMERCE PLAYGROUND TEST AUTOMATION FRAMEWORK

The System Under Test is LambdaTest eCommerce Playground ([Click](https://ecommerce-playground.lambdatest.io/))

The framework is build using JavaScript, Playwright and Page Object Model Design Pattern.

# Dependencies
 - Visual Studio Code
   - [Setting up Visual Studio Code](https://code.visualstudio.com/docs/setup/setup-overview)
 - Node.js v20.14.9
   - [How to install Node.js](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs)
 - Playwright v1.45.0
 - Chance v1.1.11
   - [Chance](https://chancejs.com/) is a minimalist generator of random strings, numbers, etc. to help reduce some monotony particularly while writing automated tests or anywhere else you need anything random

# Clone the Repository
`git clone https://github.com/christiankovachki/LambdaTest-Playground-Automation-Project.git`

# Install Dependencies
`npm install`

`npx playwright install`

# Run the Project
The tests run in headless mode on Chrome.

All the commands are inside the [package.json](https://github.com/christiankovachki/LambdaTest-Playground-Automation-Project/blob/main/package.json) file.

`npm run test-all` - runs all tests

`npm run test-home-page` - runs home-page.spec.js

`npm run test-register-page` - runs register-page.spec.js

`npm run test-login-page` - runs login-page.spec.js

`npm run test-account-page` - runs my-account-page.spec.js

`npm run test-checkout-page` - runs checkout-page.spec.js

`npx playwright show-report` - opens the Playwright Report
