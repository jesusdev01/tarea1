import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

var key = "jesusmorales";
var user = new User();

class JsonWebTokenManagement {
  constructor() {}
  sign(params) {
    return jwt.sign(
      { data: params, exp: Math.floor(Date.now()/1000)+60*60},
      key
    );
  }

  async middleware(request, response, next) {
    const token = request.headers["authorization"];
    if (token == null) {
      response.status(200).json({
        serverResponse: "No tiene autorizacion",
      });
      return;
    }

    jwt.verify(token, key, function (err, payload) {
      if (err) {
        response.status(200).json(err);
        return;
      }
      next();
    });
  }
}
export default JsonWebTokenManagement;
