
// https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4
// TODO maybe brew uninstal mongodb

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Bear = require('./server-app/models/bear');

// APP SETUP
// configure app to use bodyParser()
// this will let us get the data from a POST
var app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

var port = process.env.PORT || 8080;

// MONGOOSE DB
// mongoose.connect('mongodb://node:node@novus.modulusmongo.net:27017/Iganiq8o');
mongoose.connect('mongodb://localhost/voto'); // works w/ "voto/" and "voto/data"



// ROUTES FOR OUR API
// ======================================================
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	console.log('middleware logic goes here');
	next();
});

router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });
});

router.route('/bears')
.post(function(req, res) {
	// POST REQUEST
	var bear = new Bear();
	bear.name = req.body.name;

	console.log(bear);

	bear.save(function(err) {
		if (err) {
			res.send(err);
		}
		res.json({ message: 'Bear created yo!' });
		// setTimeout(function() {
		// 	res.json({ message: 'Bear created yo!' });
		// }, 3000);
	})
}).get(function(req, res) {
	// GET REQUEST
	Bear.find(function(err, bears) {
		if (err) {
			res.send(err);
		}
		res.json(bears);
	});
});

router.route('/bears/:bear_id')
.get(function(req, res) {
	Bear.findById(req.params.bear_id, function(err, bear) {
		if (err) {
			res.send(err);
		}
		res.json(bear);
	})
})
.post(function(req, res) {
	Bear.findById(req.params.bear_id, function(err, bear) {
		if (err) {
			res.send(err);
		}
		bear.name = req.body.name; // todo how do you handle setting properties? needs validation
		bear.save(function(err) {
			if (err) {
				res.send(err);
			}
			res.json({ message: `bear ${bear.name} updated` });
		});
	});
})
.delete(function(req, res) {
	var bearId = req.params.bear_id;
	console.log(bearId);
	Bear.remove({
		_id: bearId,
	}, function(err, bear) {
		if (err) {
			res.send(err);
		}
		res.json({ message: `Successfully deleted bear with id: ${bearId}` });
	});
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
