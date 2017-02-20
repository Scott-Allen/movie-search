angular.module('movieService', [])
    .service("getMovieAPI", function($http){

        var movieUrl = "http://www.omdbapi.com/?t=";

        var movieResults = {};

        this.getMovieResults = function(){ return movieResults };

        this.getMovie = function(text){
            return new Promise(function(resolve, reject){
                $http.get(movieUrl + text)
                    .then(function(results){
                        if (!results.data.Error){
                            movieResults = results.data;
                            resolve(movieResults);
                        } else {
                            movieResults = {};
                            reject({error: "Not Found"});
                        }
                    }, function(error){
                        movieResults = [];
                        reject({error: "No Endpoint"});
                    });
            });
        };
    });