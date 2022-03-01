import axios from "axios";
import gradeProcessor from './common/gradesProcessor'
const grades = async (auth_token, semesterId) => {
    // form_name : form
    // semester: 1
    // search: Search

    // Setting Up the base URL for ERP Config
    const erpConfig = axios.create({
        baseURL: "https://studentportal.hindustanuniv.ac.in/search",
        headers: {
            Cookie: auth_token
        }
    })

    const finalGradesObject = []
    const getGrades = async (i) => {
        const formData = (i) => new URLSearchParams({
            form_name: "form",
            semester: i,
            search: "Search"
        })
        await erpConfig.post("gradeSheet.htm", formData(i), {
            withCredentials: true
        }).then(res => {
            finalGradesObject.push(gradeProcessor(res.data, i))
        })
    }
    /**
     * If semesterID is provided fetch only the particular semester
     * Else
     * Fetch all the semester details
     */
    console.log("Semester ID", semesterId)
    if (semesterId) {
        await getGrades(semesterId)
    } else {
        console.log("Near FOr Loop")
        for (let i = 1; i < 9; i++) {
            await getGrades(i)
        }
    }
    console.log("In Grades")
    return finalGradesObject
}

// grades(18113075, 123456)
export default grades