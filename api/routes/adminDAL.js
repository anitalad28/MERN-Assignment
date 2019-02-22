// 1d. loading mongoose driver
var mongoose = require("mongoose");

//var userRegModel = require("../models/usrSchema");
// 5c.1 define schema (recommended to have same attributes as per the collection)
var userroleSchema = require("../schemas/userrolesschema");

// 5c.2 map the schema with the collection
//                                 name        schema                  collection
var UserRoleModel = mongoose.model("UserRoles", userroleSchema.userRoleSchema, "UserRoles");

module.exports = {
    createUserRole(request, response){
            // parsing posted data into JSON
            var role = {
                "RoleId": request.body.RoleId,
                "RoleName": request.body.RoleName               
            };
        // pass the parsed object to "create()" method
        UserRoleModel.create(role, function(err, res) {
        if (err) {
            response.statusCode = 500;
            response.send(err);
        }
        response.send({ status: 200, data: res });
        });
    },

    getRoles(request, response){        
        UserRoleModel.find().exec(function(err, res) {
            if (err) {
                response.statusCode = 500;
                response.send({ status: response.statusCode, error: err });
            }
                response.send({ status: 200, data: res });
        });
    },
  
}