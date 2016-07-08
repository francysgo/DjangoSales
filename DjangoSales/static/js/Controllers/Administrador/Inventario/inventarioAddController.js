SalesApp.controller('inventarioAddController', function($scope, $http) {
	$scope.productos_actualizar = [];
	$scope.mostrarBoton = {}
	$scope.mostrarBoton.show = false;
	$scope.CantidadValue =[];
	$scope.addProducto = function (){
		var url = '/api/inventario.json?producto__upc=' + $scope.upc_actualizar;
		$('#actual_upc').val('');
		$http.get(url)
	    .success(function(data) {
	    	var productos = 0;
	    	productos = $scope.productos_actualizar;
	    	var iguales = 0;
	    	if(productos.length > 0){
	    		$scope.mostrarBoton.show = true;
	    		for (var i=0; i < productos.length; i++) {
	    			if(data[0].producto.upc == productos[i].upc){
	    				iguales += 1;
	    				$scope.CantidadValue[i] = $scope.CantidadValue[i] + 1;
	    			}
	    		}
	    		if(iguales == 0){
					$scope.productos_actualizar.push({
						'id':data[0].id,
		            	'upc': data[0].producto.upc,
		            	'nombre':data[0].producto.nombre,
		            	'cantidad':data[0].cantidad,
		            });
	    		}
	    	}else{
	    		$scope.mostrarBoton.show = true;
	    		$scope.productos_actualizar.push({
	    			'id':data[0].id,
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
	$scope.ActualizarProductos = function(){
		var productos = $scope.productos_actualizar;
		var cont = 0;
		for (var i = 0; i < productos.length; i++) {
			url = '/api/inventario/'+productos[i].id+'/';
			data = {};
			data.cantidad = $scope.CantidadValue[i];
			data.id = productos[i].id;
			data.update = true;
			$http.put(url,data).success(function(data){
				console.log(data);
			})
			.error(function(data) {
				cont +1;
		    });
		}
		if(cont == 0){
			swal({   title: "Productos Actualizados!",   text: "Los productos han sido actualizados correctamente!",   type: "success",  confirmButtonColor: "#449d44",   confirmButtonText: "Aceptar!"}, function(){   location.href="/administrador/inventario/#/";; });
		}else{
			sweetAlert("Error...", "Error al actualizar los productos!", "error");
		}

	}
});