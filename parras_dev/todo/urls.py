from django.urls import path
from . import views

urlpatterns = [

    path('pendientes/', views.PendienteListAPIView.as_view(), name='pendiente-list'),
    path('pendientes/resueltos/', views.PendienteResolvedListAPIView.as_view(), name='pendiente-resolved-list'),
    path('pendientes/no-resueltos/', views.PendienteUnresolvedListAPIView.as_view(), name='pendiente-unresolved-list'),
    path('pendientes/user/<int:user_id>/', views.PendienteUserIDListAPIView.as_view(), name='pendiente-user-list'),
    path('pendientes/user/<int:user_id>/resueltos/', views.PendienteResolvedUserIDListAPIView.as_view(), name='pendiente-user-resolved-list'),
    path('pendientes/user/<int:user_id>/no-resueltos/', views.PendienteUnresolvedUserIDListAPIView.as_view(), name='pendiente-user-unresolved-list'),

 
    path('pendientes/crear/', views.PendienteCreateAPIView.as_view(), name='pendiente-create'),
    path('pendientes/<int:pk>/', views.PendienteDetailAPIView.as_view(), name='pendiente-detail'),
    path('api/usuarios/', views.UserIDListAPIView.as_view(), name='user-id-list'),
]
