const express = require("express");
const controllers = require("../controllers");
const router = express.Router();
const app = require('../server');
const conn = require("../services/dbconnection");
/* ====================================================
                    HOME
==================================================== */ 

router.route("/").get(controllers.Dashboard);
router.route("/login").get(controllers.Login);
module.exports = router;