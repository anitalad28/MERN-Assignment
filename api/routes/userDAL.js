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
        let user = request.body;
        userModel.create(user, function(err, res) {
            if (err) {           
                response.send({ status: 500, error: err });
            }
            response.send({ status: 200, data: res });
        });
    },

    updateUser(request, response){
        let userId = request.params.UserId
        let user = request.body;

        userModel.updateOne({ UserId:userId },{ $set: user }, function(err, res) {
            if (err) {
                response.send({ status: 500, error: err });
            }
            response.send({ status: 200, data: res });
        });
    },

    checkUserName(request, response){
         userModel.findOne({UserName:request.body.UserName}).exec(function(err, res) {
            if (err) {                
                response.send({ status: 500, error: err });
            }            
            if(res) {
                response.send({ status: 200, message: "User name is available" });
            } else {
                response.send({ status: 404, message: "User name is not available" });
            }
        });   
    },

    getUsers(request, response){       
        userModel.find().exec(function(err, res) {
            if (err) {
                response.send({ status: 500, error: err });
            }
            response.send({ status: 200, data: res });
        });
    },

    getPendingUsers(request, response){       
        userModel.find({ IsApproved:'Pending' }).exec(function(err, res) {
            if (err) {
                response.send({ status: 500, error: err });
            }
            response.send({ status: 200, data: res });
        });
    },

    getUserDetails(request, response) {
        let UserId = request.params.userId;
        userModel.find({ UserId : UserId }).exec(function(err, res) {
            if (err) {
                response.send({ status: 500, error: err });
            }             
            response.send({ status: 200, data: res });
        });
    },

    approveUser(request, response) { 
        let UserId = request.params.userId;           
        userModel.updateOne({ _id : UserId },{ $set: { IsApproved :  'Approved' } }, function(err, res) {
            if (err) {
                response.send({ status: 500, error: err });
            }
            response.send({ status: 200, data: res });        
        });
    }, 
    
    rejectUser(request, response){ 
        let UserId = request.params.userId;        
        userModel.updateOne({ _id : UserId },{ $set: { IsApproved :  'Unauthorized' } }, function(err, res) {
            if (err) {
                response.send({ status: 500, error: err });
            }
            response.send({ status: 200, data: res });        
        });
    },

    updateUserPersonalInfoStatus(request, response){ 
        let UserId = request.params.userId;        
        userModel.updateOne({ UserId : UserId },{ $set: { PersonalInfo : true } }, function(err, res) {
            if (err) {
                response.send({ status: 500, error: err });
            }
            response.send({ status: 200, data: res });        
        });
    },
    
    pendingUser(request, response){ 
        let UserId = request.params.userId;        
        userModel.updateOne({ UserId : UserId },{ $set: { IsApproved :  'Pending' } }, function(err, res) {
            if (err) {
                response.send({ status: 500, error: err });
            }
            response.send({ status: 200, data: res });        
        });
    },

    authenticateUser(request, response) {
        let user = request.body; 
        userModel.findOne({ UserName: request.body.Username }, function(err, usr) {
            if (err) {
               console.log("Some error occurred");
               throw error;
            }
            if(!usr) {
                response.send({
                    status: 404,
                    message: "Sorry! You are unauthorized user"
                });
            } else {     
                if( usr.Password != user.Password ) {
                    response.send({
                        status: 404,
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
                            role: usr.Role,
                            uid:usr.UserId
                    });     
                }
            }            
        });
    },

    checkUserAuthentication( request, callback) {       
        let tokenReceived = request.headers.authorization.split(" ")[1];
        
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