from django.conf.urls import url, include
from django.contrib import admin
from apps.users import urls as users_urls
from apps.home import urls as home_urls
from apps.administrador import urls as admin_urls

from rest_framework import routers
from apps.administrador.serializers import EntradasViewSet, ProveedorViewSet, CategoriarViewSet

# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'entradas', EntradasViewSet)
router.register(r'proveedores', ProveedorViewSet)
router.register(r'categorias', CategoriarViewSet)



urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^', include(users_urls)),
    url(r'^venta/', include(home_urls)),
    url(r'^', include(admin_urls)),
    url(r'^api/', include(router.urls)),

]
