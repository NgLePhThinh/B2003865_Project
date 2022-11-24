const express = require("express");

const players = require("../controllers/player.controllers");

const router = express.Router();

router.route("/")
    .get(players.findAllPlayer)
    .post(players.createPlayer)
    .delete(players.deleteAllPlayer);

router.route(":/id")
    .get(players.findOnePlayer)
    .put(players.updatePlayer)
    .delete(players.deletePlayer)

 module.exports = router;