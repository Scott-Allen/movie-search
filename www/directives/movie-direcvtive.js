angular.module('movieDirective', [])
    .directive('movieInfo', function(){
        return {
            restrict: 'A',
            templateUrl: 'directives/movie-directive.html',
            controller: function($scope, getMovieAPI){
                $scope.movie = {};
                $scope.$watch(function() { return getMovieAPI.getMovieResults() }, function(newVal){
                    $scope.movie = newVal;
                })
            }
        }
    });