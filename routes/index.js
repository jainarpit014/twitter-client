var express = require('express');
var router = express.Router();

var async = require("async");
var Twitter = require("twitter");




var client = new Twitter({
	consumer_key: 'YOUR CONSUMER KEY',
	consumer_secret: 'YOUR CONSUMER SECRET KEY',
	access_token_key: 'YOUR ACCESS TOKEN KEY',
	access_token_secret: 'YOUR ACCESS TOKEN SECRET'
});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/*Search for anything*/
router.get('/search',function(req,res){
	client.get('/search/tweets', {q: 'Mumbai'},  function(err, payload){
  		res.send(payload);
	});
});
/*Get user timeline*/
router.get('/user_timeline',function(req,res){
	var data = [];

	client.get('/statuses/user_timeline',{screen_name:req.query.q},function(err,payload){
  		
  		async.forEach(payload,function(tweet,callback){

			data.push({text:tweet['text'],name:tweet['user']['name'],screen_name:tweet['user']['screen_name'],profile_image:tweet['user']['profile_image_url']});callback();
  		},
  		function(err){
  			res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  			res.header('Expires', '-1');
  			res.header('Pragma', 'no-cache');
  			res.send(data);
  		});
	});
});
/*Get user homeline*/
router.get('/user_home_timeline',function(req,res){
	var data = [];
	console.log(req.body.q);
	client.get('/statuses/home_timeline',{screen_name:req.query.q},function(err,payload){
  		
  		async.forEach(payload,function(tweet,callback){
			data.push({text:tweet['text'],name:tweet['user']['name'],screen_name:tweet['user']['screen_name'],profile_image:tweet['user']['profile_image_url']});callback();
  		},
  		function(err){
  			res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  			res.header('Expires', '-1');
  			res.header('Pragma', 'no-cache');
  			res.send(data);
  		});
	});
});
/*Get trends in india*/
router.get('/trends',function(req,res){
	client.get('/trends/place',{id:'23424848'},function(err,payload){
		
  		res.send(payload[0]['trends']);
	});
});
/*Get user favorited tweets*/
router.get('/favorites',function(req,res){
	console.log(req.body.q);
	client.get('/favorites/list',{screen_name:req.query.q},function(err,payload){
		var data = [];
			async.forEach(payload,function(tweet,callback){
			data.push({text:tweet['text'],name:tweet['user']['name'],screen_name:tweet['user']['screen_name'],profile_image:tweet['user']['profile_image_url']});callback();
  			},
			function(err){
				res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  				res.header('Expires', '-1');
  				res.header('Pragma', 'no-cache');
				res.send(data);
			});
	});
});
/*Get user followers*/
router.get('/followers',function(req,res){
	console.log(req.body.q);
	client.get('/followers/list',{screen_name:req.query.q},function(err,payload){
		var data = [];
			async.forEach(payload['users'],function(follower,callback){
				data.push({name:follower['name'],screen_name:follower['screen_name'],profile_image:follower['profile_image_url']});callback();
			},
			function(err){
				res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  				res.header('Expires', '-1');
  				res.header('Pragma', 'no-cache');
				res.send(data);
			});
	});
});
/*List of users which specified user is following*/
router.get('/friends',function(req,res){
	console.log(req.body.q);
	client.get('/friends/list',{screen_name:req.query.q},function(err,payload){
		
		var data = [];
			async.forEach(payload['users'],function(friend,callback){
				data.push({name:friend['name'],screen_name:friend['screen_name'],profile_image:friend['profile_image_url']});callback();
			},
			function(err){
				res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  				res.header('Expires', '-1');
  				res.header('Pragma', 'no-cache');
				res.send(data);
			});
	});
});

module.exports = router;
