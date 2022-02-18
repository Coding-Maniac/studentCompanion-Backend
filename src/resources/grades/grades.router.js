import appHandleAuthorization from '../../utils/common/authorizationHandler'
import grades from '../../utils/grades'
import { Router } from 'express'
import totalGrades from '../../utils/totalGrades'

const router = Router()

router.post('/', (req, res) => {
    if (!req.body.rollNumber || !req.body.password) {
        res.status(400)
        return res.send({
            error: "Login and Password Is Incorrect"
        })
    }
    const { rollNumber, password } = req.body
    const auth_token = appHandleAuthorization(req, res)
    if (auth_token) {
        grades(auth_token, rollNumber, password).then((val) => {
            res.send(val)
        })
    }
})

router.post('/count', async (req, res) => {
  if (!req.body.rollNumber || !req.body.password) {
    res.status(400)
    return res.send({
      error: 'Login and Password Is Incorrect'
    })
  }
  const { rollNumber, password } = req.body
  const authToken = appHandleAuthorization(req, res)
  if (authToken) {
    totalGrades(authToken, rollNumber, password)
      .then(val => {
        res.send(val)
      })
      .catch(err => {
        res.status(404)
        res.send({
          error: 'No Grade Count',
          error_value: err
        })
      })
  }
})

router.post('/count/:semesterId', (req, res) => {
  if (!req.body.rollNumber || !req.body.password) {
    res.status(400)
    return res.send({
      error: 'Login and Password Is Incorrect'
    })
  }
  const { rollNumber, password } = req.body
  const { semesterId } = req.params
  const authToken = appHandleAuthorization(req, res)
  if (authToken) {
    totalGrades(authToken, rollNumber, password, semesterId)
      .then(val => {
        res.send(val)
      })
      .catch(err => {
        res.status(404)
        res.send({
          error: 'No Grade Count',
          error_value: err
        })
      })
  }
})


router.post('/:semesterId', (req, res) => {
  if (!req.body.rollNumber || !req.body.password) {
    res.status(400)
    return res.send({
      error: 'Login and Password Is Incorrect'
    })
  }
  const { rollNumber, password } = req.body
  const { semesterId } = req.params
  const authToken = appHandleAuthorization(req, res)
  if (authToken) {
    grades(authToken, rollNumber, password, semesterId)
      .then(val => {
        res.send(val)
      })
      .catch(err => {
        res.status(404)
        res.send({
          error: 'No Grades Found',
          error_value: err
        })
      })
  }
})


export default router;