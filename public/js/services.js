'use strict';

/* Services */

var module = angular.module('CategoriasMLMServices', ['ngResource']);

module.factory('Categories', function($resource){
    var url = apiBaseUrl+"/sites/MLM/";
    return $resource(url, {},{
        get:{method:"GET", params:{}}
    });
});

module.factory('Category', function($resource){
    var url = apiBaseUrl+'/categories/:categoryId';
    return $resource(url, {},{
        get:{method:"GET", params:{}}
    });
});

module.factory('Attributes', function($resource){
    var url = apiBaseUrl+'/categories/:categoryId/attributes';
    return $resource(url, {},{
        get:{method:"GET", params:{},isArray:true}
    });
});

module.factory('Broadcast', function ($rootScope) {
    var broadcastService = {
        broadcast:function (event) {
            $rootScope.$broadcast.apply($rootScope, arguments);
        }};
    return broadcastService;
});
