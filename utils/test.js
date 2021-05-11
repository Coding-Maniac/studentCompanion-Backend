const attendance = require('./attendance')

let val = attendance("18113075","123456").then(res => {
    console.log(res)
})
