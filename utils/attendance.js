const axios = require("axios")
const { default: Cheerio } = require('cheerio');
axios.defaults.withCredentials = true

const login = require('./common/initializeLogin')
const loginV2 = require('./common/intializeLoginV2')
const attendanceProcessor = require('./common/attendanceProcessor')

const attendance = async (rollNumber, password) => {

    const {error, cookieString} = await loginV2(rollNumber, password) 

    if(error){
        return{error}
    }
    console.log(cookieString)
    // Setting Up the base url for ERP config
    const erpConfig = axios.create({
        baseURL: "https://studentportal.hindustanuniv.ac.in/search",
        headers: {
            Cookie: cookieString
        }
    })

     /**
     * Fomat of FormData that needs to be sent in the POST request
     * This is called along with the GET request
     */
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

    /**
     * Fetches the Course Wise attendance html
     * @returns formData 
     */
    const getInitialAttendanceDetails = async () => {
        return await erpConfig.get("https://studentportal.hindustanuniv.ac.in/search/subjAttendReport.htm").then(res => {
            return setFormData(res.data)
        })
    }

    /**
     * @param  formData
     * Makes a post request to the ERP Course Wise Attendance with fomData 
     * @returns attendanceJson
     */
    const fetchAttendanceDetails = async (formData) => {
        return await erpConfig.post("https://studentportal.hindustanuniv.ac.in/search/subjAttendReport.htm", formData, {
            withCredentials: true
        }).then(res => {
            return attendanceProcessor(res.data)
        })
    }
    
    /**
     * Function to initiate the GET and POST request to ERP for fetching attendance
     * @returns attendanceObj
     */
    const formData = await getInitialAttendanceDetails()
    const attendanceValues = await fetchAttendanceDetails(formData)
    return attendanceValues
}

module.exports = attendance