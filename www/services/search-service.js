angular.module('searchService', [])
    .service("searchMoviesAPI", function($http){

        var searchUrl = "http://www.omdbapi.com/?s=";

        var searchResults = [];

        this.getSearchResults = function(){ return searchResults };

        this.makeSearch = function(text){
            return new Promise(function(resolve, reject){
                if (!text){
                    text = "Django Unchained"
                }

                $http.get(searchUrl + text)
                    .then(function(results){
                        if (results.data.Search){
                            searchResults = results.data.Search;
                            resolve(searchResults);
                        } else {
                            searchResults = [];
                            resolve(searchResults);
                        }
                    }, function(error){
                        searchResults = [];
                        reject({error: "No Endpoint"});
                    });
            });
        };
    });