SalesApp.controller('inventarioAddController', function($scope, $http) {

	$scope.addProducto = function (){
		console.log($scope.upc_actualizar);
		var url = '/api/inventario.json?producto__upc=' + $scope.upc_actualizar;
		$scope.productos_actualizar = {};
		$http.get(url)
	    .success(function(data) {
	            $scope.productos_actualizar.push(data);
	        })
	    .error(function(data) {
	            console.log('Error: ' + data);
	    });
	}
});