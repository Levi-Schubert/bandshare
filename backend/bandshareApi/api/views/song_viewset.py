from api.models import BandProfile, Song
from rest_framework import viewsets
from api.serializers import BandProfileSerializer, SongSerializer
from rest_framework.authtoken.models import Token


class SongViewSet(viewsets.ModelViewSet):
	queryset = Song.objects.all()
	serializer_class = SongSerializer
