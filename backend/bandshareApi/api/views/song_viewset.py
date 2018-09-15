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
		print('using this one')
		queryset = Song.objects.all()
		http_methods = ['get']
		genre = self.request.query_params.get('genre', None)
		if genre is not None:
			queryset = queryset.filter(genre=genre)
		serializer = SongSerializer(queryset, many=True, context={'request': request})
		return Response(serializer.data)


		