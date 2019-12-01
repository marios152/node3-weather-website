const request = require('request')

const forecast =(latitude,longitude,callback)=>{

    const url = 'https://api.darksky.net/forecast/40940679d3827ba119530e2971134104/'+longitude+','+latitude+'?units=si&lang=el'

    // request({url:url,json:true},(error, response)=>{ 
    request({url,json:true},(error, {body})=>{    //url shorthand, response got destructured and

        if (error){
            callback('Unable to connect to location services',undefined)
        }else if (body.error){
            callback('Unable to find the specific corrdinates',undefined)
        }else{
            callback(undefined,body.daily.data[0].summary + ' it is currently '+ body.currently.temperature +'C degrees out. There is a '+body.currently.precipProbability +'% chance to rain' )

        }
    })
}
module.exports = forecast
