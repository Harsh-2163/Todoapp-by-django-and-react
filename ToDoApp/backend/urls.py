from django.urls import path
from . import views
urlpatterns = [
    path('list/',views.getlist,name='getlist'),
    path('list/<str:pk>',views.getitem,name='getitem'),
]