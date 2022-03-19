import appHandleAuthorization from './utils/common/authorizationHandler.js'
import express from 'express'
import attendance from './utils/attendance.js'
import authorize from './utils/authorize'
import connect from './connect'
import gradesRouter from './resources/grades/grades.router'
import authRouter from './resources/auth/auth.router'
import faceRouter from './resources/faceRecognition/face.router'
import { Canvas, Image } from 'canvas';
import fileupload from "express-fileupload"
import { env, nets } from 'face-api.js'

env.monkeyPatch({ Canvas, Image })
const app = express()
app.use(express.json())
app.use(fileupload({ useTempFiles: true, debug: true }))
var compression = require('compression')

async function LoadModels() {
  // Load the models
  // __dirname gives the root directory of the server
  await nets.faceRecognitionNet.loadFromDisk(__dirname + "/../public/models");
  await nets.faceLandmark68Net.loadFromDisk(__dirname + "/../public/models");
  await nets.ssdMobilenetv1.loadFromDisk(__dirname + "/../public/models");
}
LoadModels();

app.use(function (req, res, next) {
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
app.use('/auth', authRouter)
app.use('/face', faceRouter)

app.get('/', function (req, res) {
  res.send(`Hello World from host ERP API!`)
})

app.post('/erp/authorize', (req, res) => {
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

app.get('/attendance', async (req, res) => {
  const authToken = appHandleAuthorization(req, res)
  if (authToken) {
    attendance(authToken)
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
})

const start = async () => {
  await connect('mongodb://localhost:27017')
  app.listen(port, () => {
    console.log(`Server is up at http://localhost:${port}`)
  })
}

export default start
