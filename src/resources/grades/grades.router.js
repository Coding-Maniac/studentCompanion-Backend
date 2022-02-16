const { Router } = require('./express')

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

export default router;