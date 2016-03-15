/**
 * Created by saurabh on 3/9/2016.
 */

(function() {
    'use strict';

    angular
        .module('showflix')
        .controller('UserDetailController', UserDetailController);

    function UserDetailController ($routeParams, dataService) {
        var userDetailVm = this;

        init();

        function init() {
            console.log($routeParams);
            dataService.getUserByUserName($routeParams.userName)
                .then(function(data){
                    userDetailVm.user = data;
                }, function (error){
                    console.log(error);
                });
        }
    }
})();