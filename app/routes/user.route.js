const express = require("express");

const user = require("../controllers/user.controllers");

const router = express.Router();

router.route("/")
    .get(user.findAllUser)
    .post(user.createUser)
    .delete(user.deleteAllUser);

router.route(":/id")
    .get(user.findOneUser)
    .put(user.updateUser)
    .delete(user.deleteUser)

 module.exports = router;