const express = require("express");
const controllers = require("../controllers/ControllerAlerts");
const alerts = express.Router();

alerts.route("/alertas").get(controllers.getAllAlerts);
alerts.route("/ultima-alerta").get(controllers.getLastRecord);
alerts.route("/agregar-alerta").get(controllers.createNewCoord);
alerts.route("/crear-admin").get(controllers.createNewAccountAdmin);

module.exports = alerts;