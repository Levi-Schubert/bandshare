from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter
from api.views import *


router = DefaultRouter()

router.register(r'users', UserViewSet)
router.register(r'band_profiles', BandProfileViewSet)
router.register(r'user_profiles', UserProfileViewSet)
router.register(r'genres', GenreViewSet)
router.register(r'songs', SongViewSet)


urlpatterns = [
	url(r'^', include(router.urls)),
	url(r'^register/', register_user)
]