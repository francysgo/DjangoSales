from django.conf.urls import url, include
from .models import CatalogoCategoria, Proveedor, Producto, CatalogoUnidades, Inventario
from rest_framework import routers, serializers, viewsets, generics
from rest_framework.response import Response
from rest_framework import filters

class UnidadSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = CatalogoUnidades
        fields = ('id','nombre')

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

class InventarioSerializer(serializers.HyperlinkedModelSerializer):
    producto = ProductoSerializer()

    class Meta:
        model = Inventario
        fields = ('id', 'producto', 'cantidad', 'precio_entrada', 'precio_salida')

class InventarioViewSet(viewsets.ModelViewSet):
    serializer_class = InventarioSerializer
    queryset = Inventario.objects.all()
    filter_backends = (filters.DjangoFilterBackend,)
    filter_fields = ('producto__upc',)