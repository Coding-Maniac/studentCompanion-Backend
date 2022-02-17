import User from "../resources/users/user.model"

export const SignUp = async (req, res) => {
    const user = await User.create(req.body)
    console.log(user)
    return res.status(200).send(user)
}