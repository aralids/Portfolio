from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('temple', views.temple, name='temple'),
    path('gastroobscura', views.gastroobscura, name='gastroobscura'),
    path('vitamins', views.vitamins, name='vitamins'),
]
