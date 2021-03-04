import express from "express";
import IndexController from "../controller/indexController.js";
import UserController from "../controller/userController.js";
import JsonWebTokenManagement from "../middleware/JsonWebTokenManagement.js";

var router = express.Router();
var indexControler = new IndexController();
var userController = new UserController();
var jsonWebTokenManagement = new JsonWebTokenManagement();

/* GET home page. */
router.get("/", indexControler.index);

router.get("/user", jsonWebTokenManagement.middleware, userController.getUsers);
router.post("/user", jsonWebTokenManagement.middleware,userController.createUser);
router.put("/user/:id", jsonWebTokenManagement.middleware,userController.updateUser);
router.delete("/user/:id", jsonWebTokenManagement.middleware,userController.deleteUser);

export default router;
