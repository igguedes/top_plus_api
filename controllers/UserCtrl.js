var User = require('../models/UserModel');
var UserCtrl = {};

function generateToken(){
	return "ABC";
}

UserCtrl.post = function(req, res){

	var newUser = new User();
	newUser.celNumber = "8899276-4082";
	newUser.userName = "Livia";
	newUser.active = true;
	newUser.token = "HAGSUW";
	newUser.status = "Teste";
	newUser.adrees.city = "Crato";
	newUser.adrees.state = "CE";
	newUser.adrees.country = "Brasil";

	newUser.save(function(err, login){
		if(!err){
			res.send("Sucesso");
		}else{
			res.sendStatus(500);
		}

	});
}

UserCtrl.getFollowers = function(req, res){

	User.find({_id: "590f903bdbccdf7f05c77685"}, {followers: true, _id: false})
		.populate('followers.follower', '-token -followers -following')
		.exec(function(error, result){
			if(!error){
				res.json(result);
			}
		});

}

module.exports = UserCtrl;