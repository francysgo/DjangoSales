from django.conf.urls import url, include
from .views import *

urlpatterns = [   
   url(r'^ventas/$', IndexVentaView.as_view(), name='index_ventas'),
]