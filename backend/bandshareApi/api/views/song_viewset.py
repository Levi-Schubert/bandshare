from api.models import Profile, Song
from rest_framework import viewsets
from api.serializers import ProfileSerializer, SongSerializer


class SongViewSet(viewsets.ModelViewSet):
  queryset = Song.objects.all()
  serializer_class = SongSerializer