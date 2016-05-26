from django.db import models

unidades = (
	("kilogramos","kilogramos"),
	("litros","litros"),
	("cajas","cajas"),
	("piezas","piezas"),
	("paquete","paquete"),
	)

class CatalogoCategoria(models.Model):

	nombre = models.CharField(max_length=50)

	class Meta:
		verbose_name = "CatalogoCategoria"
		verbose_name_plural = "Catalogo Categorias"

	def __str__(self):
		return '%s'%self.nombre
    

class Proveedor(models.Model):

	nombre = models.CharField(max_length=50)
	telefono = models.IntegerField(null=True,blank=True)
	correo = models.EmailField(null=True,blank=True)
	direccion = models.CharField(max_length=100, null=True, blank=True)

	class Meta:
		verbose_name = "Proveedor"
		verbose_name_plural = "Proveedores"

	def __str__(self):
		return self.nombre

class Entradas(models.Model):

	producto = models.CharField(max_length=50)
	proveedor = models.ForeignKey(Proveedor)
	cantidad = models.FloatField(default=0)
	unidad = models.CharField(max_length=50,choices=unidades)
	precio_entrada = models.FloatField(default=0)
	precio_salida = models.FloatField(default=0)
	fecha = models.DateField(auto_now_add=True)

	class Meta:
		verbose_name=' Entradas'
		verbose_name_plural = 'Entradas'

	def __str__(self):
		return self.producto

class Inventario(models.Model):

	upc = models.BigIntegerField(null=True,blank=True)
	nombre_producto = models.CharField(max_length=50)
	categoria = models.ForeignKey(CatalogoCategoria,default=0)
	proveedor = models.ForeignKey(Proveedor)
	cantidad = models.FloatField(default=0)
	tipo = models.CharField(max_length=50,choices=unidades)
	precio = models.FloatField(default=0)
	is_active = models.BooleanField(default=True)

	def __str__(self):
		return self.producto

class Venta(models.Model):

	fecha = models.DateTimeField()
	usuario = models.CharField(max_length=50)
	total_compra = models.FloatField(default=0)


	class Meta:
		verbose_name = "Venta"
		verbose_name_plural = "Ventas"


	def __str__(self):
        return '%s'%self.usuario

class DescripcionVenta(models.Model):

	venta = models.ForeignKey(Venta)
	producto = models.CharField(max_length=50)
	cantidad = models.FloatField(default=0)
	precio_unitario models.FloatField(default=0)


	class Meta:
		verbose_name = "DescripcionVenta"
		verbose_name_plural = "DescripcionVentas"


	def __str__(self):
		pass
    
    