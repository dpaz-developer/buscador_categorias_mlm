'use strict'

/* Controllers */

function CategoriasMLMController ($scope,$timeout,$filter,Categories,Category,Attributes,Excel,Broadcast){
    $scope.nombre = 'David Paz';
    $scope.categories = [];
    $scope.categoriesPathRoot = [];
    $scope.listAllowed = false;
    $scope.listAllowedByCategory = false;
    $scope.isSearching = false;
    $scope.isSearchAttributes = false;
    $scope.listAttributes = [];
    $scope.categoriaEspejo = "";

    $scope.searchCategories = function(){
        console.log("buscando categorias");
        var params = {};
        $scope.listAllowed = false;
        $scope.categories = "buscando...";
        $scope.isSearching = true;
        Categories.get(params, function (data){
            $scope.categoriesPathRoot = [];
            $scope.categories = data.categories;
            $scope.attributeTypes = data.attribute_types;
        },function (error){
            $scope.categoriesPathRoot = [];
            $scope.categories = "No encontradas..";
        });
    };

    $scope.searchCategory = function(catId){
        var params = {categoryId:catId};
        $scope.categoriesPathRoot = [];
        $scope.isSearching = true;
        $scope.categoriaEspejo = "";
        Category.get(params,{}, function (data) {
            $scope.categories = data.children_categories;
            $scope.categoriesPathRoot = data.path_from_root;
            $scope.listAllowed = data.settings.listing_allowed;
            $scope.categoriaEspejo = data.settings.mirror_category;
            $scope.attributeTypes = data.attribute_types;
        },function (error){
           $scope.categories = "No encontradas..";
           $scope.categoriesPathRoot = [];
           $scope.listAllowed = false;

        });
    };

    $scope.searchListAllowedByCategory = function (catId){
        if(catId){
            console.log ("buscando si puedo publica en la categoria = "+catId);
             var params = {categoryId:catId};
             Category.get(params,{}, function (data) {
                $scope.listAllowedByCategory = data.settings.listing_allowed;

            },function (error){
               $scope.listAllowedByCategory = false;
            });
        }
    };

    $scope.searchAttributes = function (catId, catName){
        var params = {categoryId:catId};
        Attributes.get(params, {}, function (data){
            $scope.attrCatId = catId;
            $scope.attrCatName = catName;
           $scope.listAttributes = data;
        },function (error){
            $scope.listAttributes = [];
        });
    };

    $scope.exportToExcel=function(tableId){ // ex: '#my-table'
            $scope.exportHref=Excel.tableToExcel(tableId,'testExcelAngular');
            $timeout(function(){location.href=$scope.exportHref;},100); // trigger download
        };
}
