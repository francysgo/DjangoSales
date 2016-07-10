SalesApp.controller('VentaController', function($scope, $http,$rootScope) {



$scope.Agrega=function() {
	alert("enter is activated");
}

});



SalesApp.directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.myEnter);
                });
                event.preventDefault();
               }
             if (event.altKey) {
                scope.$apply(function (){
                    scope.$eval(attrs.myEnter);
                });
                event.preventDefault();
                	
                }
        });
    };
});