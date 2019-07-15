const path = require('path');
const express = require('express');
const hbs = require('hbs');

const request = require('request');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//Define path for Express config
const publicDirectory = (path.join(__dirname, '../public'));
const viewsPath = (path.join(__dirname, '../templates/views'));
const partialsPath = (path.join(__dirname, '../templates/partials'));


//Setup hnadlebars and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectory));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ayush',
         footer: 'footer'
    });


}); 

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ashu ',
        footer:'footer'
    });

}); 


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Babu ',
        footer: 'footer'
    });

}); 

app.get('/weather', (req, res) => {
    if (!req.query.address) {

        return res.send({
            error: 'Please enter address'
        });
    }

    geocode(req.query.address, (error, { longitude, latitude, location } = {})=> {

        if (error) {
            return res.send({ error });
        }

        forecast(longitude, latitude, (error, forecaseData) => {

            if (error) {
                return res.send({ error });
            }

            res.send({
                forecast: forecaseData,
                location,
                address : req.query.address

            })

        })
    })
   

})

app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send('Please enter your search');
     }
    
        console.log(req.query.search);
        res.send({
            products: []
        })

    
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ayush',
        errorMsg: 'Help article not found'

    });

})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ayush',
        errorMsg: 'Page not found'

    });

})


app.listen(3000, () => {
    console.log('listening on port 3000');
})