const ChessReporterService = require ("../services/chessreporter.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
exports.createChessReporter = async (req,res, next) => {
    if(!req.body?.Event){
        return next(new ApiError(400,`An error occurred`));
    }
    try{
        const chessReporterService = new ChessReporterService(MongoDB.client);
        console.log(req.body);
        const document = await chessReporterService.createChessReporter(req.body);
        return res.send(document);
    }catch(error){
        return next(
            new ApiError(500,"An error occurred while creating the new Player")
        );
    }
};
exports.findAllChessReporter = async (req,res, next) => {
    let documents = [];
    try{
        const chessReporterService = new ChessReporterService(MongoDB.client);
        const {name} = req.query;
        if(name){
            documents = await chessReporterService.findChessReporterByName(name);
        }else{
            documents = await chessReporterService.findChessReporter({});
        }
    }catch(error){
        return next(
            new ApiError(500,"An error occurred while find All ChessReporter")
        );
    }
    res.json(documents);
};
exports.findOneChessReporter = async (req,res, next) => {
    try{
        const ChessReporterService = new ChessReporterService(MongoDB.client);
        const document = await ChessReporterService.findChessReporterById(req.params.id);
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
exports.updateChessReporter = async (req,res,next) => {
    if(Object.keys(req.body).length === 0){
        return next(new ApiError(400,"Data to update can not be empty"));
    }

    try{
        const ChessReporterService = new ChessReporterService(MongoDB.client);
        const document = await ChessReporterService.updateReporter(req.params.id,req.body);
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

