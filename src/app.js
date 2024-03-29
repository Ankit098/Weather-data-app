const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ankit'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ankit'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Ankit'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.search){
        return res.send({
            error:"Must provide a location!"
        })
    }

    geocode(req.query.search, (error, {lattitude, longitude, location}= {}) => {
        if(error){
            return res.send({
                error : error
            })
        }
        forecast(lattitude, longitude, (error, {summary, temperature, rainChance, tHigh, tLow} = {})=>{
            if(error){
                return res.send({
                    error : error
                })
            }
            res.send({
                forecast: `${summary} Today's high is ${tHigh}^C while low is ${tLow}^C. Currently it is ${temperature}^C out. There is ${rainChance}% chance of rain.`,
                location: location
            })
        })
    })    
})

app.get('/products', (req,res)=>{
    console.log(req.query)
    res.send({
        products :[]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ankit',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ankit',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log(`Serving on port ${port}.`)
})