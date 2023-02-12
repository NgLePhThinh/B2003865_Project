const express = require("express");

const chessreporter = require("../controllers/chessreporter.controller");

const router = express.Router();

router.route("/")
    .get(chessreporter.findAllChessReporter)
    .post(chessreporter.createChessReporter);

router.route("/:id")
    .get(chessreporter.findOneChessReporter)
    .put(chessreporter.updateChessReporter);

 module.exports = router;