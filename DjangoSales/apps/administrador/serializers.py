from django.conf.urls import url, include
from .models import CatalogoCategoria, Proveedor, Producto, CatalogoUnidades
from rest_framework import routers, serializers, viewsets
from rest_framework.response import Response

class UnidadSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = CatalogoUnidades
        fields = ('id','nombre')

class UnidadViewSet(viewsets.ModelViewSet):
    queryset = CatalogoUnidades.objects.all()
    serializer_class = UnidadSerializer









class CategoriaSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = CatalogoCategoria
        fields = ('id','nombre')

class CategoriarViewSet(viewsets.ModelViewSet):

	queryset = CatalogoCategoria.objects.all()
	serializer_class = CategoriaSerializer

class ProveedorProductosSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Proveedor
        fields = ('id','nombre')

# Serializers define the API representation.
class ProductoSerializer(serializers.HyperlinkedModelSerializer):
    #serializers.PrimaryKeyRelatedField(source='proveedor.nombre', queryset=Proveedor.objects.all())
    categoria = CategoriaSerializer()
    unidad = UnidadSerializer()
    proveedor = ProveedorProductosSerializer()

    class Meta:
        model = Producto
        fields = ('id', 'upc', 'proveedor', 'nombre', 'categoria', 'unidad')

# ViewSets define the view behavior.
class ProductoViewSet(viewsets.ModelViewSet):

    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer


    def create(self, request, *args, **kwargs):
        proveedor = Proveedor.objects.get(id=request.data['proveedor'])
        categoria = CatalogoCategoria.objects.get(id=request.data['categoria'])
        unidad = CatalogoUnidades.objects.get(id=request.data['unidad'])
        entrada = Producto.objects.create(nombre=request.data['nombre'],
            upc=request.data['upc'],
            unidad=unidad,
            categoria=categoria,
            proveedor=proveedor)
        return Response({'producto':entrada.nombre})

    def update(self, validated_data, pk):

        updated_instance = Producto.objects.get(pk=pk)
        proveedor = Proveedor.objects.get(id=validated_data.POST["proveedor"])
        unidad = CatalogoUnidades.objects.get(id=validated_data.POST["unidad"])
        categoria = CatalogoCategoria.objects.get(id=validated_data.POST["categoria"])
        updated_instance.upc=validated_data.POST['upc']
        updated_instance.nombre=validated_data.POST['nombre']
        updated_instance.unidad=unidad
        updated_instance.categoria=categoria
        updated_instance.proveedor=proveedor
        updated_instance.save()
        return updated_instance

class ProveedorSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Proveedor
        fields = ('id','nombre','telefono','correo','direccion')

class ProveedorViewSet(viewsets.ModelViewSet):
    queryset = Proveedor.objects.all()
    serializer_class = ProveedorSerializer