SalesApp.controller('categoriaController', function($scope, $http,$rootScope) {

 var obtenerLista=function(){
  $http.get('/api/categorias/').success(function(data) {
        $scope.categorias=data;
       });
}

$scope.AgregaCategoria=function(){

$('#Modalcategoria').modal('show');

}

obtenerLista();

});




