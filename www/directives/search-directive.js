angular.module('searchDirective', [])
    .directive("searchMovies", function(){
        return{
            restrict: 'A',
            templateUrl: "directives/search-directive.html",
            scope:{},
            controller: function($scope, $http){
                scope: {
                    movies: '='
                }
                $scope.movieSearch = {
                    title: "Movie Name:",
                    text: "Django"
                };

                var searchUrl = "http://www.omdbapi.com/?s=";

                $scope.filmResults = {};

                $scope.alert = {
                    show: false,
                    type: "warning",
                    msg: "No films found"
                };

                $scope.show = true;

                $scope.$watch('search.text',
                    function(newVal, oldVal) {
                        $http.get(searchUrl + newVal)
                            .then(function(results){
                                if (results.data.Search){
                                    console.log("Search Exists");
                                    $scope.filmResults = results.data.Search;
                                    $scope.alert.show = false;
                                } else {
                                    console.log("No Films Found");
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