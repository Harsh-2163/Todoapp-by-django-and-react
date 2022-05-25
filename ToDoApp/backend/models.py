from django.db import models
from django.forms import CharField

# Create your models here.
class Item(models.Model):
    data = models.TextField(null=True,blank=True)

    def __str__(self):
        return self.data[0:50]