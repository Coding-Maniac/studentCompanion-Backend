const express = require('express');
const app = express()
const attendance = require('./utils/attendance')
const grades = require('./utils/grades')
const authorize = require('./utils/authorize')

app.use(express.json())
var compression = require('compression');
const totalGrades = require('./utils/totalGrades');
const { connect } = require('mongoose');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
// port configuarion
app.use(compression())
const port = process.env.PORT || 3030

function appHandleAuthorization(req, res) {
    if(req.get('Authorization')){
        return req.get('Authorization')
    }
    res.status(401)
    res.send({
        'error': 'No authorization was provided'
    })
}

app.get('/', function (req, res) {
    res.send(`Hello World from host ERP API!`)
})

app.post('/authorize', (req, res) => {
    const { body } = req;
    const { rollNumber, password } = body

    if(rollNumber && password){
        authorize(rollNumber, password).then(response => {
            const { error } = response
            if(error){
                res.status(400)
                return res.send({error})
            }
            return res.send(response)
        }).catch(err => {
            res.status(400)
            return res.send(err)
        }) 
    }
})

app.post('/attendance', (req, res) => {
    if (!req.body.rollNumber || !req.body.password) {
        res.status(400)
        return res.send({
            error: "Provide both Login and Password"
        })
    }
    else {
        let rollNumber = req.body.rollNumber
        let password = req.body.password
        const auth_token = appHandleAuthorization(req, res)
        if(auth_token){
            attendance(auth_token, rollNumber, password).then((attendanceObj) => {
                const response =  attendanceObj
                if(response.error){
                    res.status(404)
                    return res.send({
                        error: "Kindly Check your Roll Number and Password"
                    })
                } else {
                    res.send(response)
                }
            }).catch((err) => {
                res.status(404)
                res.send({
                    error: "Kindly Check your Roll Number And Password and Check again"
                })
            })
        }
    }
})

app.post('/grades', (req, res) => {
    if (!req.body.rollNumber || !req.body.password) {
        res.status(400)
        return res.send({
            error: "Login and Password Is Incorrect"
        })
    }
    const { rollNumber, password } = req.body
    const auth_token = appHandleAuthorization(req, res)
    if(auth_token){
        grades(auth_token, rollNumber, password).then((val) => {
            res.send(val)
        })
    }
})

app.post('/grades/:semesterId', (req, res) => {
    if (!req.body.rollNumber || !req.body.password) {
        res.status(400)
        return res.send({
            error: "Login and Password Is Incorrect"
        })
    }
    const { rollNumber, password } = req.body
    const { semesterId } = req.params
    const auth_token = appHandleAuthorization(req, res)
    if(auth_token){ 
        grades(auth_token, rollNumber, password, semesterId).then((val) => {
            res.send(val)
        })
    }
    
})

app.post('/grades-count', (req, res) => {
    if (!req.body.rollNumber || !req.body.password) {
        res.status(400)
        return res.send({
            error: "Login and Password Is Incorrect"
        })
    }
    const { rollNumber, password } = req.body
    const auth_token = appHandleAuthorization(req, res)
    if(auth_token){
        totalGrades(rollNumber, password).then((val) => {
            res.send(val)
        })
    }
})

app.post('/grades-count/:semesterId', (req, res) => {
    if (!req.body.rollNumber || !req.body.password) {
        res.status(400)
        return res.send({
            error: "Login and Password Is Incorrect"
        })
    }
    const { rollNumber, password } = req.body
    const { semesterId } = req.params
    const auth_token = appHandleAuthorization(req, res)
    if(auth_token){
        totalGrades(rollNumber, password, semesterId).then((val) => {
            res.send(val)
        })
    }
})



connect('mongodb://localhost:27017').then(() => app.listen(port, () => {
    console.log(`Server is up at http://localhost:${port}`)
}))