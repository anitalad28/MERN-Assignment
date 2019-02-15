// 1d. loading mongoose driver
var mongoose = require("mongoose");

// attributes as per the collection)
module.exports = {
    userSchema: mongoose.Schema({
        UserId: Number,
        UserName: String,
        EmailAddress: String,
        Password: String,
        RoleId: Number
      })
}