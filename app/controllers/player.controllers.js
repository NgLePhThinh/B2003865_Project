const PlayerService = require("../services/player.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

//#region Create and Save a new Player
exports.createPlayer = async (req,res, next) => {

    if(!req.body?.firstName){
        return next(new ApiError(400,`An error occurred`));
    }
    try{
        const playerService = new PlayerService(MongoDB.client);
        // console.log(req.body);
        const document = await playerService.createPlayerr(req.body);
        return res.send(document);
    }catch(error){
        return next(
            new ApiError(500,"An error occurred while creating the new Player")
        );
    }
};
//#endregion
//#region Retrieve all Players of  a user from the database
exports.findAllPlayer = async (req,res, next) => {
    let documents = [];
    try{
        const playerService = new PlayerService(MongoDB.client);
        const {name} = req.query;
        console.log(name)
        if(name){
            documents = await playerService.findPlayerByName(name);
        }else{
            documents = await playerService.findPlayer({});
        }
    }catch(error){
        return next(
            new ApiError(500,"An error occurred while creating the Player")
        );
    }
    return res.send(documents);
};
//#endregion

//#region Find a single Player with an id
exports.findOnePlayer = async (req,res, next) => {
    try{
        const playerService = new PlayerService(MongoDB.client);
        const document = await playerService.findPlayerById(req.params.id);
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
//#endregion

//#region Update a Player by the id in the require
exports.updatePlayer = async (req,res,next) => {
    if(Object.keys(req.body).length === 0){
        return next(new ApiError(400,"Data to update can not be empty"));
    }

    try{
        const playerService = new PlayerService(MongoDB.client);
        const document = await playerService.updatePlayer(req.params.id,req.body);
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
//#endregion

//#region Delete a player with the specified id in the request
exports.deletePlayer = async (req,res,next) => {
    try{
        const playerService = new PlayerService(MongoDB.client);
        const document = await playerService.deletePlayer(req.params.id);
        if(!document){
            return next(new ApiError(404,"Player not found"));
        }
        return res.send({ message: "Player was deleted successfully"});
    }catch(error){
        return next(
            new ApiError(
                500,
                `Could not delete Player with id = ${req.params.id}`
            )
        ); 
    }
};
//#endregion
//#region  delete All player
exports.deleteAllPlayer = async (_req,res,next) => {
    try{
        const playerService = new PlayerService(MongoDB.client);
        const deletedCount = await playerService.deleteAllPlayer();
        return res.send({
            message: `${deletedCount} Players were deleted successfully`,
        });
    }catch(error){
        return next(
            new ApiError(500, "An error occurred while removing all Players")
        );
    }
};
//#endregion