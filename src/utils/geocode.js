const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiZHJpdmVrbmlnaHQiLCJhIjoiY2syaHF2ZHFkMGJ4bzNjbzBuNHhyZ2xyNSJ9.q1BUS9PMw95KLSAzz2vTgQ&limit=1&language=en'
    request({url:url, json:true}, (error, response)=>{
        if(error){
            callback('Unable to access the service.', undefined)
        } else if(response.body.features.length === 0){
            callback('Cannot find location!', undefined);
        } else{
            data = {
                lattitude:response.body.features[0].center[0],
                longitude:response.body.features[0].center[1],
                location:response.body.features[0].place_name
            }
            callback(undefined, data)
        }
    })
}

module.exports = geocode