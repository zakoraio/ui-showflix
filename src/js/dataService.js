/**
 * Created by saurabh on 3/8/2016.
 */
(function() {

    angular
        .module('showflix')
        .service('dataService', dataService);

    function dataService($http, $q, CONFIG) {
        var self = this;

        self.getUsers = getUsers;
        self.getUserByUserName = getUserByUserName;
        self.loginUser = loginUser;
        self.addUser = addUser;
        self.getCatalog = getCatalog;
        self.setRating = setRating;
        self.getComments = getComments;
        self.addComment = addComment;
        self.addShow = addShow;
        self.editShow = editShow;
        self.getAvgRating = getAvgRating;

        function loginUser(user){
            var req = {
                method: 'POST',
                url: CONFIG.API_END_POINT+'login/',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: user
            }
            console.log(user);
            return $http(req)
                .then(successFn ,errorFn);
        }

        function addUser(user){
            var req = {
                method: 'POST',
                url: CONFIG.API_END_POINT+'login/create/',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: user
            }
            console.log(user);
            return $http(req)
                .then(successFn ,errorFn);
        }

        function getUsers() {
            return $http.post(CONFIG.API_END_POINT + '/users')
                .then(successFn, errorFn);
        }

        function getUserByUserName(userName) {
            return $http.get(CONFIG.API_END_POINT + '/users/' + userName)
                .then(successFn, errorFn);
        }

        function getComments(imdbId){
            var req = {
                method: 'GET',
                url: CONFIG.API_END_POINT+'shows/comments/'+imdbId,
                headers: {
                    'Content-Type': 'application/json',
                    'Authentication-Token': 'Bearer '+localStorage.getItem('sessionToken')
                },
            }
            console.log(imdbId);
            return $http(req)
                .then(successFn ,errorFn);
        }

        function addComment(comment){
            var req = {
                method: 'POST',
                url: CONFIG.API_END_POINT+'shows/comments/',
                headers: {
                    'Content-Type': 'application/json',
                    'Authentication-Token': 'Bearer '+localStorage.getItem('sessionToken')
                },
                data : comment
            }
            console.log(comment);
            return $http(req)
                .then(successFn ,errorFn);
        }

        function setRating(rating){
            console.log(rating);
            var req = {
                method: 'POST',
                url: CONFIG.API_END_POINT+'rating/',
                headers: {
                    'Content-Type': 'application/json',
                    'Authentication-Token': 'Bearer '+localStorage.getItem('sessionToken')
                },
                data: rating
            }

            return $http(req)
                .then(successFn ,errorFn);
        }

        function getAvgRating(imdbId){
            var req = {
                method: 'GET',
                url: CONFIG.API_END_POINT+'rating/'+imdbId,
                headers: {
                    'Content-Type': 'application/json',
                    'Authentication-Token': 'Bearer '+localStorage.getItem('sessionToken')
                },
            }
            return $http(req)
                .then(successFn ,errorFn);
        }

        function addShow(showDetails){
            console.log(showDetails);
            var req = {
                method: 'POST',
                url: CONFIG.API_END_POINT+'shows/',
                headers: {
                    'Content-Type': 'application/json',
                    'Authentication-Token': 'Bearer '+localStorage.getItem('sessionToken')
                },
                data: showDetails
            }

            return $http(req)
                .then(successFn ,errorFn);
        }
        function editShow(showDetails){
            console.log(showDetails);
            var req = {
                method: 'PUT',
                url: CONFIG.API_END_POINT+'shows/'+showDetails.imdbID,
                headers: {
                    'Content-Type': 'application/json',
                    'Authentication-Token': 'Bearer '+localStorage.getItem('sessionToken')
                },
                data: showDetails
            }

            return $http(req)
                .then(successFn ,errorFn);
        }

        function getCatalog(){
            var req = {
                method: 'GET',
                url: CONFIG.API_END_POINT+'shows/',
                headers: {
                    'Content-Type': 'application/json',
                    'Authentication-Token': 'Bearer '+localStorage.getItem('sessionToken')
                },
            }
            return $http(req)
                .then(successFn, errorFn);
        }

        function successFn (response) {
            return response.data;
        }

        function errorFn (response) {
            return $q.reject(response.status);
        }
    }
})();