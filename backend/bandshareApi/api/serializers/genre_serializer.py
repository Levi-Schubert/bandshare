from api.models import Genre
from rest_framework import serializers


class GenreSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = Genre
		fields = ('id', 'genre')