from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter
from api.views import *


router = DefaultRouter()

router.register(r'users', UserViewSet)
router.register(r'profiles', ProfileViewSet)

urlpatterns = [
	url(r'^', include(router.urls)),
]