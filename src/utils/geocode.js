const request = require('request')

const geocode=(address, callback)=>{
    //safe url
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibWFyaW9zMTUyIiwiYSI6ImNrM2ZxbjU4MzA3MzEzcHBnZ205aHlzanQifQ.f_goeU2c-ZSSE5m3rLf1QA&limit=1'


    request({url,json:true},(error, {body})=>{

        if(error){
            callback('Unable to connect to location services',undefined) // data will get the value of undefined since there is an error

        }else if (body.features.length === 0){
            callback('Unable to find location. Try another search')
        }else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            }) // here the error variable gets the undefined value
        }
    })
}

module.exports = geocode