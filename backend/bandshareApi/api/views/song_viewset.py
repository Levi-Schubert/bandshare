import json
from django.http import HttpResponse
from api.models import BandProfile, Song
from rest_framework import viewsets
from api.serializers import BandProfileSerializer, SongSerializer
from rest_framework.authtoken.models import Token
from django.views.decorators.csrf import csrf_exempt


class SongViewSet(viewsets.ModelViewSet):
	queryset = Song.objects.all()
	serializer_class = SongSerializer

	def create(self, request):
		user = request.user
		profile = BandProfile.objects.get(user=user.id)
		if((profile.isBand.title()) == True):
			req_body = json.loads(request.body.decode())

			new_song = Song.objects.create(
				profile=profile,
				title=req_body['title'],
				album=req_body['album'],
				description=req_body['description'],
				mp3=req_body['mp3'],
			)
			data = json.dumps({'created': True})
			return HttpResponse(data, content_type='application/json')