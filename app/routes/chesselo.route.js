const express = require("express");

const chesselo = require("../controllers/chesselo.controller");

const router = express.Router();

router.route("/")
    .get(chesselo.findAllChessElo)
    .post(chesselo.createChessElo);

router.route(":/id")
    .get(chesselo.findOneChessElo)
    .put(chesselo.updateChessElo);

 module.exports = router;