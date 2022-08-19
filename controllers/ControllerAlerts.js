const AppError = require("../utils/appError");
const conn = require("../services/dbconnection");

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
  const dataCoordsNew = {
    long: "-2.1362184",
    lat: "-79.8974804",
    time: "2022-08-12 7:37:18 am",
  };

  console.log(dataCoordsNew.lat)
  conn.query(
    `INSERT INTO tb_alerts (long_alert, lat_alert, time_alert) 
    VALUES ('${dataCoordsNew.long}','${dataCoordsNew.lat}','${dataCoordsNew.time}')`,
    function (err, data, fields) {
      if (err) return next(new AppError(err, 500));
      res.status(200).json({
        status: "success",
        created: "OK",
        report: "GPS ACTIVE AND SAVE",
      });
    }
  );

  socketEmit.io.emit("chat message", dataCoordsNew);
};
