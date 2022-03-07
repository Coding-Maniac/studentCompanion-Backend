import User from "../users/user.model"

export const SignUp = async (req, res) => {
    User.create(req.body).then((newUser) => {
        return res.status(200).json(newUser)
    }).catch((err) => {
        console.error('Error Validating!', err);
        if (err.name == 'ValidationError') {
            res.status(422).json(err);
        } else if (err.code === 11000) {
            res.status(422).json({
                ...err, "errors": {
                    message: "User Already Exists"
                }
            })
        } else {
            console.error(err);
            res.status(500).json(err);
        }
    })
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