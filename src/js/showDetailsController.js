/**
 * Created by saurabh on 3/12/2016.
 */
/**
 * Created by saurabh on 3/9/2016.
 */
(function () {
    'use strict';

    angular
        .module('showflix')
        .controller('showDetailsController', showDetailsController);

    function showDetailsController($routeParams, dataService,$window) {
        var showDetailsVm = this;

        showDetailsVm.setRating = setRating;
        showDetailsVm.addComment = addComment;
        showDetailsVm.editDetails = editDetails;
        showDetailsVm.comments = [];




        getDetails();
        getAverageRating();

        function getDetails() {
            var catalogs = JSON.parse(localStorage.getItem('catalogs'));
            console.log('imdbId ' + $routeParams.imdbID);
            populateShowDetails(getShowByImdbId($routeParams.imdbID, catalogs));

            dataService.getComments($routeParams.imdbID)
                .then(function (data) {
                    showDetailsVm.comments = data;
                }, function (error) {
                    localStorage.removeItem('sessionToken');
                    $window.location.href = "#/"
                    console.log(error);
                });

        }

        function addComment() {
            var comment = {
                "comment": showDetailsVm.userComment,
                "imdbId": $routeParams.imdbID,
                "userName": localStorage.getItem('userName')
            }
            dataService.addComment(comment)
                .then(function (data) {
                    showDetailsVm.message = data;
                    var newComment={
                        "comment":comment,
                        "rating" : showDetailsVm.showflixRating
                    }

                    showDetailsVm.comments.unshift(newComment);
                }, function (error) {
                    localStorage.removeItem('sessionToken');
                    $window.location.href = "#/"
                    console.log(error);
                });


        }


        function setRating() {
            var rating = {
                "rating": showDetailsVm.userRating,
                "userName": localStorage.getItem("userName"),
                "imdbId": showDetailsVm.imdbID
            }
            dataService.setRating(JSON.stringify(rating))
                .then(function (data) {
                }, function (error) {
                    console.log(error);
                });

        }

        function getAverageRating(){
            dataService.getAvgRating($routeParams.imdbID)
                .then(function (data) {
                    showDetailsVm.avgRating = data.rating;
                }, function (error) {
                    console.log(error);
                });
        }

        function getShowByImdbId(imdbId, catalogs) {
            for (var i = 0; i < catalogs.length; i++) {
                console.log(catalogs[i].imdbID);
                if (catalogs[i].imdbID == imdbId) {
                    return catalogs[i];
                }
            }
        }


        function editDetails(){
            localStorage.setItem('showToEdit',JSON.stringify(showDetailsVm));
            $window.location.href="#/catalog/add";

        }


        function populateShowDetails(show) {

            showDetailsVm.title = show.title;
            showDetailsVm.year = show.year;
            showDetailsVm.rated = show.rated;
            showDetailsVm.released = show.released;
            showDetailsVm.runtime = show.runtime;
            showDetailsVm.writer = show.writer;
            showDetailsVm.genre = show.genre;
            showDetailsVm.director = show.director;
            showDetailsVm.actors = show.actors;
            showDetailsVm.plot = show.plot;
            showDetailsVm.language = show.language;
            showDetailsVm.country = show.country;
            showDetailsVm.awards = show.awards;
            showDetailsVm.poster = show.poster;
            showDetailsVm.metascore = show.metascore;
            showDetailsVm.imdbRating = show.imdbRating;
            showDetailsVm.imdbVotes = show.imdbVotes;
            showDetailsVm.imdbID = show.imdbID;
            showDetailsVm.type = show.type;
            showDetailsVm.showflixRating = show.showflixRating;
            showDetailsVm.poster = show.poster;


        }

        function isLoginTypeAdmin(){
            return catalogVm.loginType=="admin";
        }

    }
})();