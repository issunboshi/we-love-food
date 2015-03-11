(function() {
	var app = angular.module('homeApp', ['restaurant-directives']);

	/**
	* Generic controller for the store
	* @param  {Array} The store product data
	*/
	app.controller('SiteController', ['$http', function($http){
		var store = this;
		store.products = [];

		$http.get('./data/restaurants.json').success(function(data){
			store.products = data;
		});
	}]);

})();