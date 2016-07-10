<<<<<<< HEAD
var SalesApp = angular.module('SalesApp', ['angularUtils.directives.dirPagination','angular-loading-bar','ngRoute']);
=======
var SalesApp = angular.module('SalesApp', ['angularUtils.directives.dirPagination','angular-loading-bar','ngSanitize']);
>>>>>>> eric/pruebas

	SalesApp.config(function($interpolateProvider,$httpProvider) {
	    $interpolateProvider.startSymbol('[[');
	    $interpolateProvider.endSymbol(']]');
	  	$httpProvider.defaults.xsrfCookieName = 'csrftoken';
     	$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
	 });