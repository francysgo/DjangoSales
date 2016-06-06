SalesApp.controller('proveedoresController', function($scope, $http) {


  $scope.submit = function() {
 var Proveedor = {}
 Proveedor.nombre=$scope.nombre;
 Proveedor.telefono=$scope.telefono;
 Proveedor.correo=$scope.correo;
 Proveedor.direccion=$scope.direccion;

$http.post('/api/proveedores/',Proveedor)
   .success(function(data) {
      console.log(data);
     });
}



});
