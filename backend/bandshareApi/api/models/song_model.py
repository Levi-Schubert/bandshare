from django.db import models
from .profile_model import Profile

class Song(models.Model):
	band = models.ForeignKey('Profile', on_delete=models.CASCADE,)
	title = models.CharField(max_length=128)
	album = models.CharField(max_length=128)
	description = models.CharField(max_length=256)
	mp3 = models.FileField(upload_to='mp3/')

	