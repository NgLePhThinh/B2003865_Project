const UserService = require("../services/user.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

//#region Create and Save a new User
exports.createUser = async (req,res, next) => {

    if(!req.body?.email){
        return next(new ApiError(400,`An error occurred`));
    }
    try{
        const userService = new UserService(MongoDB.client);
        const document = await userService.createUser(req.body);
        return res.send(document);
    }catch(error){
        return next(
            new ApiError(500,"An error occurred while creating the new User")
        );
    }
};
//#endregion
//#region Retrieve all User of  a user from the database
exports.findAllUser = async (req,res, next) => {
    let documents = [];
    try{
        const userService = new UserService(MongoDB.client);
        const {name} = req.query;
        console.log(name)
        if(name){
            documents = await userService.findUserByName(name);
        }else{
            documents = await userService.findUser({});
        }
    }catch(error){
        return next(
            new ApiError(500,"An error occurred while creating the User")
        );
    }
    return res.send(documents);
};
//#endregion

//#region Find a single User with an id
exports.findOneUser = async (req,res, next) => {
    try{
        const userService = new UserService(MongoDB.client);
        const document = await userService.findUserById(req.params.id);
        if(!document){
            return next(new ApiError(404,"User not found"));
        }
        return res.send(document);
    } catch(error){
        return next(
            new ApiError(
                500,
                `Error retrieving User with id = ${req.params.id}`
            )
        );
    }
};
//#endregion

//#region Update a User by the id in the require
exports.updateUser = async (req,res,next) => {
    if(Object.keys(req.body).length === 0){
        return next(new ApiError(400,"Data to update can not be empty"));
    }
    try{
        const userService = new UserService(MongoDB.client);
        const document = await userService.updateUser(req.params.id,req.body);
        if(!document){
            return next(new ApiError(404,"User not found"));
        }
        return res.send({message: "User was updated successfully"});
    }catch(error){
        return next(
            new   ApiError(500,`Erro updating User with id = ${req.params.id}`)
        );
    }
};
//#endregion

//#region Delete a user with the specified id in the request
exports.deleteUser = async (req,res,next) => {
    try{
        const userService = new UserService(MongoDB.client);
        const document = await userService.deleteUser(req.params.id);
        if(!document){
            return next(new ApiError(404,"User not found"));
        }
        return res.send({ message: "User was deleted successfully"});
    }catch(error){
        return next(
            new ApiError(
                500,
                `Could not delete User with id = ${req.params.id}`
            )
        ); 
    }
};
//#endregion
//#region  delete All User
exports.deleteAllUser = async (_req,res,next) => {
    try{
        const userService = new UserService(MongoDB.client);
        const deletedCount = await userService.deleteAllUser();
        return res.send({
            message: `${deletedCount} Users were deleted successfully`,
        });
    }catch(error){
        return next(
            new ApiError(500, "An error occurred while removing all Players")
        );
    }
};
//#endregion