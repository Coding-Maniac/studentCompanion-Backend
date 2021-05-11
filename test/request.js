const rp = require("request-promise");

var options = {
    method: 'POST',
    uri:"https://studentportal.hindustanuniv.ac.in/home.htm",
    form:{
        username_temp:"18113075",
        username:"HITS_18113075",
        password:'123456',
    },
    headers:{
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
        'Connection':' close',
        'Origin': 'https://studentportal.hindustanuniv.ac.in',
        'Content-Type':' application/x-www-form-urlencoded',
        'User-Agent':' Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    }
}

rp(options).then(function(body){
    console.log('success')
    console.log(body)
}).catch(function(err){
    console.log('error')
    console.log(err)

})