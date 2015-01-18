(function(){
    var home = angular.module('home',[]);

    /*app.service('GetData',['$http',function($http){




    }]);*/

    home.controller('TimelineController',["$http",function($http){

    	var d = this;
    	d.tweets = [];


		$http.get('/user_timeline').
			success(function(data,status,headers,config){
				d.tweets = data;
			}).
			error(function(data,status,headers,config){

			});
    }]);
    home.controller('HomelineController',["$http",function($http){

    	var d = this;
    	d.tweets = [];


		$http.get('/user_home_timeline').
			success(function(data,status,headers,config){
				d.tweets = data;
			}).
			error(function(data,status,headers,config){

			});
    }]);
    home.controller('FavoritesController',["$http",function($http){

    	var d = this;
    	d.tweets = [];


		$http.get('/favorites').
			success(function(data,status,headers,config){
				d.tweets = data;
			}).
			error(function(data,status,headers,config){

			});
    }]);
    home.controller('FollowersController',["$http",function($http){

    	var d = this;
    	d.followers = [];


		$http.get('/followers').
			success(function(data,status,headers,config){
				d.followers = data;
			}).
			error(function(data,status,headers,config){

			});
    }]);
    home.controller('TrendsController',["$http",function($http){

    	var d = this;
    	d.trends = [];


		$http.get('/trends').
			success(function(data,status,headers,config){
				d.trends = data;
			}).
			error(function(data,status,headers,config){

			});
    }]);
    home.controller('FriendsController',["$http",function($http){

    	var d = this;
    	d.friends = [];


		$http.get('/friends').
			success(function(data,status,headers,config){
				d.friends = data;
			}).
			error(function(data,status,headers,config){

			});
    }]);
})();