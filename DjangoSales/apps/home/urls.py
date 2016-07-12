from django.conf.urls import url, include
from .views import *

urlpatterns = [   
   url(r'^venta/$', IndexVentaView.as_view(), name='index_ventas'),
]