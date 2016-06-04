from django.conf.urls import url, include
from .views import (
	IndexView,EntradasView,RedirectView
	)

urlpatterns = [   
   url(r'^$', RedirectView.as_view(), name='index'),
   url(r'^administrador/$', IndexView.as_view(), name='index'),
   url(r'^administrador/entradas/$', EntradasView.as_view(), name='entradas'),
]