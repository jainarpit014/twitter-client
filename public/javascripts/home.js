(function(){
    var home = angular.module('home',[]);

	home.controller('SearchController',["$http","$rootScope",function($http,$rootScope){
		var q = this;
		q.query = "";
		q.search = function(){
			$rootScope.$broadcast('LoadUserData',q.query);		
		}
	}]);

    home.controller('TimelineController',["$http","$scope",function($http,$scope){

    	var d = this;
    	d.tweets = [];
    	d.query = "";
    	d.loader = false;
    	d.err = false;

		$scope.$on('LoadUserData',function(event,args){
			d.loader = true;			
			d.query = args;
			$http.get('/user_timeline?q='+d.query).
			success(function(data,status,headers,config){
				d.tweets = data;
				d.loader = false;
				d.err = false;
				if(data.length==0)
				{
					d.err = true;
				}
			}).
			error(function(data,status,headers,config){

			});
		});
		
    }]);
    home.controller('FavoritesController',["$http","$scope",function($http,$scope){

    	var d = this;
    	d.tweets = [];
    	d.loader = false;


		$scope.$on('LoadUserData',function(event,args){
			d.loader = true;
			d.query = args;
			$http.get('/favorites?q='+d.query).
			success(function(data,status,headers,config){
				d.tweets = data;
				d.loader = false;
			}).
			error(function(data,status,headers,config){

			});
		});
    }]);
    home.controller('FollowersController',["$http","$scope",function($http,$scope){

    	var d = this;
    	d.followers = [];
		d.loader = false;

		$scope.$on('LoadUserData',function(event,args){
			d.loader = true;
			d.query = args;
			$http.get('/followers?q='+d.query).
			success(function(data,status,headers,config){
				d.followers = data;
				d.loader = false;
			}).
			error(function(data,status,headers,config){

			});
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
    home.controller('FriendsController',["$http","$scope",function($http,$scope){

    	var d = this;
    	d.friends = [];
    	d.loader = false;
		$scope.$on('LoadUserData',function(event,args){
			d.loader = true;
			d.query = args;
			$http.get('/friends?q='+d.query).
			success(function(data,status,headers,config){
				d.friends = data;
				d.loader = false;
			}).
			error(function(data,status,headers,config){

			});
		});
    }]);
})();