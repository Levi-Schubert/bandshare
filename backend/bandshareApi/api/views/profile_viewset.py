from django.contrib.auth.models import User
from api.models import Profile
from rest_framework import viewsets
from django.core import serializers
from api.serializers import ProfileSerializer


class ProfileViewSet(viewsets.ModelViewSet):
  queryset = Profile.objects.all()
  serializer_class = ProfileSerializer