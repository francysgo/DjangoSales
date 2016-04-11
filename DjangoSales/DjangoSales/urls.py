from django.conf.urls import url, include
from django.contrib import admin
from apps.users import urls as users_urls
from apps.home import urls as home_urls
from apps.administrador import urls as admin_urls

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^', include(users_urls)),
    url(r'^venta/', include(home_urls)),
    url(r'^administrador/', include(admin_urls)),
]
