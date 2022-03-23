/**
 * Takes in Course Attendance page as input
 *  Return A Json with attendance values
 * */

// const { default: Cheerio } = require('cheerio')
import Cheerio from 'cheerio'
const attendanceFinal = res => {
  // Loading the document in cheerio
  let $ = Cheerio.load(res)
  let numberOfSubjects = $('div[id="tableDetailDiv"] tbody tr').toArray().length
  let subjects = {}

  // Looping by the DOM Elements to fetch the subject
  for (let i = 1; i <= numberOfSubjects; i++) {
    let subjName = $(
      `div[id="tableDetailDiv"] tbody tr:nth-of-type(${i}) td:nth-of-type(1)`
    ).text()
    let totalHours = $(
      `div[id="tableDetailDiv"] tbody tr:nth-of-type(${i}) td:nth-of-type(2)`
    ).text()
    let totalHoursPresent = $(
      `div[id="tableDetailDiv"] tbody tr:nth-of-type(${i}) td:nth-of-type(3)`
    ).text()
    subjects[subjName] = {
      totalHours,
      totalHoursPresent
    }
  }

  let updatedSubjects = attendanceObjectMaker(subjects)
  // console.log(updatedSubjects)
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
      subjects[sub].safe = true
    } else {
      subjects[sub].safe = false
      subjects[sub].numberOfClassesToAttend = ans
    }
    subjects[sub].attendancePercentage =
      (val.totalHoursPresent / val.totalHours) * 100
  }

  return subjects
}

function attendanceFinder(totalClasses, AttendedClasses) {
  // Total Classes - Total Classes taken
  // Logic for finding attendance
  let attendance = AttendedClasses / totalClasses

  if (attendance >= 0.75) {
    return false
  }

  let numberOfClassesToAttend = totalClasses * 0.75 - AttendedClasses
  return Math.ceil(numberOfClassesToAttend)
}

export default attendanceFinal