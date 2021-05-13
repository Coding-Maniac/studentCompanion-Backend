const { default: Cheerio } = require('cheerio');
const {Builder, By, Key} = require('selenium-webdriver');
const attendance = async (rollNumber, password) => {
    let driver = await new Builder().forBrowser('chrome').build()
    await driver.get('https://studentportal.hindustanuniv.ac.in');
    let inp =  driver.findElement(By.name('username_temp'))
    await inp.sendKeys(rollNumber)
    let pass =  driver.findElement(By.name('password'))
    await pass.sendKeys(password, Key.ENTER)
    let btn =  driver.findElement(By.css('button[onclick="signIn(\'HITS\')"]'))
    await btn.sendKeys('1', Key.ENTER)
    let academics =  driver.findElement(By.css('li[class="dropdown"]:nth-of-type(3) a'))
    await academics.sendKeys('1', Key.ENTER)
    let tt = driver.findElement(By.css('a[href="/search/subjAttendReport.htm"]'))
    await tt.sendKeys('1',Key.ENTER)
    function setDate(){
        document.getElementsByName("fromDate")[0].value="03/01/2021"
        document.getElementsByName("toDate")[0].value="13/05/2021"
    }
    driver.executeScript(setDate)
    let btn2 =  driver.findElement(By.css('input[type="submit"]'))
    await btn2.sendKeys('1', Key.ENTER)
    let html = driver.executeScript("return document.documentElement.outerHTML").then(
        res => {
            return attendanceFinal(res)
        }
    )
    return html
}
function attendanceFinal(res){
    let $ = Cheerio.load(res);
    let numberOfSubjects = $('div[id="tableDetailDiv"] tbody tr').toArray().length
    let subjects = {}
    for(let i=1;i<=numberOfSubjects;i++){
        let subjName = $(`div[id="tableDetailDiv"] tbody tr:nth-of-type(${i}) td:nth-of-type(1)`).text()
        let totalHours = $(`div[id="tableDetailDiv"] tbody tr:nth-of-type(${i}) td:nth-of-type(2)`).text()
        let totalHoursPresent = $(`div[id="tableDetailDiv"] tbody tr:nth-of-type(${i}) td:nth-of-type(3)`).text()
        subjects[subjName] = {
            totalHours,
            totalHoursPresent
        }
    }
    let updatedSubjects = attendanceObjectMaker(subjects) ;
    return updatedSubjects
}
function attendanceObjectMaker(subjects){
    for (let sub in subjects) {
        let val = subjects[sub]
        let ans = attendanceFinder(val.totalHours,val.totalHoursPresent)
        if(ans === false){
            subjects[sub].above = true
        }
        else{
            subjects[sub].above = false
            subjects[sub].numberOfClassesToAttend = ans
        }
    }
    return subjects
}
function attendanceFinder(totalClasses, AttendedClasses) {
    let attendance = AttendedClasses / totalClasses
    if(attendance >= 0.75){
        return false
    }
    let numberOfClassesToAttend = (totalClasses * 0.75) - AttendedClasses;
    return Math.ceil(numberOfClassesToAttend);
}
module.exports = attendance


