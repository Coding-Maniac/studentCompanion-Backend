// Common Module to initialize All logins
const { Builder, By, Key } = require('selenium-webdriver');
const chrome = require("selenium-webdriver/chrome");
const chromeOptions = new chrome.Options();
chromeOptions.addArguments("--disable-dev-shm-usage"); // overcome limited resource problems
chromeOptions.addArguments("start-maximized"); // open Browser in maximized mode
chromeOptions.addArguments("disable-infobars"); // disabling infobars
chromeOptions.addArguments("--disable-extensions"); // disabling extensions
chromeOptions.addArguments("--no-sandbox");
const wrapper = (rollNumber, password) => initializeLogin(rollNumber, password)
const initializeLogin = async (rollNumber, password) => {
    // Initializing the driver
    let driver = await new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build()
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