var mongoose = require('../config/connection');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	celNumber: String,
	userName: String,
	active: Boolean,
	token: String,
	status: String,
	adrees: {
		city: String,
		state: String,
		country: String
	},
	following: [
		{
			following : { type: Schema.Types.ObjectId, ref: 'User' },
			followingDate: Date
		}
	],
	followers: [
		{
			follower : { type: Schema.Types.ObjectId, ref: 'User' },
			followerDate: Date
		}
	]

});

module.exports = mongoose.model('User', UserSchema);