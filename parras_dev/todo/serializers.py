from rest_framework import serializers
from .models import Pendiente




class UserIDSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pendiente
        fields = ['user_id']

class PendienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pendiente
        fields = ['id', 'title', 'resolved', 'user_id']
