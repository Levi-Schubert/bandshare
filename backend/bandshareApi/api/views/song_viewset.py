from api.models import BandProfile, Song
from rest_framework import viewsets
from api.serializers import BandProfileSerializer, SongSerializer
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.decorators import detail_route


class SongViewSet(viewsets.ModelViewSet):
	queryset = Song.objects.all()
	serializer_class = SongSerializer

	
	def list(self, request):
		queryset = Song.objects.all()
		http_methods = ['get']
		genre = self.request.query_params.get('genre', None)
		band = self.request.query_params.get('band', None)
		if genre is not None:
			queryset = queryset.filter(genre=genre)
			queryset = queryset.order_by('?') [:10]
		if band is not None:
			queryset = queryset.filter(band=band)
		serializer = SongSerializer(queryset, many=True, context={'request': request})
		return Response(serializer.data)


		