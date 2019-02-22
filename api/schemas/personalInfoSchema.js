// 1d. loading mongoose driver
var mongoose = require("mongoose");

// attributes as per the collection)
module.exports = {
  personalSchema: mongoose.Schema({
        PersonUniqueId: Number,
        FullName: {
          FirstName: String,
          MiddleName: String,
          LastName: String,
        },        
        Gender: String,
        DateOfBirth: String,
        Age: Number,
        Address: {
          FlatBunglowNo: String,
          SocietyName: String,
          StreetAreaName: String,
          City: String,
          State: String,
          Pincode: String,
        },        
        PhoneNo: String,
        MobileNo: String,
        PhysicalDisability: String,
        MaritalStatus: String,
        EducationalStatus: String,
        BirthSign: String,
        loggedInUserId: String
      })      
}