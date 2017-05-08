var User = require('../models/UserModel');

var AuthCtrl = {};

AuthCtrl.getToken = function(req, res, next){

	var header = req.headers['authorization'];
	
	if(typeof header != undefined){	
		User.findOne({token: header})
			.exec(function(error, data){
				if(!error && data){
					req.token = header;
					next();
				}else{
					res.sendStatus(403);
				}
			});
	}
}

module.exports = AuthCtrl;