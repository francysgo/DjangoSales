SalesApp.controller('UnidadesController', function($scope, $http,$rootScope) {

 var obtenerLista=function(){
  $http.get('/api/unidades/').success(function(data) {
        $scope.unidades=data;
       });
}

$scope.AgregaUnidad=function(){
$('#Modalunidad').modal('show');
$scope.unidad="";
$scope.content="<h5>Guardar unidad de medida</h5>";

}

$scope.Editaunidad=function(object){
$('#Modalunidad').modal('show');
$scope.unidad=object.nombre;
$scope.id=object.id;
$scope.content="<h5>Editar unidad</h5>";
}

$scope.Addunidad=function(){
	CatalogoUnidades={};
	CatalogoUnidades.nombre=$scope.unidad;
	console.log(CatalogoUnidades);
	$http.post('/api/unidades/',CatalogoUnidades).success(function(data) {
        obtenerLista();
        $('#Modalunidad').modal('hide');
       });
}


$scope.Editunidad=function(){
	CatalogoUnidades={};
	CatalogoUnidades.nombre=$scope.unidad;
	CatalogoUnidades.id=$scope.id;
   
	$http.put('/api/unidades/'+CatalogoUnidades.id+'/',JSON.stringify(CatalogoUnidades)).success(function(data) {
    $('#Modalunidad').modal('hide');
    obtenerLista();
    
         });

}

$scope.Eliminarunidad=function(object){
	$('#Modalunidaddelete').modal("show");
	$scope.content="<h5>Eliminar unidad</h5>"
	$scope.cat=object.nombre;
	$scope.id=object.id;
}


$scope.Deleteunidad=function(){	
	$http.delete('/api/unidades/'+$scope.id+'/').success(function(data) {
    $('#Modalunidaddelete').modal('hide');
    obtenerLista();
    
         });
}

obtenerLista();

});