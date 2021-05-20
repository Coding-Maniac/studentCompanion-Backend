const axios = require('axios')
const FormData = require('form-data')

const form = new FormData();

form.append('username','HITS_18113075')
form.append('username_temp','18113075')
form.append('password','123456')

axios.post('https://studentportal.hindustanuniv.ac.in/home.htm',{
    headers:{
        'Cookie':'AWSELB=5765D1A90E1ED38F0AE7751FF8FE1D085BA8C2793E95EB4F0D3D1F8091F9E310C883A3D0DEC5E1A8089A8E35A5651CC75F607EF858E730817867CDBC00BECF15D157C5EAA2; AWSELBCORS=5765D1A90E1ED38F0AE7751FF8FE1D085BA8C2793E95EB4F0D3D1F8091F9E310C883A3D0DEC5E1A8089A8E35A5651CC75F607EF858E730817867CDBC00BECF15D157C5EAA2; JSESSIONID=471D75879595A2727FBEDCAFE38C3F2E',
        'Accept-Encoding':'gzip, deflate, br',
        'Connection':'keep-alive',
        'username':'HITS_18113075',
        'username_temp':'18113075',
        'password':'123456'
    },
    form
    
}).then((res)=>{
    console.log(res.data)
}).catch((res)=>{
    console.log(res)
})

// const url = "https://studentportal.hindustanuniv.ac.in/home.htm?username=HITS_18113075&username_temp=18113075&password=123456";

// const form = new FormData();

// form.append('username','HITS_18113075')
// form.append('username_temp','18113075')
// form.append('password','123456')

// const options = {
//     method: 'POST',
//     headers:{
//         'Cookie':'AWSELB=5765D1A90E1ED38F0AE7751FF8FE1D085BA8C2793E95EB4F0D3D1F8091F9E310C883A3D0DEC5E1A8089A8E35A5651CC75F607EF858E730817867CDBC00BECF15D157C5EAA2; AWSELBCORS=5765D1A90E1ED38F0AE7751FF8FE1D085BA8C2793E95EB4F0D3D1F8091F9E310C883A3D0DEC5E1A8089A8E35A5651CC75F607EF858E730817867CDBC00BECF15D157C5EAA2; JSESSIONID=471D75879595A2727FBEDCAFE38C3F2E',
//         'Accept-Encoding':'gzip, deflate, br',
//         'Connection':'keep-alive',
//         'username':'HITS_18113075',
//         'username_temp':'18113075',
//         'password':'123456'
//     },
//     form,
//     url
// }

// axios(options).then((res) => {
//     console.log(res.data)
// }).catch((res)=>{
//     console.log(res)
// })
// axios.post('').then((res)=>{
//     console.log(res.data)
// }).catch((res) => {
//     console.log(res)
// })