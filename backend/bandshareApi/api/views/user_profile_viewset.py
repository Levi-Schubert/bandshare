from django.contrib.auth.models import User
from api.models import UserProfile
from rest_framework import viewsets
from django.core import serializers
from api.serializers import UserProfileSerializer
from django.shortcuts import get_object_or_404
from rest_framework.response import Response


class UserProfileViewSet(viewsets.ModelViewSet):
	queryset = UserProfile.objects.all()
	serializer_class = UserProfileSerializer

	def list(self, request):
		profile = UserProfile.objects.filter(user=self.request.user)
		valid_profile = get_object_or_404(profile, user=self.request.user)
		serializer = UserProfileSerializer(valid_profile, context={'request': request})
		return Response(serializer.data)