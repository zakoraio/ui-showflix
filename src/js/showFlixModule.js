/**
 * Created by saurabh on 3/9/2016.
 */

(function () {
    'use strict';

    angular
        .module('showflix', ['ngRoute', 'ui.bootstrap','ngMessages'])
        .config(moduleConfig);

    moduleConfig.$inject = ['$routeProvider'];

    function moduleConfig($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/tmpl/loginForm.tmpl.html',
                controller: 'loginController',
                controllerAs: 'loginVm'
            })
            .when('/addUser', {
                templateUrl: '/tmpl/createUser.tmpl.html',
                controller: 'userController',
                controllerAs: 'userVm'
            })
            .when('/catalog', {
                templateUrl: '/tmpl/catalog.tmpl.html',
                controller: 'catalogController',
                controllerAs: 'catalogVm'
            })
            .when('/users/:userName', {
                templateUrl: '/tmpl/user-detail.tmpl.html',
                controller: 'UserDetailController',
                controllerAs: 'userDetailVm'
            })
            .when('/showDetail/:imdbID', {
                templateUrl: '/tmpl/show-details.tmpl.html',
                controller: 'showDetailsController',
                controllerAs: 'showDetailsVm'
            })
            .when('/catalog/add', {
                templateUrl: '/tmpl/addNewShow.tmpl.html',
                controller: 'addShowDetailsController',
                controllerAs: 'addShowVm'
            })
            .when('/logout', {
                templateUrl: '/tmpl/logout.tmpl.html',
                controller: 'logoutController',
                controllerAs: 'logoutVm'
            })
            .otherwise({
                redirectTo: '/'
            });
    }




})();

