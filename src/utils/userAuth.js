import User from "../resources/users/user.model"

export const SignUp = async (req, res) => {
    const user = await User.create(req.body)
    console.log(user)
    return res.status(200).send(user)
}

export const SignIn = async (req, res) => {
    const _user = User.findOne({
        roll_number: req.body.roll_number
    })
    if (_user) {
        if (_user.password === req.body.password) {
            return res.status(200).send({
                status: true
            })
        }
    }

}