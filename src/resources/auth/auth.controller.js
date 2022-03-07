import User from "../users/user.model"

export const SignUp = async (req, res) => {
    const user = await User.create(req.body)
    return res.status(200).send(user)
}

export const Login = async (req, res) => {

    User.findOne({
        roll_number: req.body.roll_number
    }).exec((err, _user) => {
        if (err) {
            return res.status(404).send({
                error: 'User not found',
                additional_error: err
            })
        }

        if (_user) {
            if (_user.password === req.body.password) {
                return res.status(200).send(_user)
            } else {
                return res.status(403).send({
                    error: "Password Incorrect"
                })
            }
        } else {
            return res.status(404).send({
                error: "User not found",
            })
        }
    })

}