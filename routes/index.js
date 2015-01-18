var express = require('express');
var router = express.Router();

var async = require("async");
var Twitter = require("twitter");




var client = new Twitter({
	consumer_key: 'yo8cc7EZ4ce0xMNvm4h8HJGKF',
	consumer_secret: 'qPopQcprNfpzJx6vMIVbBkNadjp10h65NGiVAftx0HxSnVuxDu',
	access_token_key: '86736865-MrC9qKKY8ZhjvzXZi3hpkmRUGIOwC9xBakSz3ib3U',
	access_token_secret: 'I0wmGZy2xd8kpya50cd9wqrhY6XIHMWhfYjb73zuNChCP'
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
router.post('/user_timeline',function(req,res){
	var data = [];
	console.log(req.body.q);
	client.get('/statuses/user_timeline',{user_id:req.body.q},function(err,payload){
  		
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
router.post('/user_home_timeline',function(req,res){
	var data = [];
	console.log(req.body.q);
	client.get('/statuses/home_timeline',{user_id:req.body.q},function(err,payload){
  		
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
router.post('/favorites',function(req,res){
	console.log(req.body.q);
	client.get('/favorites/list',{user_id:req.body.q},function(err,payload){
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
router.post('/followers',function(req,res){
	console.log(req.body.q);
	client.get('/followers/list',{user_id:req.body.q},function(err,payload){
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
router.post('/friends',function(req,res){
	console.log(req.body.q);
	client.get('/friends/list',{user_id:req.body.q},function(err,payload){
		
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
