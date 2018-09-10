from django.contrib.auth.models import User
from api.models import BandProfile
from rest_framework import viewsets
from django.core import serializers
from api.serializers import BandProfileSerializer


class BandProfileViewSet(viewsets.ModelViewSet):
  queryset = BandProfile.objects.all()
  serializer_class = BandProfileSerializer