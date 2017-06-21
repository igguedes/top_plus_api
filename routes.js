var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	router = express.Router(),
	Auth = require('./controllers/AuthCtrl'),
	UserCtrl = require('./controllers/UserCtrl');


//Todas as Rotas serão definidas nesse arquivo, separar por seções [Users, Comments, etc.]

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.use(function (req, res, next) {
  next();
});

//Users
router.post('/user', UserCtrl.post);
router.get('/followers', Auth.getToken , UserCtrl.getFollowers);
// router.put('/follow', UserCtrl.followUser);
router.put('/follow/follower/:followerId/following/:followingId', UserCtrl.followUser);


module.exports = router;
