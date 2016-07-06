SalesApp.controller('inventarioAddController', function($scope, $http) {
	$scope.productos_actualizar = [];
	$scope.mostrarBoton = {}
	$scope.mostrarBoton.show = false;
	$scope.addProducto = function (){
		var url = '/api/inventario.json?producto__upc=' + $scope.upc_actualizar;
		$('#actual_upc').val('');
		$http.get(url)
	    .success(function(data) {
	    	var productos = $scope.productos_actualizar;
	    	var iguales = 0;
	    	if(productos.length > 0){
	    		$scope.mostrarBoton.show = true;
	    		for (var i=0; i < productos.length; i++) {
	    			if(data[0].producto.upc == productos[i].upc){
	    				iguales += 1;
	    			}
	    		}
	    		if(iguales == 0){
					$scope.productos_actualizar.push({
		            	'upc': data[0].producto.upc,
		            	'nombre':data[0].producto.nombre,
		            	'cantidad':data[0].cantidad,
		            });
	    		}
	    	}else{
	    		$scope.mostrarBoton.show = true;
	    		$scope.productos_actualizar.push({
	            	'upc': data[0].producto.upc,
	            	'nombre':data[0].producto.nombre,
	            	'cantidad':data[0].cantidad,
	            });
	    	}
	     })
	    .error(function(data) {
	            console.log('Error: ' + data);
	    });  
	}
	$scope.deleteProducto = function (idx){
	    $scope.productos_actualizar.splice($scope.productos_actualizar.indexOf(idx), 1);
	    if($scope.productos_actualizar.length == 0){
			$scope.mostrarBoton.show = false;
	    }
	}
});