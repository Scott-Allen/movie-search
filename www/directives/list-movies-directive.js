angular.module('listMoviesDirective', [])
    .directive('listMovies', function(){
        return {
            restrict: 'A',
            templateUrl: 'directives/list-movies-directive.html',
            controller: function($scope, searchMoviesAPI){
                $scope.movies = [];
                $scope.$watch(function() { return searchMoviesAPI.getSearchResults() }, function(newVal){
                    $scope.movies = newVal;
                })
            }
        }
    });