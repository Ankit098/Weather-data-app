const request = require('request')

const forecast = (lattitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/522d7619f3237b24f6ab4f52bdcff7cd/'+ longitude + ',' + lattitude +'?units=si'
    request({url, json:true}, (error, {body})=>{
        if(error){
            callback('Unable to connect to the service', undefined)
        } else if(body.error){
            callback('Cannot find location!', undefined)
        } else{
            callback(undefined,{
                temperature : body.currently.temperature,
                rainChance : body.currently.precipProbability,
                summary : body.daily.data[0].summary,
            })
        }
    })
}

module.exports = forecast