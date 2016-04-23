/**
 * Created by saurabh on 3/9/2016.
 */
(function () {
    'use strict';

    angular
        .module('showflix')
        .controller('userController', userController);

    function userController(dataService,$window) {
        var userVm = this;

        userVm.addUser = addUser;

        function addUser() {
            var tmpUser = userVm.newUser;
            tmpUser.password = userVm.newUser.userPassword;
            console.log(tmpUser);
            dataService.addUser(tmpUser)
                .then(function (data) {
                    userVm.users = data;
                    $window.location.href="#/"
                }, function (error) {
                    console.log(error);
                })
        }


    }
})();