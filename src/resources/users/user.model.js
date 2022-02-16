import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    roll_number: {
        type: Number,
        required: true
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
        type: Number
    }
})

export const User = mongoose.model('user', userSchema)