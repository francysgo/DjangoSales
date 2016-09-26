SalesApp.controller('inventarioController', function($scope, $http) {

    $http.get('/api/inventario.json')
	        .success(function(data) {
	            $scope.productos = data;
	        })
	        .error(function(data) {
	            console.log('Error: ' + data);
	        });

   $scope.sort = function(keyname){
		$scope.sortKey = keyname;   //set the sortKey to the param passed
		$scope.reverse = !$scope.reverse; //if true make it false and vice versa
	}

	$scope.detalleInventario = function(item){
        $scope.cantidad = item.cantidad;
        $scope.id = item.id;
        $scope.upc = item.producto.upc;
        $scope.nombre = item.producto.nombre;
		$('#editar_inventario').modal('show');
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

	$scope.editInventario = function(){
		$('#editar_inventario').modal('hide');
		var url = '/api/inventario/'+$scope.id+'/';
		data = {};
		data.cantidad = $scope.cantidad;
		data.id = $scope.id
		data.update = false;
		$http.put(url,data).success(function(data){
			swal({   title: "Producto Actualizado!",   text: "El producto ha sido actualizado correctamente!",   type: "success",  confirmButtonColor: "#449d44",   confirmButtonText: "Aceptar!"}, function(){   location.reload(); });
		})
		.error(function(data) {
			sweetAlert("Error...", "Error al actualizar el producto!", "error");
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