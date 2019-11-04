console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const p1 = document.querySelector('#mesg-1')
const p2 = document.querySelector('#mesg-2')


weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const location = search.value

    const url = 'http://localhost:3000/weather?search=' + location;
    p1.textContent = 'Loading...'
    p2.textContent = ''
    fetch(url).then((response)=>{
        response.json().then((data)=>{
            if(data.error) {
                console.log(data.error)
                p1.textContent = data.error
                p2.textContent = ''                
            }
            else {
                p1.textContent = data.location
                p2.textContent = data.forecast
            }
        })
    })
})

