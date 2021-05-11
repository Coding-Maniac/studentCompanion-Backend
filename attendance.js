const {Builder, By, Key} = require('selenium-webdriver');

const attendance = async () => {
    let driver = await new Builder().forBrowser('chrome').build()
    await driver.get('https://studentportal.hindustanuniv.ac.in');
    let inp =  driver.findElement(By.name('username_temp'))
    await inp.sendKeys('18113075')
    let pass =  driver.findElement(By.name('password'))
    await pass.sendKeys('123456', Key.ENTER)
    let btn =  driver.findElement(By.css('button[onclick="signIn(\'HITS\')"]'))
    await btn.sendKeys('123456', Key.ENTER)
    let academics =  driver.findElement(By.css('li[class="dropdown"]:nth-of-type(3) a'))
    await academics.sendKeys('1', Key.ENTER)
    let tt = driver.findElement(By.css('a[href="/search/subjAttendReport.htm"]'))
    await tt.sendKeys('1',Key.ENTER)
    function setDate(){
        document.getElementsByName("fromDate")[0].value="03/01/2021"
        document.getElementsByName("toDate")[0].value="03/05/2021"
    }
    driver.executeScript(setDate)
    let btn2 =  driver.findElement(By.css('input[type="submit"]'))
    await btn2.sendKeys('123456', Key.ENTER)
    let html = driver.executeScript("return document.documentElement.outerHTML").then(
        res => console.log(res)
    )
}

attendance()