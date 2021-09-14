const express = require('express');
const app = express()
const attendance = require('./utils/attendance')
const grades = require('./utils/grades')
app.use(express.json())
var compression = require('compression')
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
// port configuarion
app.use(compression())
const port = process.env.PORT || 3030

app.get('/', function (req, res) {
    res.send(`Hello World from host ERP API!`)
})

app.post('/attendance', (req, res) => {
    console.log(req.body)
    if (!req.body.rollNumber || !req.body.password) {
        res.status(400)
        return res.send({
            error: "Login and Password Is Incorrect"
        })
    }
    else {
        let rollNumber = req.body.rollNumber
        let password = req.body.password
        attendance(rollNumber, password).then((attendanceObj) => {
            return res.send(attendanceObj)
        }).catch((err) => {
            res.status(404)
            res.send({
                error: "Kindly Check your Roll Number And Password and Check again"
            })
        })
    }
})

app.post('/grades', (req, res) => {
    grades(18113075, 123456).then((val) => res.send(val))
    // console.log(req.body)
})

app.listen(port, () => {
    console.log(`Server is up at http://localhost:${port}`)
})