SalesApp.controller('proveedoresController', function($scope, $http,$rootScope) {

  $http.get('/api/proveedores/').success(function(data) {
        $scope.proveedores=data;
       });

$scope.EditarProveedor=function(proveedor){
  $rootScope.$emit('test',proveedor);

};

$scope.Agregaproveedor=function(){
     $('#Modalproveedor').modal('show');
}

});


SalesApp.controller('EditproveedoresController', function($scope, $http,$rootScope) {

  $rootScope.$on('test', function(event,data) {
           $('#Modalproveedor').modal('show');
           $scope.btnEditar=true;
           $scope.btnGuardar=false;
           //$scope.content="<h1>Editar proveedor abc</h1>"
           $scope.proveedor=data.nombre;
           $scope.id=data.id;
           $scope.telefono=data.telefono;
           $scope.direccion=data.direccion;
           $scope.correo=data.correo;
          });

$scope.Editproveedor=function(){
  Proveedor={};
  Proveedor.id=$scope.id;
  Proveedor.nombre=$scope.proveedor;
  Proveedor.telefono=$scope.telefono;
  Proveedor.direccion=$scope.direccion;
  Proveedor.correo=$scope.correo;

  $http.post('/api/proveedores/',Proveedor).success(function(data) {
    $('#Modalproveedor').modal('hide')
    $.notify({icon: 'ti-thumb-up',message: "El proveedor se ha editado correctamente"},{ type: 'success',timer: 4000});
       });
}

$scope.Addproveedor=function(){
  Proveedor={};
  Proveedor.nombre=$scope.proveedor;
  Proveedor.telefono=$scope.telefono;
  Proveedor.direccion=$scope.direccion;
  Proveedor.correo=$scope.correo;

  $http.post('/api/proveedores/',Proveedor).success(function(data) {
    $('#Modalproveedor').modal('hide')
    $.notify({icon: 'ti-thumb-up',message: "El proveedor se ha agregado correctamente"},{ type: 'success',timer: 4000});
       });

}



});
