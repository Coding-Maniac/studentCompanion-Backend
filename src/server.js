import appHandleAuthorization from './utils/common/authorizationHandler.js'
import express from 'express' 
import attendance from './utils/attendance.js'
import grades from './utils/grades'
import authorize from './utils/authorize'
import connect from './connect'
import totalGrades from './utils/totalGrades'
import { SignUp } from './utils/userAuth.js'
import gradesRouter from './resources/grades/grades.router'
const app = express()
app.use(express.json())
var compression = require('compression')

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})
// port configuarion
app.use(compression())
const port = process.env.PORT || 3030

app.use('/grades', gradesRouter)
app.get('/', function(req, res) {
  res.send(`Hello World from host ERP API!`)
})

app.post('/signup', SignUp)

app.post('/authorize',(req, res) => {
  const { body } = req
  const { rollNumber, password } = body
  console.log("Roll Number", rollNumber)
  console.log("Password", password)
  if (rollNumber && password) {
    authorize(rollNumber, password)
      .then(response => {
        const { error } = response
        if (error) {
          res.status(400)
          return res.send({ error })
        }
        return res.send(response)
      })
      .catch(err => {
        res.status(401)
        return res.send({
          "error": "Check Roll number and Password"
        })
      })
  }
})

app.post('/attendance', async (req, res) => {
  if (!req.body.rollNumber || !req.body.password) {
    res.status(400)
    return res.send({
      error: 'Provide both Login and Password'
    })
  } else {
    let rollNumber = req.body.rollNumber
    let password = req.body.password
    const authToken = appHandleAuthorization(req, res)
    if (authToken) {
      attendance(authToken, rollNumber, password)
        .then(attendanceObj => {
          const response = attendanceObj
          if (response.error) {
            res.status(404)
            return res.send({
              error: 'Kindly Check your Roll Number and Password'
            })
          } else {
            res.send(response)
          }
        })
        .catch(err => {
          res.status(404)
          res.send({
            error: 'Kindly Check your Roll Number And Password and Check again',
            error_value: err
          })
        })
    }
  }
})

const start = async () => {
  await connect('mongodb://localhost:27017')
  app.listen(port, () => {
    console.log(`Server is up at http://localhost:${port}`)
  })
}

export default start
