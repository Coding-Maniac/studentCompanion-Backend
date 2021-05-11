const got  = require('got');
const fs = require('fs')

const as =  async () => {
        const res = await got('http://studentportal.hindustanuniv.ac.in/home.htm')
        const rawHeaders = res.rawHeaders
        rawHeaders.fun = "lol"
        console.log(res.rawHeaderste)
        const response = await got.post('http://studentportal.hindustanuniv.ac.in/',{
                headers:{
                        'Accept-Encoding': 'gzip, deflate',
                        'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
                        'Connection':' close',
                        'Origin': 'https://studentportal.hindustanuniv.ac.in',
                        'Content-Type':' application/x-www-form-urlencoded',
                        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                    },
                form:{
                        username_temp:"18113075",
                        username:"HITS_18113075",
                        password:'123456',
                }
                
        })
        console.log(response.rawHeaders)
}
as();