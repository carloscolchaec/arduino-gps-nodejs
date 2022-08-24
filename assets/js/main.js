Push.Permission.request();

var Sara = new Artyom();

Sara.initialize({
  lang: "es-ES",
});

$(window).on('load', function () {
  setTimeout(function () {
      $(".loader-page").css({
          visibility: "hidden",
          opacity: "0"
      })
  }, 2000);

});


console.log(`
_______ ______ _______      _______ _______ _______ _______ _______
|     __|   __ \     __|    |_     _|    ___|     __|_     _|     __|
|    |  |    __/__     |      |   | |    ___|__     |_|   |_|__     |
|_______|___|  |_______|      |___| |_______|_______|_______|_______|

\t\t\t\tTRABAJO REALIZADO EN NODEJS Y ARDUINO\n
`);

axios
  .get("https://gps-arduino.herokuapp.com/ultima-alerta")
  .then(function (response) {
    let dataLastGPS = response.data.data;

    dataLastGPS.forEach((e) => {
      let LatAlert = e.lat_alert;
      let LongAlert = e.long_alert;
      let timeNow = moment(e.time_alert).format("YYYY-MM-DD h:mm:ss a");
      genLastViewGPS(LatAlert, LongAlert, timeNow);

      
    });
  })
  .catch(function (error) {
    console.log(error);
  });

  var socket = io();
var map_init = L.map("map", {
  center: [-1.0304456, -78.8231194],
  zoom: 8,
});



var osm = L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {}
).addTo(map_init);

function genLastViewGPS(lat, long, time) {
  L.marker([long, lat], {})
    .addTo(map_init)
    .bindPopup(
      `Longitud: ${long} <br>
            Latitud: ${lat} <br>
            Hora: ${time}`
    )
    .openPopup();

  L.circle([long, lat], {
    color: "red",
    fillColor: "#f03",
    fillOpacity: 0.2,
    stroke: false,
    radius: 10000,
  }).addTo(map_init);
}

socket.on("chat message", function (msg) {
  Swal.fire({
    icon: "warning",
    title: "Hemos detectado una actividad...",
    html: "<strong>Espera un momento mientras establecemos conexión.</strong>",
    showCancelButton: false,
    showConfirmButton: false,
  });

  Push.create("ALERTA DETECTADA!", {
    body: "HEMOS DETECTADO UN REPORTE DE ALERTA.",
    timeout: 8000,
    vibrate: [100, 100, 100],
    onClick: function () {
      console.log(this);
    },
  });

  document.getElementById("listAlerts").innerHTML += `
  <div class="py-1 p-2">
  <div class="card">
  <div class="card-body">
    <h5 class="card-title">⚠️ Nueva Alerta Detectada</h5>
    <h6 class="card-subtitle mb-2 text-muted">Hora de la alerta: ${msg.time}</h6>
    <p class="card-text">
      Longitud: ${msg.long} <br>
      Latitud: ${msg.lat}
    </p>
  </div>
</div>
  </div>
   `;
  Sara.say("ALERTA DETECTADA!");
  setTimeout(() => {
    window.location.reload();
  }, 5000);
});

axios
  .get("https://gps-arduino.herokuapp.com:5000/alertas")
  .then(function (response) {
    let listAlerts = response.data.data;

    listAlerts.forEach((e) => {
      let timeNow = moment(e.time_alert).format("YYYY-MM-DD h:mm:ss a");
      document.getElementById("listAlerts").innerHTML += `
       <div class="py-1 p-2">
       <div class="card">
       <div class="card-body" id="alert${e.id_alert}">
         <h5 class="card-title">⚠️ Nueva Alerta Detectada</h5>
         <h6 class="card-subtitle mb-2 text-muted">Hora de la alerta: ${timeNow}</h6>
         <p class="card-text">
           Longitud: ${e.long_alert} <br>
           Latitud: ${e.lat_alert}
         </p>

       </div>
     </div>
       </div>
        `;
    });
  })
  .catch(function (error) {
    console.log(error);
  });
