(function() {
	var app = angular.module('app', ['ui.router', 'navController', 'searchDirective', 'listMoviesDirective', 'movieDirective', 'searchService', 'movieService', 'ngAnimate', 'ui.bootstrap']);

	// define for requirejs loaded modules
	define('app', [], function() { return app; });

	// function for dynamic load with requirejs of a javascript module for use with a view
	// in the state definition call add property `resolve: req('/views/ui.js')`
	// or `resolve: req(['/views/ui.js'])`
	// or `resolve: req('views/ui')`
	function req(deps) {
		if (typeof deps === 'string') deps = [deps];
		return {
			deps: function ($q, $rootScope) {
				var deferred = $q.defer();
				require(deps, function() {
					$rootScope.$apply(function () {
						deferred.resolve();
					});
					deferred.resolve();
				});
				return deferred.promise;
			}
		}
	}

	app.config(function($stateProvider, $urlRouterProvider, $controllerProvider){
		var origController = app.controller;
		app.controller = function (name, constructor){
			$controllerProvider.register(name, constructor);
			return origController.apply(this, arguments);
		};

		var viewsPrefix = 'views/';

		// For any unmatched url, send to /
		$urlRouterProvider.otherwise("/");

		$stateProvider
			// you can set this to no template if you just want to use the html in the page
			.state('home', {
				url: "/",
				templateUrl: viewsPrefix + "home.html",
				data: {
					pageTitle: 'Home'
				}
			})
            .state('movie', {
                url: "/movie/{movieTitle}",
                templateUrl: viewsPrefix + "movie.html",
                data: {
                    pageTitle: 'Movie'
                },
				controller: function($scope, $stateParams, getMovieAPI){
                	console.log("route params");
                	$scope.movieTitle = $stateParams.movieTitle;
                	$scope.movie = {Year: 2000};
                    getMovieAPI.getMovie($scope.movieTitle)
						.then(function(movie){
							console.log("--movie--");
							$scope.movie = movie;
							console.log($scope.movie);
						}, function(err){
							console.log(err);
						})
				}
            })
	})
	.directive('updateTitle', ['$rootScope', '$timeout',
		function($rootScope, $timeout) {
			return {
				link: function(scope, element) {
					var listener = function(event, toState) {
						console.log("toState");
						console.log(toState);
						var title = 'Movie Search';
						if (toState.data && toState.data.pageTitle) title = toState.data.pageTitle + ' - ' + title;
						$timeout(function() {
							element.text(title);
						}, 0, false);
					};

					$rootScope.$on('$stateChangeSuccess', listener);
				}
			};
		}
	]);
}());