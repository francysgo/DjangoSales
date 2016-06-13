SalesApp.controller('proveedoresController', function($scope, $http,$rootScope) {

  $http.get('/api/proveedores/').success(function(data) {
        $scope.proveedores=data;
       });

$scope.EditarProveedor=function(proveedor){
  $rootScope.$emit('test',proveedor);

};
});


SalesApp.controller('EditproveedoresController', function($scope, $http,$rootScope) {

  $rootScope.$on('test', function(event,data) {
           $('#Modalproveedor').modal('show');
           $scope.btnEditar=true;
           $scope.btnGuardar=false;
           $scope.content="<h1>Editar proveedor abc</h1>"
           $scope.proveedor=data.nombre;
           $scope.telefono=data.telefono;
           $scope.direccion=data.direccion;
           $scope.correo=data.correo;
          });
});
