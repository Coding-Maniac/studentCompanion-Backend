import appHandleAuthorization from '../../utils/common/authorizationHandler'
import grades from '../../utils/grades'
import { Router } from 'express'
import totalGrades from '../../utils/totalGrades'

const router = Router()

// ===== GRADES COUNT =====
router.get('/count', async (req, res) => {

  const authToken = appHandleAuthorization(req, res)
  console.log("In Grades Count")
  if (authToken) {
    totalGrades(authToken)
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

router.get('/count/:semesterId', (req, res) => {
  const { semesterId } = req.params
  const authToken = appHandleAuthorization(req, res)
  console.log("In Seperate Grades")
  if (authToken) {
    totalGrades(authToken, semesterId)
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



router.get('/', (req, res) => {
  const auth_token = appHandleAuthorization(req, res)
  if (auth_token) {
    grades(auth_token).then((val) => {
      res.send(val)
    })
  }
})



router.get('/:semesterId', (req, res) => {
  const { semesterId } = req.params
  const authToken = appHandleAuthorization(req, res)
  if (authToken) {
    grades(authToken, semesterId)
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