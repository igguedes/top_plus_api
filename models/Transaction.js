var mongoose = require('../config/connection');
var Fawn = require("fawn");
Fawn.init(mongoose);
module.exports = Fawn;