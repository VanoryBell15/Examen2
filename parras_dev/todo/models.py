from django.db import models

class Pendiente(models.Model):
    title = models.CharField(max_length=255)
    resolved = models.BooleanField(default=False)
    user_id = models.IntegerField()  
