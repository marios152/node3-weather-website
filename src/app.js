const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))

const app = express() //generate application
//Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views') // custom directory
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath)) //a way to customize our server

//ROUTES

//root
app.get('',(req,res)=>{ //this will get the views handlebar
    res.render('index',{
        title:'Weather App',
        name:'Addicted152'
    }) 
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Addicted152'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        helpmessage:'help page...',
        title: 'Help',
        name:'Addicted152'
    })
})

app.get('/products',(req,res)=>{

    if(!(req.query.search)){
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/weather',(req,res)=>{

    if(!(req.query.address)){ // if no address is provided, throw an error
        return res.send({
            error:"Error! you must add an address"
        })
    }else{


    
        geocode (req.query.address, (error, {latitude,longitude,location}={})=>{ //object data destructured    
            if (error){
                return res.send({
                    error
                })
            }
            forecast(latitude, longitude, (error, forecastData) => {
                if (error){
                    res.send({
                        error
                    })
                }
                res.send({
                    forecast:forecastData,
                    location,
                    address:req.query.address

                })
            })
        })
    }
})

app.get('/weather/*',()=>{
    res.render('404page',{
        message:'Weather page not found',
        name:'Addicted152'
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404page',{
        title:'Error 404!',
        message:'Help article not found',
        name:'Addicted152'
    })
})
//match anything that haven't been matched so far
app.get('*',(req,res)=>{
    res.render('404page',{
        title:'Error 404!',
        message:'lost??',
        name:'Addicted152'
    })
})


app.listen(3000, ()=>{
    console.log('server is up on port 3000')
})