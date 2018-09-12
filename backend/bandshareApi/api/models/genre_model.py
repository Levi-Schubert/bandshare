from django.db import models


class Genre(models.Model):
	genre = models.CharField(max_length=512)

	def __str__(self):
		return self.genre