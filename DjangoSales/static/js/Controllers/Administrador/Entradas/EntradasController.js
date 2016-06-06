


SalesApp.controller('entradasController', function($scope, $http) {

	$http.get('/api/entradas.json')
        .success(function(data) {
					console.log(data);
            $scope.entradas = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });


				$scope.AgregarEntrada = function() {
	        var Entrada={}
					Entrada.producto = "prueba";
					Entrada.proveedor = "prueba";
					Entrada.cantidad = 3;
					Entrada.categoria = 1;
					Entrada.unidad = "piezas"
					Entrada.precio_entrada = 
					Entrada.precio_salida =
					Entrada.fecha =

					$http.post('/api/entradas',Entrada)
								.success(function(data) {
									console.log(data);

								})
								.error(function(data) {
										console.log('Error: ' + data);
								});

	    }

});
