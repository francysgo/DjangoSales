from django.conf.urls import url, include
from .models import CatalogoCategoria, Proveedor, Entradas
from rest_framework import routers, serializers, viewsets
from rest_framework.response import Response


class CategoriaSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = CatalogoCategoria
        fields = ('id','nombre')

class CategoriarViewSet(viewsets.ModelViewSet):

	queryset = CatalogoCategoria.objects.all()
	serializer_class = CategoriaSerializer

class ProveedorSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Proveedor
        fields = ('id','nombre','telefono','correo','direccion')

class ProveedorViewSet(viewsets.ModelViewSet):

	queryset = Proveedor.objects.all()
	serializer_class = ProveedorSerializer

# Serializers define the API representation.
class EntradasSerializer(serializers.HyperlinkedModelSerializer):

	categoria = serializers.PrimaryKeyRelatedField(source='categoria.nombre', queryset=CatalogoCategoria.objects.all())
	proveedor = serializers.PrimaryKeyRelatedField(source='proveedor.nombre', queryset=Proveedor.objects.all())

	class Meta:
		model = Entradas
		fields = ('id','proveedor', 'producto', 'cantidad', 'categoria', 'unidad','precio_entrada', 'precio_salida', 'fecha')

# ViewSets define the view behavior.
class EntradasViewSet(viewsets.ModelViewSet):
    queryset = Entradas.objects.all()
    serializer_class = EntradasSerializer

    def create(self, validated_data):
    	proveedor = Proveedor.objects.get(id=validated_data.POST["proveedor"])
    	categoria = CatalogoCategoria.objects.get(id=validated_data.POST["categoria"])
    	entrada = Entradas.objects.create(producto=validated_data.POST['producto'],
    		cantidad=validated_data.POST['cantidad'],
    		unidad=validated_data.POST['unidad'],
    		categoria=categoria,
    		proveedor=proveedor,
    		precio_entrada = validated_data.POST['precio_entrada'],
    		precio_salida = validated_data.POST['precio_salida'])
    	return Response({'producto':entrada.producto})

    def update(self, validated_data, pk):
    	updated_instance = Entradas.objects.get(pk=pk)
    	proveedor = Proveedor.objects.get(id=validated_data.POST["proveedor"])
    	categoria = CatalogoCategoria.objects.get(id=validated_data.POST["categoria"])
    	updated_instance.producto=validated_data.POST['producto']
    	updated_instance.cantidad=validated_data.POST['cantidad']
    	updated_instance.unidad=validated_data.POST['unidad']
    	updated_instance.categoria=categoria
    	updated_instance.proveedor=proveedor
    	updated_instance.precio_entrada = validated_data.POST['precio_entrada']
    	updated_instance.precio_salida = validated_data.POST['precio_salida']
    	updated_instance.save()
    	return updated_instance
