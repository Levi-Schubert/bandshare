from django.contrib.auth.models import User
from api.models import Profile
from rest_framework import serializers

class ProfileSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = Profile
		fields = ('id', 'user', 'bio', 'city', 'state', 'image', 'isBand')