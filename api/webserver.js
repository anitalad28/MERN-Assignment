// 1a. load express
var express = require("express");

// 1b. load the body-parser
var bodyParser = require("body-parser");

// 1d. loading mongoose driver
var mongoose = require("mongoose");

// 1e. set the global promise to manage all async calls
// made by application using mongoose driver
mongoose.Promise = global.Promise;

// 1f. load cors package
var cors = require("cors");

// 2. define an instance of express
var instance = express();

// 3a. configure the body-parser middleware
// 3a.1 use urlencoded as false to read data from http url
// as querystring,formmodel etc.
instance.use(bodyParser.urlencoded({ extended: false }));
// 3a.2 use the json() parser for body-Parser
instance.use(bodyParser.json());

// 3b. configure cors() for the express
instance.use(cors());

// 5. Model-Schema-Mapping with collection on Mongo DB and
// establishing collection with it.'
mongoose.connect(
  "mongodb://localhost/MernAppDb",
  { useNewUrlParser: true }
).then(() => {
    console.log("connected to db");
});

// 5a. get the connection object
// if dbConnect is not undefined then the connection is successful
var dbConnect = mongoose.connection;

if (!dbConnect) {
  console.log("Sorry Connection is not established");
  return;
}

var User = require("./routes/userDAL");
instance.post("/api/user/login", function(request, response) {
    User.authenticateUser(request, response);
});

// Verify the token and provide the access
instance.get("/api/products", function(request, response) {  
    User.checkUserAuthentication( request, function( err, result ) {
        if(err){
             response.send({
                success: false,
                message: "Token verification failed after callback"
            });
        } else if( result ) {            
            productModel.find().exec(function(err, res) {
                if (err) {
                response.statusCode = 500;
                response.send({ status: response.statusCode, error: err });
                }
                response.send({ status: 200, data: res });
            });
        }
    }) 
});

instance.post("/api/user/create", function(request, response) {
    User.checkUserAuthentication( request, function( err, result ) {
        if(err){
             response.send({
                success: false,
                message: "Token verification failed after callback"
            });
        } else if( result ) {            
           User.createUser(request, response);
        }
    })
});

instance.post("/api/user/checkUserName", function(request, response) {
    User.checkUserAuthentication( request, function( err, result ) {
        if(err){
             response.send({
                success: false,
                message: "Token verification failed after callback"
            });
        } else if( result ) {            
            User.checkUserName(request, response);
        }
    })    
});

var Admin = require("./routes/adminDAL");
instance.post("/api/admin/createRole", function(request, response) {
    User.checkUserAuthentication( request, function( err, result ) {
        if(err){
             response.send({
                success: false,
                message: "Token verification failed after callback"
            });
        } else if( result ) {            
           Admin.createUserRole(request, response);
        }
    })
});

// api to get roles
instance.get("/api/roles", function(request, response) {  
    User.checkUserAuthentication( request, function( err, result ) {
        if(err){
             response.send({
                success: false,
                message: "Token verification failed after callback"
            });
        } else if( result ) {            
           Admin.getRoles(request, response);
        }
    })        
});

// api to approve user
instance.put("/api/user/approve/:userId/:approvalStatus", function(request, response) { 
    User.checkUserAuthentication( request, function( err, result ) {
        if(err){
             response.send({
                success: false,
                message: "Token verification failed after callback"
            });
        } else if( result ) {            
           User.approveUser(request, response); 
        }
    })       
});


instance.get("/api/userDetails/:userId", function(request, response) {
    User.checkUserAuthentication( request, function( err, result ) {
        if(err){
             response.send({
                success: false,
                message: "Token verification failed after callback"
            });
        } else if( result ) {            
           User.getUserDetails(request, response);
        }
    }) 
});

var personalInfoRegistration = require("./routes/personalInfoDAL");

instance.post("/api/personalInfo/registration", function(request, response) { 
    User.checkUserAuthentication( request, function( err, result ) {
        if(err){
             response.send({
                success: false,
                message: "Token verification failed after callback"
            });
        } else if( result ) {            
           personalInfoRegistration.registerPersonalnfo(request, response);
        }
    }) 
});

// api to get persons
instance.get("/api/persons", function(request, response) {  
    User.checkUserAuthentication( request, function( err, result ) {
        if(err){
             response.send({
                success: false,
                message: "Token verification failed after callback"
            });
        } else if( result ) {            
            personRegistration.getPersons(request, response); 
        }
    })         
});

// api to get users
instance.get("/api/users", function(request, response) {  
    User.checkUserAuthentication( request, function( err, result ) {
        if(err){
             response.send({
                success: false,
                message: "Token verification failed after callback"
            });
        } else if( result ) {            
            User.getUsers(request, response);
        }
    })
});

// 6. start listening
instance.listen(6060, function() {
  console.log("started listening on port 6060");
});