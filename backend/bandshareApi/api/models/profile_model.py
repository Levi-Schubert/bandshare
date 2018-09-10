from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE)
	bio = models.CharField(max_length=512, blank=True)
	city = models.CharField(max_length=128)
	state = models.CharField(max_length=128)
	image = models.FileField(upload_to='profile_images/', blank=True)
	isBand = models.BooleanField(default='False')

	def __str__(self):
		return self.user.username