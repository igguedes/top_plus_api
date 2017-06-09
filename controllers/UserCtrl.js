var User = require('../models/UserModel');
var UserCtrl = {};
var Fawn = require('../models/Transaction');


UserCtrl.post = function(req, res){
	user = req.body;
	var newUser = new User();
	newUser.celNumber = user.celNumber;
	newUser.userName = user.userName;
	newUser.active = true;
	newUser.status = user.status || '';
	newUser.address.city = user.city;
	newUser.address.state = user.state;
	newUser.address.country = user.country;



	newUser.save(function(err, user){
		if(!err){
			res.status(200).json({msg: "Inserido com sucesso"});
		}else{
			res.status(500).json({error:err});
		}
	});
}

UserCtrl.getFollowers = function(req, res){
	var userId = req.params.userId;
	User.find({_id: userId}, {followers: true, _id: false})
		.populate('followers.follower', '-followers -following')
		.exec(function(error, result){
			if(!error){
				res.json(result);
			}
		});
}

UserCtrl.getFollowing = function(req, res){
	var userId = req.params.userId;
	User.find({_id: userId}, {following: true, _id: false})
		.populate('following.following', '-followers -following')
		.exec(function(error, result){
			if(!error){
				res.json(result);
			}
		});
}

UserCtrl.followUser = function(req, res){
	var followingId = req.params.followingId;
	var followerId = req.params.followerId;
	var task = Fawn.Task();
	// transaction.update('User',{_id: followingId,$push:{followers: {follower: followerId, date: new Date}}});
	// transaction.update('User',{_id: followerId, $push:{following: {following: followingId, date: new Date}}});
	// transaction.run(function(error, response){
	// 	if(!error){
	// 		res.status(200).json({msg: "Operacao finalizada"});
	// 	}else{
	// 		res.status(400).json({msg: "Falha na operacao", error: error});
	// 	}
	// 	console.log(error);
	// });
	// User.findOneAndUpdate(
	// 	{_id:followingId},
	// 	{$push:{followers: {follower: followerId, date: new Date}}}
	// )
	// .exec(function(error, result){
	// 	if(!error){
	// 		res.status(200).json({msg: "Operacao finalizada"});
	// 	}else{
	// 		res.status(400).json({msg: "Falha na operacao", error: error});
	// 	}
	// });
	task.update('User',{_id: followingId,$push:{followers: {follower: followerId, date: new Date}}});
	task.run()
	.then(function(result){
		console.log(result);
	}).catch(function(error){
		console.log(error);
	});
}	

module.exports = UserCtrl;