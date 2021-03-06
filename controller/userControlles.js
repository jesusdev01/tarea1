import UserModel from "../model/userMode.js";

var user = new UserModel();

class UserController {
    constructor() { }
    async createUser(request, response) {
        var data = request.body;
        var result = await user.createUser(
            data.foto,
            data.nombre,
            data.email,
            data.password
        );
        response.status(200).json(result);
    }

    async getUsers(request, response) {
        var result = await user.getUsers();
        response.status(200).json(result);
    }
    async updateUser(request, response) {
        var id = request.params.id;
        var updatedata = request.body;
        var result = await user.updateModel(id, updatedata);
        response.status(200).json(result);
    }
    async deleteUser(request, response) {
        var id = request.params.id;
        var result = await user.deleteUser(id);
        response.status(200).json(result);
    }
}