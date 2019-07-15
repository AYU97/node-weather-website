const request = require('request');

const forecast = (longitude, latitude, callback) => {

    const forcasturl = 'https://api.darksky.net/forecast/650b2d28b15bdc971940b428fc499299/37.8267,-122.4233?';

    request({ url: forcasturl, json: true }, (error, { body}) => {

        if (error) {
            callback('Unable to connect to the weather app! Check connection.', undefined);
        } else if (error) {
            callback('Unable to find location, try another search', undefined);
        } else {
            callback(undefined, 

          body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out . There is a ' + body.currently.precipProbability + '% chance of rain. ' + ' The temperature high for today is ' +body.daily.data[0].temperatureHigh + ' degrees and the temperature low is ' +body.daily.data[0].temperatureLow +' degress.'
               
                


            )
        }
    })


}

module.exports = forecast;