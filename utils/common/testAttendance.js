const axios = require("axios")
const { default: Cheerio } = require('cheerio');
axios.defaults.withCredentials = true
const login = require('./initializeLogin')
const test = async () => {
    const { driver, cookieObj }= await login.wrapper("18113075" , "123456")
    let cookieString = ""
    for (let i in cookieObj){
        cookieString+=i
        cookieString+="="
        cookieString+=cookieObj[i]
        cookieString+="; "
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
        await erpConfig.get("https://studentportal.hindustanuniv.ac.in/search/subjAttendReport.htm").then(res => {
            // console.log(res.data)
            const formData = setFormData(res.data)
            fetchAttendanceDetails(formData)
        })
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
    getInitialAttendanceDetails()
    const fetchAttendanceDetails = async (formData) => {
        await erpConfig.post("https://studentportal.hindustanuniv.ac.in/search/subjAttendReport.htm", formData, {
            withCredentials: true
        }).then(res => {
            console.log(res.data)
        })
    }
    //   fetchAttendanceDetails()
}
test()