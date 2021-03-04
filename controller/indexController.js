import User from "../model/userMode.js";

var user = new User();
class IndexController {
  constructor() {}
  //services
  index(request, response) {
    response.status(200).json({ msn: "HOLA MUNDO DESDE REST" });
  }

  async login(request, response) {
    const body = request.body;
    //Validacion.
    let filter = { email: body.email, password: Sha1(body.password) };
    let list = await user.getUsers(filter);
    console.log(list);
    if (list.length == 1) {
      let jsonwebdata = { email: list[0].email, id: list[0].id };
      console.log(jsonwebdata);
      let token = jsonwebtoken.sign(jsonwebdata);
      response.status(200).json({ token });
      return;
    }
    response
      .status(200)
      .json({ serverResponse: "El password es incorrecto" });
  }


}
export default IndexController;
