const {ObjectId} = require("mongodb");

class UserService{
    constructor(client){
        this.User = client.db().collection("User")
    }
    extractUsertData(payload){
        const user = {
            email : payload.email,
            fullname : payload.email,
            password: payload.password,
            joinedday: payload.joinedday
        }
        Object.keys(user).forEach(
            (key)=> user[key] === undefined && delete user[key]
        );
        return user;
    }
    async createUser(payload){
        const user = this.extractUsertData(payload);
        console.log(user);
        const result = await this.User.findOneAndUpdate(
            user,
            { $set : {email: user.email}},
            { returnDocument: "after", upsert: true }
        );
        return result.value;
    }
    async findUser(filter) {
        const cursor = await this.User.find(filter);
        return await cursor.toArray();
    }
    async findUserByName(name) {
        return await this.User.find({
            name: { $regex: new RegExp(name), $options: "i" },
        });
    }
    async findUserById(id) {
        return await this.User.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }
    async updateUser(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractConactData(payload);
        const result = await this.User.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result.value;
    }

    async deleteUser(id) {
        const result = await this.User.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }

    async deleteAllUser() {
        const result = await this.User.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = UserService;