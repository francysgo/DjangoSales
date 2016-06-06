SalesApp.controller('entradasController', function($scope, $http) {

    $scope.id_elimianr = 0;
    $scope.producto = '';
    $scope.eliminar = function(id,nombre){
    	console.log($scope.producto);
    	$scope.id_elimianr = id;
   		$scope.producto = nombre;
    	console.log($scope.producto);
    	$('#eliminar_entrada').modal('show');
    }

});
