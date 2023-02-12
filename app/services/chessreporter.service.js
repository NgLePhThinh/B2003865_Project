const {ObjectId} = require("mongodb");

class ChessReporterService {
    constructor(client){
        this.ChessReporter = client.db().collection("ChessReporter")
    }
    extractChessReporterData(payload){
        const chessreporter = {
            Event: payload.Event,
            White: payload.White,
            Black: payload.Black,
            WhiteID: payload.WhiteID,
            BlackID: payload.BlackID,
            WhiteElo: payload.WhiteElo,
            BlackElo: payload.BlackElo,
            Result: payload.Result,
            Date: payload.Date,
            Reporter: payload.Reporter
        }
        Object.keys(chessreporter).forEach(
            (key)=> chessreporter[key] === undefined && delete chessreporter[key]
        );
        return chessreporter;
    }
    async createChessReporter(payload){
        const chessreporter = this.extractChessReporterData(payload);
        const result = await this.ChessReporter.insertOne(chessreporter);
        return result.value;
    }
    async findChessReporter(filter) {
        const cursor = await this.ChessReporter.find(filter);
        return await cursor.toArray();
    }
    async findChessReporterByName(name) {
        return await this.ChessReporter.find({
            name: { $regex: new RegExp(name), $options: "i" },
        });
    }
    async findChessReporterById(id) {
        return await this.ChessReporter.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }
    async updateChessReporter(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractConactData(payload);
        const result = await this.ChessReporter.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result.value;
    }
}
module.exports = ChessReporterService;