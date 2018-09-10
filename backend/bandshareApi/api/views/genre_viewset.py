from api.models import Genre
from rest_framework import viewsets
from api.serializers import GenreSerializer


class GenreViewSet(viewsets.ModelViewSet):
  queryset = Genre.objects.all()
  serializer_class = GenreSerializer
  http_methods = ['get','post']