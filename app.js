const express = require("express");
const cors = require("cors");

const app = express();

const bodyParser = require('body-parser');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.use(cors());
app.use(express.json());

const playersRouter = require("./app/routes/player.route");
const chesseloRouter = require("./app/routes/chesselo.route");
const userRouter = require("./app/routes/user.route");

const ApiArror = require("./app/api-error")


app.get("/",(req, res) =>{
    res.json({message: "Welcome to ChessProject Application!!!"})
});


app.use("/api/players",playersRouter);
app.use("/api/chesselo",chesseloRouter);
app.use("/api/users",userRouter);

// //handle 404 response
app.use((req, res, next) =>{
    return next(new ApiArror (404,"Resoure not found"))
});

app.use((err,req,res,next) =>{
    console.log(err);
    return res.status(err.statusCode || 500)
    .json({message: err.message || "Internall Server Error",});
})
module.exports = app;