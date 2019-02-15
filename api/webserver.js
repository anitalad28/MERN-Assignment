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
  "mongodb://localhost/MeanAppDb",
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

instance.post("/api/user/create", function(request, response) {
    User.createUser(request, response);
});

var Admin = require("./routes/adminDAL");
instance.post("/api/admin/createRole", function(request, response) {
    Admin.createUserRole(request, response);
});

instance.post("/api/user/login", function(request, response) {
    User.authenticateUser(request, response);
});

var personalInfoRegistration = require("./routes/personalInfoDAL");

instance.post("/api/personalInfo/registration", function(request, response) { 
  //console.log('REQUEST' + JSON.stringify(request));
    personalInfoRegistration.registerPersonalnfo(request, response);
    // User.checkUserAuthentication( request, function( err, result ) {
    //     if(err){
    //          response.send({
    //             success: false,
    //             message: "Token verification failed after callback"
    //         });
    //     } else if( result ) {            
    //         console.log('Received Token');
    //         personalInfoRegistration.registerPersonalnfo(request, response);
    //     }
    // }) 
});

// api to get persons
instance.get("/api/persons", function(request, response) {  
    personRegistration.getPersons(request, response);      
});

// 6. start listening
instance.listen(6060, function() {
  console.log("started listening on port 6060");
});