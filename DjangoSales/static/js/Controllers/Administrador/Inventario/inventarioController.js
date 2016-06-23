SalesApp.controller('inventarioController', function($scope, $http, productoService) {

    $http.get('/api/inventario.json')
	        .success(function(data) {
	            $scope.productos = data;
	        })
	        .error(function(data) {
	            console.log('Error: ' + data);
	        });

    $scope.datosEliminar = function(item,index){
    	productoService.text_eliminar = item.nombre;
    	productoService.id_eliminar = item.id;
    	productoService.index = index;
    	productoService.obj = item;
    	$('#eliminar_producto').modal('show');
    }

    $scope.getText = function() {
    	return productoService.text_eliminar;
  	}
  	$scope.getId = function() {
    	return productoService.id_eliminar;
  	}

  	$scope.eliminarProducto = function(){
  		url = '/api/productos/' + productoService.id_eliminar;

  		$http.delete(url)
	    .success(function(data) {
	    		$('#eliminar_producto').modal('hide');
	            location.reload();
	    })
	    .error(function(data) {
	             console.log('Error: ' + data);
	    });
  	}


   $scope.sort = function(keyname){
		$scope.sortKey = keyname;   //set the sortKey to the param passed
		$scope.reverse = !$scope.reverse; //if true make it false and vice versa
	}
	$scope.addProducto = function(){
  		var data = {};
		data.upc = $scope.upc;
		data.nombre = $scope.nombre;
		data.proveedor = parseInt($scope.proveedor);
		data.categoria = parseInt($scope.categoria);
		data.unidad = parseInt($scope.unidad);

		console.log(data);
		$http.post('/api/productos/',data).success(function(data){
			location.reload();
		})
		.error(function(data) {
	            console.log('Error: ' + data);
	        });
		;
	}
	$scope.detalleProducto = function(item){
        $('#id_upc').val(item.upc);
		$('#id_nombre').val(item.nombre);
		$('#id_proveedor').val(item.proveedor.id).change();
		$('#id_categoria').val(item.categoria.id).change();
		$('#id_unidad').val(item.unidad.id).change();
		$('#editar_producto').modal('show');
	}


	$scope.getInventario = function(){
		
		url = '/api/inventario.json?producto__upc=' + $scope.upc_actualizar;

  		$http.get(url)
	    .success(function(data) {
    		$('#nombre_actualizar').val(data[0].producto.nombre);
    		$('#existencia_actualizar').val(data[0].cantidad);
    		$('#datos_extras').show();
	    })
	    .error(function(data) {
	             console.log('Error: ' + data);
	    });
	}

});

	SalesApp.config(function($routeProvider){
		 $routeProvider.when("/", {
		 templateUrl : "/static/js/Controllers/Administrador/Inventario/templates/all_entries.html",
		 controller : "inventarioController"
		 })
		 .when("/actualizar", {
		 templateUrl : "/static/js/Controllers/Administrador/Inventario/templates/actualizar.html",
		 controller : "inventarioAddController"
		 })
		 //este es digamos, al igual que en un switch el default, en caso que 
		 //no hayamos concretado que nos redirija a la página principal
		 .otherwise({ reditrectTo : "/" });
	});