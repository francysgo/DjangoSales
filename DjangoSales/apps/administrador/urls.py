from django.conf.urls import url, include
from .views import (
	IndexView,ProductoView,RedirectView,ProveedoresView,CategoriasView,UnidadesView
	)

urlpatterns = [
   url(r'^$', RedirectView.as_view(), name='root'),
   url(r'^administrador/$', IndexView.as_view(), name='index'),
   url(r'^administrador/productos/$', ProductoView.as_view(), name='productos'),
   url(r'^administrador/proveedores/$', ProveedoresView.as_view(), name='proveedores'),
   url(r'^administrador/categorias/$', CategoriasView.as_view(), name='categorias'),
   url(r'^administrador/unidades/$', UnidadesView.as_view(), name='unidades'),
]
