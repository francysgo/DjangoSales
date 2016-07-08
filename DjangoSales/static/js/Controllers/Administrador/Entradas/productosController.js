SalesApp.service('productoService', function() {
	this.text_eliminar= '';
	this.id_eliminar= '';
	this.index = '';
});


SalesApp.controller('productosController', function($scope, $http, productoService) {

    $http.get('/api/productos.json')
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
		data.precio_entrada = parseFloat($scope.precio_entrada);
		data.precio_salida = parseFloat($scope.precio_salida);
		console.log(data);
		$http.post('/api/productos/',data).success(function(data){
			location.reload();
		})
		.error(function(data, status, header, config) {
	            sweetAlert("Error...", "El código de barras ya existe!", "error");
	        });
	}
	$scope.detalleProducto = function(item){
		$scope.pk = item.id;
        $('#id_upc').val(item.upc);
		$('#id_nombre').val(item.nombre);
		$('#id_proveedor').val(item.proveedor.id).change();
		$('#id_categoria').val(item.categoria.id).change();
		$('#id_unidad').val(item.unidad.id).change();
		$('#id_precio_entrada').val(item.precio_entrada);
		$('#id_precio_salida').val(item.precio_salida);
		$scope.upc = item.upc;
		$scope.nombre = item.nombre;
		$scope.precio_entrada = item.precio_entrada;
		$scope.precio_salida = item.precio_salida;
		$('#editar_producto').modal('show');
	}
	$scope.editProducto = function(){
        var data = {};
        data.id = $scope.pk;
        data.upc = $scope.upc;
		data.nombre = $scope.nombre;
		data.proveedor = $('#id_proveedor').val();
		data.categoria = $('#id_categoria').val();
		data.unidad = $('#id_unidad').val();
		data.precio_entrada = parseFloat($scope.precio_entrada);
		data.precio_salida = parseFloat($scope.precio_salida);
		console.log(data);
		var url = '/api/productos/'+data.id+'/';
		$http.put(url,data).success(function(data){
			location.reload();
		})
		.error(function(data) {
	            sweetAlert("Error...", "El código de barras ya existe!", "error");
	        });
    }
});