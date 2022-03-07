import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    roll_number: {
        type: Number,
        required: true,
        minlength: [8, 'Roll number must be atleast 8 digits'],
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    department: {
        type: String
    },
    semester: {
        type: Number
    },
    section: {
        type: String
    }
})

const User = mongoose.model('user', userSchema)
export default User