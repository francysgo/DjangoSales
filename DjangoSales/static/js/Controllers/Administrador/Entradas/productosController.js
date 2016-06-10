SalesApp.service('eliminarService', function() {
	this.text_eliminar= '';
	this.id_eliminar= '';
	this.index = '';
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