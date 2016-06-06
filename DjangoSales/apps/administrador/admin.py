from django.contrib import admin
from .models import(
	Proveedor,
	Entradas,
	Inventario,
	CatalogoCategoria,
	CatalogoUnidades
	)

admin.site.register(Proveedor)
admin.site.register(Entradas)
admin.site.register(Inventario)
admin.site.register(CatalogoCategoria)
admin.site.register(CatalogoUnidades)