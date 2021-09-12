const axios = require("axios")
const { default: Cheerio } = require('cheerio');
axios.defaults.withCredentials = true
const login = require('./common/initializeLogin')
const attendanceProcessor = require('./common/attendanceProcessor')
const attendance = async (rollNumber, password) => {
    const { driver, cookieObj } = await login.wrapper(rollNumber, password)
    let cookieString = ""
    for (let i in cookieObj) {
        cookieString += i
        cookieString += "="
        cookieString += cookieObj[i]
        cookieString += "; "
    }
    driver.quit()
    //classId - 668
    // studIdhid - 582
    // batchID - 3988
    // fromDate - 01/07/2021
    //  toDate - 30/09/2021
    // generate - Search

    const erpConfig = axios.create({
        baseURL: "https://studentportal.hindustanuniv.ac.in/search",
        headers: {
            Cookie: cookieString
        }
    })
    //   axios.default.headers.cookie =cookieString;
    const getInitialAttendanceDetails = async () => {
        const formVal = await erpConfig.get("https://studentportal.hindustanuniv.ac.in/search/subjAttendReport.htm").then(res => {
            // console.log(res.data)
            const formData = setFormData(res.data)
            return formData
        })
        return formVal
    }

    const setFormData = (html) => {
        const $ = Cheerio.load(html)
        const studentId = $('input[id="form1_studIdhid"]').val()
        const classId = $('#form1_classId').val()
        const batchId = $('#form1_batchId').val()
        const formData = new URLSearchParams({
            form_name: 'form1',
            classId: classId,
            studIdhid: studentId,
            batchID: batchId,
            fromDate: '01/07/2021',
            toDate: '30/09/2021',
            generate: 'Search'
        })

        return formData

    }
    const fetchAttendanceDetails = async (formData) => {
        const finalData = await erpConfig.post("https://studentportal.hindustanuniv.ac.in/search/subjAttendReport.htm", formData, {
            withCredentials: true
        }).then(res => {
            const val=  attendanceProcessor(res.data)
            return val
        })
        return finalData
    }
    
    const initiateProcess = async () => {
        const formVal = await getInitialAttendanceDetails()
        console.log(formVal)
        const finalObj = await fetchAttendanceDetails(formVal)
        console.log(finalObj)
        return finalObj
    }
    return initiateProcess()

}

module.exports = attendance