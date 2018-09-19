from api.models import Song
from rest_framework import serializers


class SongSerializer(serializers.HyperlinkedModelSerializer):

	class Meta:
		model = Song
		fields = ('id', 'band', 'title', 'album', 'mp3', 'genre')