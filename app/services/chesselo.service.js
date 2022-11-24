const {ObjectId} = require("mongodb");

class ChessEloService {
    constructor(client){
        this.ChessElo = client.db().collection("ChessElo")
    }
    extractChessEloData(payload){
        const chesselo = {
            idPlayer: payload.idPlayer,
            date: payload.date,
            std: payload.std,
            rapid: payload.rapid,
            blitz: payload.blitz

        }
        Object.keys(chesselo).forEach(
            (key)=> chesselo[key] === undefined && delete chesselo[key]
        );
        return chesselo;
    }
    async createChessElo(payload){
        const chesselo = this.extractChessEloData(payload);
        const result = await this.ChessElo.insertOne(chesselo);
        return result.value;
    }
    async findChessElo(filter) {
        const cursor = await this.ChessElo.find(filter);
        return await cursor.toArray();
    }
    async findChessEloByName(name) {
        return await this.ChessElo.find({
            name: { $regex: new RegExp(name), $options: "i" },
        });
    }
    async findChessEloById(id) {
        return await this.ChessElo.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }
    async updateChessElo(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractConactData(payload);
        const result = await this.ChessElo.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result.value;
    }
}
module.exports = ChessEloService;