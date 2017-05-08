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
router.post('/login', UserCtrl.post);
router.get('/followers', Auth.getToken , UserCtrl.getFollowers);


module.exports = router;
