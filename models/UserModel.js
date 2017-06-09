var mongoose = require('../config/connection');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	celNumber: String,
	userName: String,
	active: Boolean,
	status: String,
	address: {
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
	],
	depoiments: [
		{
			from : { type: Schema.Types.ObjectId, ref: 'User' },
			date: Date,
			message: String
		}
	],
	advices: [
		{
			from : { type: Schema.Types.ObjectId, ref: 'User' },
			date: Date,
			message: String
		}
	]

});

module.exports = mongoose.model('User', UserSchema);