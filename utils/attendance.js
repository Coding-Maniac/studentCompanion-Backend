const { default: Cheerio } = require('cheerio');
const { By, Key } = require('selenium-webdriver');
const login = require('./common/initializeLogin')

const attendance = async (rollNumber, password) => {

    let { driver } = await login.wrapper(rollNumber, password)

    // Opening the dropdown for timetable
    await driver.findElement(By.css('li[class="dropdown"]:nth-of-type(3) a')).sendKeys('1', Key.ENTER)


    // Selecting the time table
    await driver.findElement(By.css('a[href="/search/subjAttendReport.htm"]')).sendKeys('1', Key.ENTER)

    // Setting the date
    function setDate() {
        const currentYear = new Date().getFullYear()
        console.log(currentYear)
        if (new Date().getMonth() >= 6){
            document.getElementsByName("fromDate")[0].value = `01/06/${currentYear}`
            document.getElementsByName("toDate")[0].value = `31/12/${currentYear}`
        } else {
            document.getElementsByName("fromDate")[0].value = `01/01/${currentYear}`
            document.getElementsByName("toDate")[0].value = `31/05/${currentYear}`
        }
        
    }
    await driver.executeScript(setDate)

    // Submitting the form
    await driver.findElement(By.css('input[type="submit"]')).sendKeys('1', Key.ENTER)

    // Promise resolve with the document
    const finalData = await driver.executeScript("return document.documentElement.outerHTML").then(
        res => {
            return attendanceFinal(res)
        }
    )
    driver.quit()
    return finalData;   
}

function attendanceFinal(res) {

    // Loading the document in cheerio
    let $ = Cheerio.load(res);
    let numberOfSubjects = $('div[id="tableDetailDiv"] tbody tr').toArray().length
    let subjects = {}

    // Looping by the DOM Elements to fetch the subject
    for (let i = 1; i <= numberOfSubjects; i++) {
        let subjName = $(`div[id="tableDetailDiv"] tbody tr:nth-of-type(${i}) td:nth-of-type(1)`).text()
        let totalHours = $(`div[id="tableDetailDiv"] tbody tr:nth-of-type(${i}) td:nth-of-type(2)`).text()
        let totalHoursPresent = $(`div[id="tableDetailDiv"] tbody tr:nth-of-type(${i}) td:nth-of-type(3)`).text()
        subjects[subjName] = {
            totalHours,
            totalHoursPresent
        }
    }

    let updatedSubjects = attendanceObjectMaker(subjects);
    return updatedSubjects
}

function attendanceObjectMaker(subjects) {

    // Processing the subjects
    for (let sub in subjects) {

        let val = subjects[sub]

        // Checking the attendance
        let ans = attendanceFinder(val.totalHours, val.totalHoursPresent)

        // Adding the value to the object
        if (ans === false) {
            subjects[sub].above = true
        }

        else {
            subjects[sub].above = false
            subjects[sub].numberOfClassesToAttend = ans
        }
        subjects[sub].attendancePercentage=val.totalHoursPresent/val.totalHours * 100
    }

    return subjects
}

function attendanceFinder(totalClasses, AttendedClasses) {

    // Logic for finding attendance
    let attendance = AttendedClasses / totalClasses

    if (attendance >= 0.75) {
        return false
    }

    let numberOfClassesToAttend = (totalClasses * 0.75) - AttendedClasses;
    return Math.ceil(numberOfClassesToAttend);
}

module.exports = attendance
// attendance(18113075, 123456)


