from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.homepage, name='homepage'),
    url(r'^embed$', views.embedPRVW, name='embedPRVW'),
    url(r'^testembed$', views.testembedViz, name='testembedViz'),
]
