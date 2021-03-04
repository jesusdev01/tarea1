import mongoose from "../connect/connect.js";

class UserModel {
    constructor(){
        this.Schema = mongoose.Schema;
        this.UserSchema = new this.Schema({
            foto : String,
            nombre : String,
            email:{
                type: String,
                validate: {
                  validator: (value) => {
                    return /^[\w\.]+@[\w\.]+\.\w{2,3}$/g.test(value);
                  },
                  message: (props) => `Este email de nombre ${props.value} es invalido`,
                }},
            password:String,
        })
        this.mymodel = mongoose.model("users", this.UserSchema);
    }
    

async createUser(foto,nombre,email,password){
    var user = {
        foto,
        nombre,
        email,
        password
    };
    var newuser = new this.mymodel(user);
    return new Promise((resolve, reject) => {
      newuser.save().then((docs) => {
        console.log("Usuario registrado");
        resolve(docs);
      });
    });
}

async getUsers(){
    return new Promise((resolve, reject) => {
      this.mymodel.find({}),(err,docs)=>{
            resolve(docs);
      }      
      })
}

async updateModel(id, userUpdate) {
    return new Promise((resolve, reject) => {
      this.mymodel.update({ _id: id }, { $set: userUpdate }, (err, docs) => {
        if (err) {
          console.log(err);
          resolve(err);
          return;
        }
        resolve(docs);
      });
    });
  }
  
async deleteUser(id) {
    return new Promise((resolve, reject) => {
      this.mymodel.remove({ _id: id }).then((err, docs) => {
        if (err) {
          console.log(err);
          resolve(err);
          return;
        }
        resolve(docs);
      });
    });
  }
}
export default UserModel;