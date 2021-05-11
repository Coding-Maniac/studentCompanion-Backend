console.log('client Side Javascript Loaded')

const form  = document.querySelector('form')
const rN = document.getElementById('name')
const pass = document.getElementById('password')
const content = document.getElementById('content')
form.addEventListener('submit',(e)=> {
    e.preventDefault();
    const rollNumber = rN.value
    const password = pass.value
    content.textContent = " Fetching Your Attendance Please Wait "
    fetch(`/attendance?rollNumber=${rollNumber}&password=${password}`).then((res) => {
        res.json().then(data => {
            console.log(data)
            content.textContent = ""
            for(let i in data ){
                if(data[i].above === false){
                    content.innerHTML += `<h1>${i}</h1>`
                    content.innerHTML += `<h2> Attend the next <strong>${data[i].numberOfClassesToAttend}</strong> classes to stay safe  </h2>`
                }
            }
        })
        // console.log(res)
      })
})