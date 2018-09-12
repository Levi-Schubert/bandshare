from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from api.models import BandProfile
from rest_framework import viewsets
from django.core import serializers
from api.serializers import BandProfileSerializer
from rest_framework.response import Response
from rest_framework.authtoken.models import Token


class BandProfileViewSet(viewsets.ModelViewSet):
	queryset = BandProfile.objects.all()
	serializer_class = BandProfileSerializer

	def list(self, request):
		profile = BandProfile.objects.filter(user=self.request.user)
		valid_profile = get_object_or_404(profile, user=user)
		serializer = BandProfileSerializer(valid_profile, context={'request': request})
		return Response(serializer.data)