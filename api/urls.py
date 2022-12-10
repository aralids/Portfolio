from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('update/', views.update, name='update'),
    path('temple/', views.temple, name='temple'),
    path('get_geolocation/', views.get_geolocation, name='get_geolocation'),
    path('gastroobscura/', views.gastroobscura, name='gastroobscura'),
    path('vitamins/', views.vitamins, name='vitamins'),
]
