const express = require('express');
const app = express()
const attendance = require('./utils/attendance')

// port configuarion
const port = process.env.PORT || 3030

app.get('/', function (req, res) {
    res.send(`Hello World from host ERP API!`)
})

app.get('/attendance', (req, res) => {
    if (!req.query.rollNumber || !req.query.password) {
        return res.send({
            error: "Login and Password Must be provided"
        })
    }
    else {
        let rollNumber = req.query.rollNumber
        let password = req.query.password
        attendance(rollNumber, password).then((val) => {
            return res.send(val)
        }).catch((err) => {
            res.send({
                error: "Kindly Check your Roll Number And Password and Check again"
            })
        })
    }
})

app.listen(port, () => {
    console.log(`Server is up at http://localhost:${port}`)
})