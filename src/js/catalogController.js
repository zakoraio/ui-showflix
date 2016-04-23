/**
 * Created by saurabh on 3/9/2016.
 */
(function () {
    'use strict';

    angular
        .module('showflix')
        .controller('catalogController', catalogController);

    function catalogController(dataService, $window, $route, $rootScope) {
        var catalogVm = this;

        catalogVm.getCatalog = getCatalog;
        catalogVm.setCurrentPage = setCurrentPage;
        catalogVm.saveSortCriteria = saveSortCriteria;
        catalogVm.addShowPage = addShowPage;
        catalogVm.isLoginTypeAdmin = isLoginTypeAdmin;


        if(localStorage.getItem('sortCriteria')!=null && localStorage.getItem('sortCriteria')!=undefined){
            catalogVm.sortCriteria = localStorage.getItem('sortCriteria');
            catalogVm.sortDirection = localStorage.getItem('sortDirection');
        }
        else {
            catalogVm.sortCriteria = "title";
            catalogVm.sortDirection = false;
        }

        console.log('criteria ' + catalogVm.sortCriteria);
        console.log('reverse ' + catalogVm.sortDirection);
        catalogVm.searchText = '';
        catalogVm.loginType = localStorage.getItem('loginType');


        getCatalog();

        function getCatalog() {

            dataService.getCatalog()
                .then(function (data) {
                    catalogVm.catalogs = data;
                    catalogVm.items = data.length;
                    if (getCurrentPageFromStorage() != undefined && getCurrentPageFromStorage() != null) {
                        catalogVm.currentPage = getCurrentPageFromStorage();
                    }
                    else {
                        catalogVm.currentPage = 1;
                    }
                    localStorage.setItem("catalogs", JSON.stringify(catalogVm.catalogs));
                }, function (error) {
                    localStorage.removeItem('sessionToken');
                    $window.location.href = "#/"
                    console.log(error);
                })
        }


        function saveSortCriteria(sortName) {






            console.log('criteria1 ' + catalogVm.sortCriteria);
            console.log('reverse1 ' + catalogVm.sortDirection);

            catalogVm.sortCriteria = sortName;
            catalogVm.sortDirection = !catalogVm.sortDirection;

            localStorage.setItem('sortCriteria', sortName);
            localStorage.setItem('sortDirection', !catalogVm.sortDirection);

        }

        function addShowPage(){
            $window.location.href='/#/catalog/add';
        }

        function isLoginTypeAdmin(){
            return catalogVm.loginType=="admin";
        }

        function setCurrentPage(currentPage) {
            localStorage.setItem('currentPage', currentPage);
        }

        function setSearchCriteria(criteria) {
            localStorage.setItem('searchCriteria', criteria);
        }

        function getCurrentPageFromStorage() {
            return localStorage.getItem('currentPage');
        }

    }
})();