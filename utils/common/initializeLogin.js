// Common Module to initialize All logins
const { Builder, By, Key } = require('selenium-webdriver');
const chrome = require("selenium-webdriver/chrome");
const options = new chrome.Options();
options.addArguments("start-maximized"); // open Browser in maximized mode
options.addArguments("disable-infobars"); // disabling infobars
options.addArguments("--disable-extensions"); // disabling extensions
options.addArguments("--disable-gpu"); // applicable to windows os only
options.addArguments("--disable-dev-shm-usage"); // overcome limited resource problems
options.addArguments("--no-sandbox");
options.headless = true
const wrapper = (rollNumber, password) => initializeLogin(rollNumber, password)
const initializeLogin = async (rollNumber, password) => {
    // Initializing the driver
    let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build()
    await driver.get('https://studentportal.hindustanuniv.ac.in');

    // Entering Username
    await driver.findElement(By.name('username_temp')).sendKeys(rollNumber)

    // Entering Password
    await driver.findElement(By.name('password')).sendKeys(password, Key.ENTER)

    // Hitting the Sign-in Button
    await driver.findElement(By.css('button[onclick="signIn(\'HITS\')"]')).sendKeys('1', Key.ENTER)

    return driver
}

module.exports = {
    wrapper
}