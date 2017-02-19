angular.module('searchDirective', [])
    .directive("searchMovies", function(){
        return{
            restrict: 'A',
            templateUrl: "directives/search-directive.html",
            scope:{},
            controller: function($scope, $http, searchMoviesAPI){
                scope: {
                    movies: '='
                }
                $scope.movieSearch = {
                    title: "Movie Name:",
                    text: "Django"
                };

                $scope.filmResults = {};

                $scope.alert = {
                    show: false,
                    type: "warning",
                    msg: "No films found"
                };

                $scope.show = true;

                $scope.$watch('search.text',
                    function(newVal) {
                        searchMoviesAPI.makeSearch(newVal)
                            .then(function(results){
                                if (results.length > 0){
                                    $scope.filmResults = results;
                                    $scope.alert.show = false;
                                } else {
                                    $scope.alert.type = "warning";
                                    $scope.alert.msg = "No Films Found";
                                    $scope.alert.show = true;
                                    $scope.show = true;
                                }
                            }, function(err){
                                $scope.alert.type = "danger";
                                $scope.alert.msg = "Endpoint not responsing: unavailable";
                                $scope.alert.show = true;
                                $scope.show = true;
                            })
                    });
            }
        }
    });