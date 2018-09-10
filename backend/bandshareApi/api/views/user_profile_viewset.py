from django.contrib.auth.models import User
from api.models import UserProfile
from rest_framework import viewsets
from django.core import serializers
from api.serializers import UserProfileSerializer


class UserProfileViewSet(viewsets.ModelViewSet):
  queryset = UserProfile.objects.all()
  serializer_class = UserProfileSerializer