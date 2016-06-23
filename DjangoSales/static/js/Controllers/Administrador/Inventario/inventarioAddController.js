SalesApp.controller('inventarioAddController', function($scope, $http) {
	$scope.productos_actualizar = [];
	
	$scope.addProducto = function (){
		console.log($scope.upc_actualizar);
		var url = '/api/inventario.json?producto__upc=' + $scope.upc_actualizar;
		$('#actual_upc').val('');
		$http.get(url)
	    .success(function(data) {
	    	console.log(data);
	            $scope.productos_actualizar.push({
	            	'upc': data[0].producto.upc,
	            	'nombre':data[0].producto.nombre,
	            });
	        })
	    .error(function(data) {
	            console.log('Error: ' + data);
	    });
	}
});