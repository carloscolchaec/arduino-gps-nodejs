const AppError = require("../utils/appError");
const conn = require("../services/dbconnection");

var moment = require('moment');

const socketEmit = require("../server.js");

exports.getAllAlerts = (req, res, next) => {
  conn.query("SELECT * FROM tb_alerts", function (err, data, fields) {
    if (err) return next(new AppError(err));
    res.status(200).json({
      status: "success",
      length: data?.length,
      data: data,
    });
  });
};

exports.getLastRecord = (req, res, next) => {
  conn.query(
    "SELECT * FROM tb_alerts WHERE id_alert=(select max(id_alert) From tb_alerts )",
    function (err, data, fields) {
      if (err) return next(new AppError(err));
      res.status(200).json({
        status: "success",
        length: data?.length,
        data: data,
      });
    }
  );
};

exports.createNewCoord = (req, res, next) => {
  let { long, lat } = req.query;
  var now = moment().format("YYYY-MM-DD HH:mm:ss");
  const dataCoordsNew = {
    long: long,
    lat: lat,
    time: now,
  };

  conn.query(
    `INSERT INTO tb_alerts (long_alert, lat_alert, time_alert) 
    VALUES ('${dataCoordsNew.long}','${dataCoordsNew.lat}','${dataCoordsNew.time}')`,
    function (err, data, fields) {
      if (err) return next(new AppError(err, 500));
      res.status(200).json({
        status: "success",
        created: "OK",
        data: dataCoordsNew,
        report: "GPS ACTIVE AND SAVE",
      });
    }
  );

  socketEmit.io.emit("chat message", dataCoordsNew);
};
