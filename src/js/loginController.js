/**
 * Created by saurabh on 3/9/2016.
 */
(function() {
    'use strict';

    angular
        .module('showflix')
        .controller('loginController', loginController);

    function loginController (dataService,$timeout,$window) {
        var loginVm = this;
        loginVm.login = login;

        redirect();

        function redirect() {
            if ($window.location.href!="#/catalog" && localStorage.getItem('sessionToken') != null && localStorage.getItem('sessionToken') != undefined ) {
                $window.location.href = "#/catalog";
            }
        }


        function login(isValid,loginType) {
            var tmpUser = loginVm.user;
            tmpUser.password = loginVm.user.userPassword;
            tmpUser.role=loginType;
            console.log(loginVm.user)
            dataService.loginUser(tmpUser)
                .then(function(data){
                    loginVm.sessionToken = data;
                    console.log(loginVm.sessionToken);
                    addToken("sessionToken",loginVm.sessionToken.authorizationToken)
                    $timeout(removeSessionToken,600000);
                    $window.location.href = "#/catalog";
                    setLoginType(loginType);
                    setUser();
                }, function (error){
                    console.log(error);
                })
        }



        function setUser(){
            localStorage.setItem('userName',loginVm.user.userName);
        }
        function setLoginType(loginType){
           localStorage.setItem('loginType',loginType);
        }

        function getLoginType(loginType){
            localStorage.getItem('loginType');
        }
        function addToken(key, val){
            localStorage.setItem(key,val);
        }

        function getToken(key){
            return localStorage.getItem(key);
        }

        function removeToken(key){
            localStorage.removeItem(key);
        }

        function removeSessionToken(){
            removeToken('sessionToken');
        }


    }
})();