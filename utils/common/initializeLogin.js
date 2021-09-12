// Common Module to initialize All logins
const { Builder, By, Key } = require('selenium-webdriver');
const chrome = require("selenium-webdriver/chrome");

// Browser Preferences to speed up the process
const browser_preferences = {
    'profile.default_content_setting_values': {
        'images': 2,
        'plugins': 2,
        'popups': 2,
        'geolocation': 2, 
        'notifications': 2,
        'auto_select_certificate': 2,
        'fullscreen': 2, 
        'mouselock': 2,
        'media_stream': 2, 
        'media_stream_mic': 2,
        'media_stream_camera': 2,
        'protocol_handlers': 2, 
        'ppapi_broker': 2,
        'automatic_downloads': 2,
        'midi_sysex': 2, 
        'push_messaging': 2,
        'ssl_cert_decisions': 2,
        'metro_switch_to_desktop': 2, 
        'protected_media_identifier': 2,
        'app_banner': 2,
        'site_engagement': 2, 
        'durable_storage': 2,
        'mixed_script': 2
    }
}

const options = new chrome.Options();
options.addArguments("disable-infobars"); // disabling infobars
options.addArguments("--disable-extensions"); // disabling extensions
options.addArguments("--disable-dev-shm-usage"); // overcome limited resource problems
options.addArguments("--no-sandbox");
options.headless = true
options.setUserPreferences(browser_preferences)

const wrapper = (rollNumber, password) => initializeLogin(rollNumber, password)
const initializeLogin = async (rollNumber, password) => {
    // Initializing the driver
    let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build()
    driver.manage().window().minimize()
    await driver.get('https://studentportal.hindustanuniv.ac.in');

    // Entering Username
    await driver.findElement(By.name('username_temp')).sendKeys(rollNumber)

    // Entering Password
    await driver.findElement(By.name('password')).sendKeys(password, Key.ENTER)

    // Hitting the Sign-in Button
    await driver.findElement(By.css('button[onclick="signIn(\'HITS\')"]')).sendKeys('1', Key.ENTER)
    const cookieObj = {}
    await driver.manage().getCookies().then(cookies => {
        for(let cookie of cookies){
            cookieObj[cookie.name] = cookie.value
        }
    })
    const returnObj = {
        driver: driver,
        cookieObj
    }
    return returnObj;
}

module.exports = {
    wrapper
}
// view tds client name, start date, end date