const express = require('express');
const path = require('path');
const hbs = require('hbs');
const app = express()
const attendance = require('./utils/attendance')
// Define path for Express Config
const publicDirPath = path.join(__dirname, "public")
const viewsPath = path.join(__dirname, "templates/views")
const partialsPath = path.join(__dirname, "templates/partials")
// port configuarion
const port = process.env.PORT || 3030

// Setting up the template engine
app.set('view engine', 'hbs')
// Setting up the path for template engine
app.set('views', viewsPath)

hbs.registerPartials(partialsPath);
// To serve static files == Mostly not needed
app.use(express.static(publicDirPath))
app.get('', (req, res) => {
    res.render('index')
})

app.get('/', function (req, res) {
    const clientIP = req.headers['x-forwarded-for'];
    res.send(`Hello World from host ${os.hostname()} ${clientIP}!`)
})

app.listen(port, () => {
    console.log(`Server is up at http://localhost:${port}`)
})