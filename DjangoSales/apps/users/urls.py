from django.conf.urls import patterns, include, url
from .views import LoginView, LogoutView

urlpatterns = [
	url(r'^accounts/login/$', LoginView.as_view() , name='login'),
    url(r'^logout/$', LogoutView.as_view(), name='logout'),
]