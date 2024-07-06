from rest_framework import generics, status
from rest_framework.response import Response
from .models import Pendiente
from .serializers import PendienteSerializer, UserIDSerializer


class UserIDListAPIView(generics.ListAPIView):
    queryset = Pendiente.objects.values('user_id').distinct()
    serializer_class = UserIDSerializer  


class PendienteCreateAPIView(generics.CreateAPIView):
    queryset = Pendiente.objects.all()
    serializer_class = PendienteSerializer

class PendienteDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Pendiente.objects.all()
    serializer_class = PendienteSerializer

class PendienteListAPIView(generics.ListAPIView):
    queryset = Pendiente.objects.all()
    serializer_class = PendienteSerializer

class PendienteResolvedListAPIView(generics.ListAPIView):
    queryset = Pendiente.objects.filter(resolved=True)
    serializer_class = PendienteSerializer

class PendienteUnresolvedListAPIView(generics.ListAPIView):
    queryset = Pendiente.objects.filter(resolved=False)
    serializer_class = PendienteSerializer

class PendienteUserIDListAPIView(generics.ListAPIView):
    queryset = Pendiente.objects.all()
    serializer_class = PendienteSerializer

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        return Pendiente.objects.filter(user_id=user_id)

class PendienteResolvedUserIDListAPIView(generics.ListAPIView):
    queryset = Pendiente.objects.filter(resolved=True)
    serializer_class = PendienteSerializer

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        return Pendiente.objects.filter(user_id=user_id, resolved=True)

class PendienteUnresolvedUserIDListAPIView(generics.ListAPIView):
    queryset = Pendiente.objects.filter(resolved=False)
    serializer_class = PendienteSerializer

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        return Pendiente.objects.filter(user_id=user_id, resolved=False)
