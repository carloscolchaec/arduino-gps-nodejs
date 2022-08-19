document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('formLogin').addEventListener('submit', functionFormLogin);
})

function functionFormLogin(e) {
    
    e.preventDefault();

    let inEmail = document.getElementById('inEmail').value;
    let inPassword = document.getElementById('inPassword').value;


    if(inEmail == 0 && inPassword == 0){ 
        document.getElementById('messageAlert').innerHTML = "Ingresa todos los campos";
        document.getElementById('alert').style.display = "block";
        return;
    }


    if(inEmail == 0 ){ 
        document.getElementById('messageAlert').innerHTML = "Ingresa el correo electronico";
        document.getElementById('alert').style.display = "block";
        return;
    }

    if(inPassword == 0 ){ 
        document.getElementById('messageAlert').innerHTML = "Ingresa la contraseña";
        document.getElementById('alert').style.display = "block";
        return;
    }


    if(inEmail && inPassword) {
        
        axios.get(`http://localhost:3000/comprobar?email=${inEmail}&password=${inPassword}`)
        .then(function (response) {
          if(response.data.statusLogin) {
            
          } else {

          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
    }
}