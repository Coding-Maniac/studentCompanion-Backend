const {Builder, By, Key} = require('selenium-webdriver');

(async function myFunction() {
    let driver = await new Builder().forBrowser('chrome').build();
    //your code inside this block
    await driver.get('https://studentportal.hindustanuniv.ac.in');
    let inp =  driver.findElement(By.name('username_temp'))
    await inp.sendKeys('18113075')
    let pass =  driver.findElement(By.name('password'))
    await pass.sendKeys('123456', Key.ENTER)
    let btn =  driver.findElement(By.css('button[onclick="signIn(\'HITS\')"]'))
    await btn.sendKeys('123456', Key.ENTER)
    let academics =  driver.findElement(By.css('li[class="dropdown"]:nth-of-type(3) a'))
    await academics.sendKeys('1', Key.ENTER)
    let tt = driver.findElement(By.css('a[href="/search/timeTableSetup.htm"]'))
    await tt.sendKeys('1', Key.ENTER)
    // Try changing this to sasync later
    let html = driver.executeScript("return document.documentElement.outerHTML").then(
        res => console.log(res)
    )
})();
  
