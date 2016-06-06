var SalesApp = angular.module('SalesApp', []);

	SalesApp.config(function($interpolateProvider,$httpProvider) {
	    $interpolateProvider.startSymbol('[[');
	    $interpolateProvider.endSymbol(']]');
	  	$httpProvider.defaults.xsrfCookieName = 'csrftoken';
     	$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
	 });
