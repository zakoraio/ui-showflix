/**
 * Created by saurabh on 3/14/2016.
 */

(function () {
    'use strict';

    angular
        .module('showflix').filter('orderByTitle', function () {
        function myValueFunction(item) {
            return item.title;
        }

        return function (obj) {
            var array = [];
            Object.keys(obj).forEach(function (key) {
                // inject key into each object so we can refer to it from the template
                obj[key].name = key;
                array.push(obj[key]);
            });
            // apply a custom sorting function
            array.sort(function (a, b) {
                if(myValueFunction(a) < myValueFunction(b)){
                    return -1;
                }
                return 1;
            });
            return array;
        };
    });
})();
