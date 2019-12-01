console.log('Client side javascript file is loaded') 

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')




weatherForm.addEventListener('submit',(e)=>{  //e stands for event
    e.preventDefault()//prevent browser from refreshing
    const location = search.value
    //console.log(location)
    message1.textContent="Loading..."
    message2.textContent=""
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            message1.textContent=data.error
            //console.log(data.error)
        }else{
            message1.textContent=data.location
            message2.textContent=data.forecast
            //console.log(data.location)
            //console.log(data.forecast)
        }
    })
})
})