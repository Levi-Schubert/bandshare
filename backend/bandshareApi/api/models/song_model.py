from django.db import models
from .profile_model import BandProfile
from .genre_model import Genre

class Song(models.Model):
	band = models.ForeignKey('BandProfile', on_delete=models.CASCADE,)
	title = models.CharField(max_length=128)
	album = models.CharField(max_length=128)
	description = models.CharField(max_length=256, blank=True)
	mp3 = models.FileField(upload_to='mp3/')
	genre = models.ManyToManyField('Genre')

	