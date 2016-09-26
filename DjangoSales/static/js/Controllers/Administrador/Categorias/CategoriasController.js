SalesApp.controller('categoriaController', function($scope, $http,$rootScope) {

 var obtenerLista=function(){
  $http.get('/api/categorias/').success(function(data) {
        $scope.categorias=data;
       });
}

$scope.AgregaCategoria=function(){

$('#Modalcategoria').modal('show');
$scope.categoria="";
$scope.content="<h5>Guardar categoria</h5>";

}

$scope.Addcategoria=function(){
	CatalogoCategoria={};
	CatalogoCategoria.nombre=$scope.categoria;
	console.log(CatalogoCategoria);
	$http.post('/api/categorias/',CatalogoCategoria).success(function(data) {
        obtenerLista();
        $('#Modalcategoria').modal('hide');
       });
}

$scope.Editarcategoria=function(object){
$('#Modalcategoria').modal('show');
$scope.categoria=object.nombre;
$scope.id=object.id;
$scope.content="<h5>Editar categoria</h5>";
}

$scope.Editcategoria=function(){
	CatalogoCategoria={};
	CatalogoCategoria.nombre=$scope.categoria;
	CatalogoCategoria.id=$scope.id;
   console.log(CatalogoCategoria);
	$http.put('/api/categorias/'+CatalogoCategoria.id+'/',JSON.stringify(CatalogoCategoria)).success(function(data) {
    $('#Modalcategoria').modal('hide');
    obtenerLista();
    
         });

}

$scope.Eliminarcategoria=function(object){
	$('#Modalcategoriadelete').modal("show");
	$scope.content="<h5>Eliminar categoria</h5>"
	$scope.cat=object.nombre;
	$scope.id=object.id;
}


$scope.Deletecategoria=function(){	
	$http.delete('/api/categorias/'+$scope.id+'/').success(function(data) {
    $('#Modalcategoriadelete').modal('hide');
    obtenerLista();
    
         });
}

obtenerLista();

});



 


