const {ObjectId} = require("mongodb");

class PlayerService{
    constructor(client){
        this.Player = client.db().collection("Playerr")
    }
    extractPlayertData(payload){
        const player = {
            firstName: payload.firstName,
            lastName: payload.lastName,
            federation: payload.federation,
            fedImg: payload.fedImg,
            Sex: payload.Sex,
            FIDETitle: payload.FIDETitle,
            WorldRank: payload.WorldRank,
            std: payload.std,
            rapid: payload.rapid,
            blitz: payload.blitz,
            avatar: payload.avatar,
            B_Year: payload.B_Year,

        }
        Object.keys(player).forEach(
            (key)=> player[key] === undefined && delete player[key]
        );
        return player;
    }
    async createPlayerr(payload){
        const player = this.extractPlayertData(payload);
        console.log(player);
        const result = await this.Player.findOneAndUpdate(
            player,
            { $set : {firstName: player.firstName}},
            { returnDocument: "after", upsert: true }
        );
        return result.value;
    }
    async findPlayer(filter) {
        const cursor = await this.Player.find(filter);
        return await cursor.toArray();
    }
    async findPlayerByName(name) {
        return await this.Player.find({
            name: { $regex: new RegExp(name), $options: "i" },
        });
    }
    async findPlayerById(id) {
        return await this.Player.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }
    async updatePlayer(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractConactData(payload);
        const result = await this.Player.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result.value;
    }

    async deletePlayer(id) {
        const result = await this.Player.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }

    async deleteAllPlayer() {
        const result = await this.Player.deleteMany({});
        return result.deletedCount;
    }
    async getBlackWhite(playerid){
        return await this.Player.findOne({
            _id: playerid
        })
    }
}

module.exports = PlayerService;