from django.contrib.auth.models import User
from api.models import UserProfile
from rest_framework import serializers

class UserProfileSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = UserProfile
		fields = ('id', 'user',  'liked')