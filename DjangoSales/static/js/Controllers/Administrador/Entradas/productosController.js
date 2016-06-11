SalesApp.service('eliminarService', function() {
	this.text_eliminar= '';
	this.id_eliminar= '';
	this.index = '';
});


SalesApp.controller('addProductoController', function($scope, $http) {
	
	$scope.addProducto = function(){
  		var data = {
		'upc' : $scope.upc,
		'nombre' : $scope.nombre,
		'proveedor' : $scope.proveedor,
		'categoria' : $scope.categoria,
		'unidad' : $scope.unidad,
		'precio_entrada' : $scope.precio_entrada,
		'precio_salida' : $scope.precio_salida
		};
		$http({
			  method: 'POST',
			  url: '/api/productos/',
			  data: data,
		}).then(function successCallback(response) {
			    console.log(response);
			  }, function errorCallback(response) {
			    console.log(response);
			  });
			  	}
});

SalesApp.controller('productosController', function($scope, $http, eliminarService) {

    $http.get('/api/productos.json')
	        .success(function(data) {
	            $scope.productos = data;
	        })
	        .error(function(data) {
	            console.log('Error: ' + data);
	        });

    $scope.datosEliminar = function(item,index){
    	eliminarService.text_eliminar = item.nombre;
    	eliminarService.id_eliminar = item.id;
    	eliminarService.index = index;
    	$('#eliminar_producto').modal('show');
    }

    $scope.getText = function() {
    	return eliminarService.text_eliminar;
  	}
  	$scope.getId = function() {
    	return eliminarService.id_eliminar;
  	}

  	$scope.eliminarProducto = function(item){
  		url = '/api/productos/' + eliminarService.id_eliminar;

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

});