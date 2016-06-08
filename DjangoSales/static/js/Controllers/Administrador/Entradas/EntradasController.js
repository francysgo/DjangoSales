SalesApp.service('eliminarService', function() {
	this.text_eliminar= '';
	this.id_eliminar= '';
	this.index = '';
});

SalesApp.controller('entradasController', function($scope, $http, eliminarService) {

    $http.get('/api/entradas.json')
	        .success(function(data) {
	            $scope.entradas = data;
	        })
	        .error(function(data) {
	            console.log('Error: ' + data);
	        });

    $scope.datosEliminar = function(item,index){
    	eliminarService.text_eliminar = item.producto;
    	eliminarService.id_eliminar = item.id;
    	eliminarService.index = index;
    	$('#eliminar_entrada').modal('show');
    }

    $scope.getText = function() {
    	return eliminarService.text_eliminar;
  	}
  	$scope.getId = function() {
    	return eliminarService.id_eliminar;
  	}

  	$scope.eliminarEntrada = function(item){
  		url = '/api/entradas/' + eliminarService.id_eliminar;

  		$http.delete(url)
	    .success(function(data) {
	            cargarDatos();
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

// SalesApp.controller('eliminarController', function($scope, $rootScope, $http) {
// 	$scope.id_eliminar = $rootScope.id_eliminar;
// 	$scope.text_eliminar = $rootScope.text_eliminar;
// 	console.log($scope.text_eliminar);
// 	console.log($scope.id_eliminar );
// 	$scope.eliminarEntrada = function(){
    	
//     }

//     $scope.eliminarEntrada = function(){
//     	var id_eliminar = $scope.id_eliminar;
//     	console.log(id_eliminar);
//     }
// });