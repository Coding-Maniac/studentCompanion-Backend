import { Cheerio } from "cheerio";
const gradesProcessor = (grades, i) => {
    const gradesObject = {}
    // Load the document in Cheerio
    let $ = cheerio.load(grades);
    let numberOfSubjects = $('tbody tr').toArray().length
    gradesObject[`semester${i}`] = {}
    let currentSem = gradesObject[`semester${i}`]
    currentSem.subjects = {}
    // To avoid the additional CGPA, GPA and TotalCredits 
    let gpaTest = $(`tbody tr:nth-of-type(${numberOfSubjects - 3}) th`).text()

    if (gpaTest === "GPA") {
        numberOfSubjects = numberOfSubjects - 3
    } else {
        numberOfSubjects = numberOfSubjects - 2
    }
    for (let j = 1; j < numberOfSubjects; j++) {
        let subjectCode = $(`tbody tr:nth-of-type(${j}) td:nth-of-type(2)`).text()
        let grade = $(`tbody tr:nth-of-type(${j}) td:nth-of-type(5)`).text()
        let subjectName = $(`tbody tr:nth-of-type(${j}) td:nth-of-type(3)`).text()
        currentSem.subjects[`${subjectCode}`] = { grade, subjectName }
    }

    // GPA
    let gpaText = $(`tbody tr:nth-of-type(${numberOfSubjects}) th`).text()
    if (gpaText === "GPA") {
        let gpa = $(`tbody tr:nth-of-type(${numberOfSubjects}) td`).text()
        currentSem.gpa = gpa
    } else {
        currentSem.gpa = null
    }

    // CGPA
    let cgpaText = $(`tbody tr:nth-of-type(${numberOfSubjects + 1}) th`).text()
    if (cgpaText === "CGPA") {
        let cgpa = $(`tbody tr:nth-of-type(${numberOfSubjects + 1}) td`).text()
        currentSem.cgpa = cgpa.split('/')[0]
    } else {
        currentSem.cgpa = null
    }
    return gradesObject
    // console.log(gradesObject)
}

export default gradesProcessor