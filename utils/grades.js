const { default: Cheerio } = require('cheerio');
const { Builder, By, Key } = require('selenium-webdriver');
const login = require('./common/initializeLogin')
const grades = async (rollNumber, password) => {
    let driver = await login.wrapper(rollNumber, password)

    // Opening the dropdown for Gradee
    let academics = driver.findElement(By.css('li[class="dropdown"]:nth-of-type(3) a'))
    await academics.sendKeys('1', Key.ENTER)

    // Selecting the Grade
    let tt = driver.findElement(By.css('a[href="/search/gradeSheet.htm"]'))
    await tt.sendKeys('1', Key.ENTER)

    // Select Button
    // let semBtn = driver.findElement(By.css('select[name="semester"]'))
    // await semBtn.sendKeys('1', Key.ENTER)

    // // Selecting Option1
    // let selectOption = driver.findElement(By.css('option[value="1"]'))
    // selectOption.sendKeys('1', Key.ENTER)

    const selectSemester = async () => {
        document.getElementById('semester').selectedIndex = 1

    }
    await driver.executeScript(selectSemester)
    await driver.findElement(By.css('input[type="submit"]')).sendKeys('1', Key.ENTER)
    await driver.executeScript("return document.documentElement.innerHTML").then(
        html => {
            gradeCalculator(html)
        }
    )

}

const gradeCalculator = (grades) => {

    // Load the document in Cheerio
    let $ = Cheerio.load(grades);
    // console.log($)
    let numberOfSubjects = $('tbody tr').toArray().length

    // To avoid the additional CGPA, GPA and TotalCredits 
    numberOfSubjects = numberOfSubjects - 3
    for (let i = 1; i < numberOfSubjects; i++) {
        let text = $(`tbody tr:nth-of-type(${i}) td:nth-of-type(2)`).text()
        console.log(text)
    }

}

grades(18113075, 123456)