console.log('client Side Javascript Loaded')

const form  = document.querySelector('form')
const rN = document.getElementById('name')
const pass = document.getElementById('password')
const error = document.getElementById('error')
const content = document.getElementById('card-body-attendance')
const card = document.getElementsByClassName("attendance-card")[0]
const team = document.getElementById('team')
const col = document.getElementById('attendance-col')
form.addEventListener('submit',(e)=> {
    e.preventDefault();
    const rollNumber = rN.value
    const password = pass.value
    team.style.display="block"
    team.scrollIntoView();
    fetch(`/attendance?rollNumber=${rollNumber}&password=${password}`).then((res) => {
        res.json().then(data => {
            if(data.error){
                error.textContent = data.error
            }
            for(let i in data ){
                if(data[i].above === false){
                    content.innerHTML += `<h4 class="card-title">${i}</h4>`
                    content.innerHTML += `<p>Attend the next <strong class="number-of-days">${data[i].numberOfClassesToAttend}</strong>  classes to be safe</p>`
                    card.style.display = 'block'
                }
                team.style.display="none"
            }
        })
        // console.log(res)
      }).catch(err => {
          error.textContent = "Kindly Check your login id and password"
      })
})