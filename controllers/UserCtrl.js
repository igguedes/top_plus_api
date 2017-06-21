var User = require('../models/UserModel');
var UserCtrl = {};
var Fawn = require('fawn');

//var Transaction = require('mongoose-transaction')(User);

UserCtrl.post = function(req, res){
	user = req.body;
	console.log(user);
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
	//console.log(req.params);
	var FollowingId = req.params.followingId;
	console.log('FollowingID: ',FollowingId);
	var FollowerId = req.params.followerId;
	console.log('FollowerID: ', FollowerId);
	if(FollowerId === undefined || FollowingId === undefined){
		return res.status(400).json({msg: "Falha na operacao - id não encontrado"});
	}
	var task = Fawn.Task();
	task.update('User',{_id: FollowerId}, 
	{ 
		$push : {
			followers: { 
				$each : [{
					follower: FollowingId,
					followerDate: new Date
				}]
			}
		}
	})
	task.update('User',{_id: FollowingId},
	{
		$push : {
			following : {
				$each : [{
					following : FollowerId,
					followingDate : new Date
				}]
			}
		}
		
	})
	.run()
	.then(function(result){
			var firt = result[0];
			var second = result[1];
			res.status(200).json({msg: "Operacao finalizada"});
	})
	.catch(function(err){
		res.status(400).json({msg: "Falha na operacao", err: err});
		console.log(err);
	});
}	

module.exports = UserCtrl;