// 1d. loading mongoose driver
var mongoose = require("mongoose");

//var userRegModel = require("../models/usrSchema");
// 5c.1 define schema (recommended to have same attributes as per the collection)
var personalInfoSchema = require("../schemas/personalInfoSchema");

// 5c.2 map the schema with the collection
//                                 name        schema                  collection
var personalInfoModel = mongoose.model("PersonalInfo", personalInfoSchema.personalSchema, "PersonalInfo");

module.exports = { 
    registerPersonalnfo(request, response) {
        // parsing posted data into JSON
        var person = {
            "PersonUniqueId": request.body.PersonUniqueId,
            "FullName": request.body.FullName, 
            "Gender": request.body.Gender,
            "DateOfBirth": request.body.DateOfBirth,
            "Age": request.body.Age,
            "Address": request.body.Address,         
            "PhoneNo": request.body.PhoneNo,
            "MobileNo": request.body.MobileNo,
            "PhysicalDisability": request.body.PhysicalDisability,
            "MaritalStatus": request.body.MaritalStatus,
            "EducationalStatus": request.body.EducationalStatus,
            "BirthSign": request.body.BirthSign,
            "loggedInUserId":  request.body.loggedInUserId    
            
        };
        console.log('Person - ' + JSON.stringify(person));
        // pass the parsed object to "create()" method
        personalInfoModel.create(person, function(err, res) {
            if (err) {
                response.statusCode = 500;
                response.send(err);
            }
            response.send({ status: 200, data: res });
        });
    },

    getPersons(request, response) {
        personalInfoModel.find().exec(function(err, res) {
            if (err) {
                response.statusCode = 500;
                response.send({ status: response.statusCode, error: err });
            }
                response.send({ status: 200, data: res });
        });
    }
}