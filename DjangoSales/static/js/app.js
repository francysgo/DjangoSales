var SalesApp = angular.module('SalesApp', []);

	SalesApp.config(function($interpolateProvider) {
	    $interpolateProvider.startSymbol('[[');
	    $interpolateProvider.endSymbol(']]');
	  });


SalesApp.controller('entradasController', function($scope, $http) {
	
	$http.get('/api/entradas.json')
        .success(function(data) {
            $scope.entradas = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
});