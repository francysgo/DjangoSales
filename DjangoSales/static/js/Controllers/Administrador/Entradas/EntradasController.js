SalesApp.controller('entradasController', function($scope, $http) {

    $http.get('/api/entradas.json')
	        .success(function(data) {
	            $scope.entradas = data;
	        })
	        .error(function(data) {
	            console.log('Error: ' + data);
	        });
    $scope.eliminar = function(item){
    	$('#nombre_entrada').text(item.currentTarget.getAttribute("data-producto"));
    	$('#id_entrada').val(item.currentTarget.getAttribute("data-id"));
    	$('#eliminar_entrada').modal('show');
    }

   $scope.sort = function(keyname){
		$scope.sortKey = keyname;   //set the sortKey to the param passed
		$scope.reverse = !$scope.reverse; //if true make it false and vice versa
	}

});
