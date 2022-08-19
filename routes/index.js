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



// router.route("/comprobar").get(controllers.loginSecurity);


module.exports = router;