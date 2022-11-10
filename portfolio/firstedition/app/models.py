from django.db import models
from django.utils import timezone

class User(models.Model):
    username = models.CharField(max_length=20)
    password = models.CharField(max_length=20)
    logo = models.CharField(max_length=40)

    def __str__(self):
        return self.username

class Entry(models.Model):
    day = models.DateField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    drawing = models.TextField()

    def __str__(self):
        return str(self.day) + ", user: " + str(self.user.id) + ", drawing: " + str(self.drawing)

class Associations(models.Model):
    entry = models.ForeignKey(Entry, on_delete=models.CASCADE)
    text = models.TextField()
    files = models.TextField()
    links = models.TextField()
    
