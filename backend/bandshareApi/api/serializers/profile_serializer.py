from django.contrib.auth.models import User
from api.models import BandProfile
from rest_framework import serializers

class BandProfileSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = BandProfile
		fields = ('id', 'url','user', 'bio', 'city', 'state', 'image', 'isBand')