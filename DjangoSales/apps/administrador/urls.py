from django.conf.urls import url, include
from .views import (
	IndexView,ProductoView,RedirectView,ProveedoresView,CategoriasView,UnidadesView
	,InventarioView
	)

urlpatterns = [
   url(r'^$', RedirectView.as_view(), name='root'),
   url(r'^administrador/$', IndexView.as_view(), name='index'),
   url(r'^administrador/productos/$', ProductoView.as_view(), name='productos'),
   url(r'^administrador/catalogo/proveedores/$', ProveedoresView.as_view(), name='proveedores'),
   url(r'^administrador/inventario/$', InventarioView.as_view(), name='inventario'),
   url(r'^administrador/catalogo/categorias/$', CategoriasView.as_view(), name='categorias'),
   url(r'^administrador/catalogo/unidades/$', UnidadesView.as_view(), name='unidades'),
]
