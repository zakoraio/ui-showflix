/**
 * Created by saurabh on 3/9/2016.
 */
(function () {
    'use strict';

    angular
        .module('showflix')
        .controller('addShowDetailsController', addShowDetailsController);

    function addShowDetailsController(dataService, $window) {
        var addShowVm = this;

        addShowVm.addShow = addShow;
        addShowVm.editShow = editShow;
        addShowVm.isLoadTypeEdit = isLoadTypeEdit;


        addShowVm.newShow = {};

        initializeForm();

        function initializeForm() {
            if (localStorage.getItem('showToEdit') != undefined && localStorage.getItem('showToEdit') != null) {
                console.log(JSON.parse(localStorage.getItem('showToEdit')));
                populateShowDetails(JSON.parse(localStorage.getItem('showToEdit')));
            }
        }


        function editShow() {
            dataService.editShow(addShowVm.newShow)
                .then(function (data) {
                    addShowVm.message = data;
                }, function (error) {
                    addShowVm.message = error;
                    localStorage.removeItem('sessionToken');
                    $window.location.href = "#/"
                });
        }


        function addShow() {

            dataService.addShow(addShowVm.newShow)
                .then(function (data) {
                    addShowVm.message = data;
                }, function (error) {
                    addShowVm.message = error;
                    localStorage.removeItem('sessionToken');
                    $window.location.href = "#/"
                });
        }

        function isLoadTypeEdit() {
            if (localStorage.getItem('showToEdit') != undefined && localStorage.getItem('showToEdit') != null) {
                return true;
            }
            return false;
        }


        function populateShowDetails(show) {

            addShowVm.newShow.title = show.title;
            addShowVm.newShow.year = show.year;
            addShowVm.newShow.rated = show.rated;
            addShowVm.newShow.released = show.released;
            addShowVm.newShow.runtime = show.runtime;
            addShowVm.newShow.writer = show.writer;
            addShowVm.newShow.genre = show.genre;
            addShowVm.newShow.director = show.director;
            addShowVm.newShow.actors = show.actors;
            addShowVm.newShow.plot = show.plot;
            addShowVm.newShow.language = show.language;
            addShowVm.newShow.country = show.country;
            addShowVm.newShow.awards = show.awards;
            addShowVm.newShow.poster = show.poster;
            addShowVm.newShow.metascore = show.metascore;
            addShowVm.newShow.imdbRating = show.imdbRating;
            addShowVm.newShow.imdbVotes = show.imdbVotes;
            addShowVm.newShow.imdbID = show.imdbID;
            addShowVm.newShow.type = show.type;
            addShowVm.newShow.showflixRating = show.showflixRating;
            addShowVm.newShow.poster = show.poster;


        }


    }
})();