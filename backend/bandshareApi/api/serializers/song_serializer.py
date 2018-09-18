from api.models import Song
from rest_framework import serializers


class SongSerializer(serializers.HyperlinkedModelSerializer):

	class Meta:
		model = Song
		fields = ('id', 'band', 'title', 'album','description','mp3', 'genre')