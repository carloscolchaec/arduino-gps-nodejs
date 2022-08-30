document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("formLogin")
    .addEventListener("submit", functionFormLogin);
});

function functionFormLogin(e) {
  e.preventDefault();
  
  const URL_API = "gps-arduino.herokuapp.com";

  let inEmail = document.getElementById("inEmail").value;
  let inPassword = document.getElementById("inPassword").value;


  if (inEmail == 0 && inPassword == 0) {
    document.getElementById("messageAlert").innerHTML =
      "Ingresa todos los campos";
    document.getElementById("alert").style.display = "block";
    return;
  }

  if (inEmail == 0) {
    document.getElementById("messageAlert").innerHTML =
      "Ingresa el correo electronico";
    document.getElementById("alert").style.display = "block";
    return;
  }

  if (inPassword == 0) {
    document.getElementById("messageAlert").innerHTML = "Ingresa la contraseña";
    document.getElementById("alert").style.display = "block";
    return;
  }


    axios
      .get(
        `https://${URL_API}/comprobar?email=${inEmail}&password=${inPassword}`
      )
      .then(function (response) {
        if (response.data.status == "success") {
          window.location.href = "/";
        } else {
          document.getElementById("messageAlert").innerHTML =
            "Credenciales incorrectas o invalidas.";
          document.getElementById("alert").style.display = "block";
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  
}
