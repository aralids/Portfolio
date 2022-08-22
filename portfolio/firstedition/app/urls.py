from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('temple', views.temple, name='temple'),
    path('', views.gastroobscura, name='gastroobscura'),
    path('', views.vitamins, name='vitamins'),
]
