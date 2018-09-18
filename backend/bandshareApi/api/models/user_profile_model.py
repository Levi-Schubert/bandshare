from django.db import models
from django.contrib.auth.models import User
from .song_model import Song

class UserProfile(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE)
	liked = models.ManyToManyField(Song)

	def __str__(self):
		return self.user.username



