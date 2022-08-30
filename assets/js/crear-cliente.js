function unDashboard() {
  window.location.href = "/";
}

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("formLogin")
    .addEventListener("submit", functionFormLogin);
});

function functionFormLogin(e) {
  e.preventDefault();

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

  document.getElementById('btnCreateAcoount').disabled = true;

  const URL_API = "gps-arduino.herokuapp.com";

  axios
    .get(
      `https://${URL_API}/crear-admin?email=${inEmail}&password=${inPassword}`
    )
    .then(function (response) {
      if (response.data.status == "success") {
          document.getElementById('alert').className = "alert-success";
          document.getElementById('messageAlert').className = "p-3";
        document.getElementById("messageAlert").innerHTML =
        `Se ha agregado a ${inEmail} como administrador.`;
        document.getElementById("alert").style.display = "block";

        setTimeout(() => {
            window.location.href = "/salir";
        }, 400);
      } else {
        document.getElementById("messageAlert").innerHTML =
          "Credenciales incorrectas o invalidas.";
        document.getElementById("alert").style.display = "block";
      }
      return;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}
