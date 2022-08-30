Push.Permission.request();

var Sara = new Artyom();
var socket = io();
const URL_API = "gps-arduino.herokuapp.com";

Sara.initialize({
  lang: "es-ES",
});

$(window).on("load", function () {
  setTimeout(function () {
    $(".loader-page").css({
      visibility: "hidden",
      opacity: "0",
    });
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
  .get(`https://${URL_API}/ultima-alerta`)
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

var map_init = L.map("map", {
  center: [-1.0304456, -78.8231194],
  zoom: 8,
  attributionControl: false,
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
    radius: 30,
  }).addTo(map_init);
}

socket.on("chat message", function (msg) {
  map_init.setView([msg.long, msg.lat], 17);
  L.marker([msg.long, msg.lat], {})
    .addTo(map_init)
    .bindPopup(
      `Longitud: ${msg.long} <br>
          Latitud: ${msg.lat} <br>
          Hora: ${msg.time}`
    )
    .openPopup();

  L.circle([msg.long, msg.lat], {
    color: "red",
    fillColor: "#f03",
    fillOpacity: 0.2,
    stroke: false,
    radius: 30,
  }).addTo(map_init);

  Swal.fire({
    icon: "warning",
    title: "Hemos detectado una actividad...",
    html: `<div class="text-left">
    <strong>🌐 Espera un momento mientras establecemos conexión.</strong><br>
    <div id="dataCopy">
    Latitud: ${msg.lat}<br>
    Longitud: ${msg.long}<br>
    Hora Registrada: ${msg.time}<br>
    </div>
    <div class="py-3">
    <button class="btn btnCustom2 btn-block" onclick="copyData('dataCopy')">⚠️ Localizar e Copiar Información 📌</button>
    </div>
    </div>`,
    showCancelButton: false,
    showConfirmButton: false,
  });
});

function copyData(n1) {
  var cs = document.createElement("div");
  cs.setAttribute("contentEditable", true);
  cs.innerHTML = document.getElementById(n1).innerHTML;
  cs.setAttribute("onfocus", "document.execCommand('selectAll',false,null)");
  document.body.appendChild(cs);
  console.log(cs);
  cs.focus();
  document.execCommand("copy");
  document.body.removeChild(cs);
  Push.create("Alerta-Informes!", {
    body: "La información de la ubicación ha sido copiada.",
    timeout: 8000,
    vibrate: [100, 100, 100],
    onClick: function () {
      console.log(this);
    },
  });
  swal.close();

  showDataListAlert();
}

function showDataListAlert() {
  document.getElementById("listAlerts").innerHTML = "";

  axios
    .get(`https://${URL_API}/alertas`)
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
         <button class="btn btnCustom2 btn-block" onclick="locationPoint('${e.id_alert}','${e.long_alert}','${e.lat_alert}')">⚠️ Localizar </button>
       </div>
     </div>
       </div>
        `;
      });
    })
    .catch(function (error) {
      console.log(error);
    });
}

showDataListAlert();

function locationPoint(id, long, lat) {
  console.log(id, long, lat);
  map_init.setView([long, lat], 17);
  L.marker([long, lat], {})
    .addTo(map_init)
    .bindPopup(
      `Longitud: ${long} <br>
          Latitud: ${lat} <br>`
    )
    .openPopup();

  L.circle([long, lat], {
    color: "red",
    fillColor: "#f03",
    fillOpacity: 0.2,
    stroke: false,
    radius: 30,
  }).addTo(map_init);
}

function closeAccount() {
  window.location.href = "/salir";
}

function createAccount() {
  window.location.href = "/crear-cliente";
}