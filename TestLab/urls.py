from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^LiveArticles$', views.homepage, name='homepage'),
]
