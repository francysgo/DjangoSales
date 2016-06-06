from django.conf.urls import url, include
from .views import (
	IndexView,EntradasView,RedirectView,ProveedoresView
	)

urlpatterns = [
   url(r'^$', RedirectView.as_view(), name='index'),
   url(r'^administrador/$', IndexView.as_view(), name='index'),
   url(r'^administrador/entradas/$', EntradasView.as_view(), name='entradas'),
   url(r'^administrador/proveedores/$', ProveedoresView.as_view(), name='proveedores'),
]
