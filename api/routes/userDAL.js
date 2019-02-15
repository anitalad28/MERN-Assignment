// 1d. loading mongoose driver
var mongoose = require("mongoose");

// 1a. load express
var express = require("express");

// 2. define an instance of express
var instance = express();

// 5b.1 define schema (recommended to have same attributes as per the collection)
var usersSchema = require("../schemas/userschema");

//5b.2. map the schema with the collection
//                              name        schema          collection
var userModel = mongoose.model("Users", usersSchema.userSchema, "Users");

// 1c. load JSON web Token
var jwt = require("jsonwebtoken");

/*  region Login User anf generate token */
var jwtSettings = {
    jwtSecret: "dbcsbiobc0708hdfcyesbombob"
}

// set the secret with express object
instance.set("jwtSecret", jwtSettings.jwtSecret);

module.exports = {
    createUser(request, response){
            // parsing posted data into JSON
            var user = {
                "UserId": request.body.UserId,
                "UserName": request.body.UserName,
                "EmailAddress": request.body.EmailAddress,
                "Password": request.body.Password,
                "RoleId": request.body.RoleId
            };
        // pass the parsed object to "create()" method
        userModel.create(user, function(err, res) {
        if (err) {
            response.statusCode = 500;
            response.send(err);
        }
        response.send({ status: 200, data: res });
        });
    },

    authenticateUser(request, response) {
        var user = {
            UserName: request.body.Username,
            Password: request.body.Password
        };
    
        console.log("In authenticate user: " + JSON.stringify(user));
    
        // pass the parsed object to "create()" method
        userModel.findOne({ UserName: request.body.Username }, function(err, usr) {
            if (err) {
               console.log("Some error occurred");
               throw error;
            }
            if(!usr){
                response.send({
                    statusCode: 404,
                    message: "Sorry! User is not availabe"
                });
            } else { // Adminitrator or Operator
                // If user is avilable but password do not match
                // send the error
                console.log("In else if " + JSON.stringify(usr));
    
                if( usr.Password != user.Password ) {
                    response.send({
                        statusCode: 404,
                        message: "Sorry! Username and passsword do not match"
                    }); 
                } else {
                    var token = jwt.sign({ usr }, instance.get("jwtSecret"), {
                        expiresIn: 3600
                    })
    
                    //save token globally
                    tokenStore = token;
                    response.send({
                        authenticated: true,
                        message: "Login Success",
                        token: token,
                    });     
                }
            }
            // } else {
            //     response.send({
            //         statusCode: 404,
            //         message: "You don't have permission to create user."
            //     }); 
            // }
        });
    },

    checkUserAuthentication( request, callback) {     
       // Read request headers , headers contains bearer <token>
        var tokenReceived = request.headers.authorization.split(" ")[1];
        console.log('tokenReceived -- ' + tokenReceived  );
        
       jwt.verify( tokenReceived, instance.get("jwtSecret"), function( err, decoded ){
           console.log("In verify call back function");
           if(err){
               console.log("In Auth Error");        
               callback( err, "");
           } else {
               console.log("In Auth success");
               // Decode the request
               request.decoded = decoded;
               callback( null, true);      
           }
       });  
   }
}