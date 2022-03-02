import User from "../users/user.model"

export const SignUp = async (req, res) => {
    const user = await User.create(req.body)
    console.log(user)
    return res.status(200).send(user)
}

export const Login = async (req, res) => {
    User.findOne({
        roll_number: req.body.roll_number
    }).exec((err, _user) => {
        console.log("DB Password", _user.password)
        console.log("Req Password", req.body.password)
        if (_user) {
            if (_user.password === req.body.password) {
                return res.status(200).send(_user)
            } else {
                return res.status(404).send({
                    error: "User not found"
                })
            }
        }
    })
    // console.log(_user)


}