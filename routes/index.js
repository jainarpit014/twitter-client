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
  		console.log(err);
  		res.send(payload);
	});
});
/*Get user timeline*/
router.get('/user_timeline',function(req,res){
	var data = [];

	client.get('/statuses/user_timeline',{user_id:'slywala'},function(err,payload){
		console.log(err);
  		
  		async.forEach(payload,function(tweet,callback){
			data.push({text:tweet['text'],name:tweet['user']['name'],screen_name:tweet['user']['screen_name'],profile_image:tweet['user']['profile_image_url']});callback();
  		},
  		function(err){
  			res.send(data);
  		});
	});
});
/*Get user homeline*/
router.get('/user_home_timeline',function(req,res){
	var data = [];

	client.get('/statuses/home_timeline',{user_id:'slywala'},function(err,payload){
		console.log(err);
  		
  		async.forEach(payload,function(tweet,callback){
			data.push({text:tweet['text'],name:tweet['user']['name'],screen_name:tweet['user']['screen_name'],profile_image:tweet['user']['profile_image_url']});callback();
  		},
  		function(err){
  			res.send(data);
  		});
	});
});
/*Get trends in india*/
router.get('/trends',function(req,res){
	client.get('/trends/place',{id:'23424848'},function(err,payload){
		console.log(err);
  		res.send(payload[0]['trends']);
	});
});
/*Get user favorited tweets*/
router.get('/favorites',function(req,res){
	client.get('/favorites/list',{user_id:'slywala'},function(err,payload){
		//console.log(err);
		//res.send(payload);
		var data = [];
		//res.send(payload['users']);
			async.forEach(payload,function(tweet,callback){
			data.push({text:tweet['text'],name:tweet['user']['name'],screen_name:tweet['user']['screen_name'],profile_image:tweet['user']['profile_image_url']});callback();
  			},
			function(err){
				res.send(data);
			});
	});
});
/*Get user followers*/
router.get('/followers',function(req,res){
	client.get('/followers/list',{user_id:'slywala'},function(err,payload){
		var data = [];
		//res.send(payload['users']);
			async.forEach(payload['users'],function(follower,callback){
				data.push({name:follower['name'],screen_name:follower['screen_name'],profile_image:follower['profile_image_url']});callback();
			},
			function(err){
				res.send(data);
			});
	});
});
/*List of users which specified user is following*/
router.get('/friends',function(req,res){
	client.get('/friends/list',{user_id:'slywala'},function(err,payload){
		//console.log(err);
		//res.send(payload['users']);
		var data = [];
		//res.send(payload['users']);
			async.forEach(payload['users'],function(friend,callback){
				data.push({name:friend['name'],screen_name:friend['screen_name'],profile_image:friend['profile_image_url']});callback();
			},
			function(err){
				res.send(data);
			});
	});
});

module.exports = router;
