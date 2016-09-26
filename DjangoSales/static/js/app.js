var SalesApp = angular.module('SalesApp', ['angularUtils.directives.dirPagination','angular-loading-bar','ngRoute']);

	SalesApp.config(function($interpolateProvider,$httpProvider) {
	    $interpolateProvider.startSymbol('[[');
	    $interpolateProvider.endSymbol(']]');
	  	$httpProvider.defaults.xsrfCookieName = 'csrftoken';
     	$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
	 });