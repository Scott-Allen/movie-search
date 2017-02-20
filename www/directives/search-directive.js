angular.module('searchDirective', [])
    .directive('searchMovies', function(){
        return{
            restrict: 'A',
            templateUrl: 'directives/search-directive.html',
            controller: function($scope, searchMoviesAPI){
                $scope.movieSearch = {
                    title: "Movie Name:",
                    text: ""
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
                                    $scope.alert.show = false;

                                    // Removed as does not reload fast enough, makes for confusing UX
                                    /*$scope.alert.type = "warning";
                                    $scope.alert.msg = "No Films Found";
                                    $scope.alert.show = true;*/
                                }
                            }, function(err){
                                $scope.alert.type = "danger";
                                $scope.alert.msg = "Endpoint not responsing: unavailable";
                                $scope.alert.show = true;
                            })
                    });
            }
        }
    });