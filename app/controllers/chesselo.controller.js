const ChessEloService = require ("../services/chesselo.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.createChessElo = async (req,res, next) => {
    if(!req.body?.idPlayer){
        return next(new ApiError(400,`An error occurred`));
    }
    try{
        const chessEloService = new ChessEloService(MongoDB.client);
        console.log(req.body);
        const document = await chessEloService.createChessElo(req.body);
        return res.send(document);
    }catch(error){
        return next(
            new ApiError(500,"An error occurred while creating the new Player")
        );
    }
};
exports.findAllChessElo = async (req,res, next) => {
    let documents = [];
    try{
        const chessEloService = new ChessEloService(MongoDB.client);
        const {name} = req.query;
        if(name){
            documents = await chessEloService.findChessEloByName(name);
        }else{
            documents = await chessEloService.findChessElo({});
        }
    }catch(error){
        return next(
            new ApiError(500,"An error occurred while find All ChessElo")
        );
    }
    return res.send(documents);
};
exports.findOneChessElo = async (req,res, next) => {
    try{
        const ChessEloService = new ChessEloService(MongoDB.client);
        const document = await ChessEloService.findPlayerById(req.params.id);
        if(!document){
            return next(new ApiError(404,"Player not found"));
        }
        return res.send(document);
    } catch(error){
        return next(
            new ApiError(
                500,
                `Error retrieving Player with id = ${req.params.id}`
            )
        );
    }
};
exports.updateChessElo = async (req,res,next) => {
    if(Object.keys(req.body).length === 0){
        return next(new ApiError(400,"Data to update can not be empty"));
    }

    try{
        const ChessEloService = new PlayerService(MongoDB.client);
        const document = await ChessEloService.updatePlayer(req.params.id,req.body);
        if(!document){
            return next(new ApiError(404,"Player not found"));
        }
        return res.send({message: "Player was updated successfully"});
    }catch(error){
        return next(
            new   ApiError(500,`Erro updating Player with id = ${req.params.id}`)
        );
    }
};