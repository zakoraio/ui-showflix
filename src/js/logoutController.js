/**
 * Created by saurabh on 3/9/2016.
 */
(function() {
    'use strict';

    angular
        .module('showflix')
        .controller('logoutController', logoutController);

    function logoutController () {

       logout();

        function logout(){
            var items = ['debug','catalogs','currentPage','loginType','sessionToken','showToEdit','sortCriteria','sortReverse','userName'];
            for(var i=0;i<items.length;i++) {
                localStorage.removeItem(items[i]);
            }
        }

    }
})();