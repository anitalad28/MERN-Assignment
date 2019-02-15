// 1d. loading mongoose driver
var mongoose = require("mongoose");

// attributes as per the collection)
module.exports = {
    userRoleSchema: mongoose.Schema({
        RoleId: Number,
        RoleName: String
      })
}