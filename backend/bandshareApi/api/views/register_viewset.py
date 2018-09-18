import json
from django.http import HttpResponse
from django.contrib.auth.models import User
from api.models import BandProfile, UserProfile

from rest_framework.authtoken.models import Token
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def register_user(request):
	"""Handles the creation of a new user for authentication

	Method args:
		request -- the full HTTP request object
	"""

	req_body = json.loads(request.body.decode())

	# make new user
	new_user = User.objects.create_user(
		username=req_body['username'],
		password=req_body['password'],
		email=req_body['email'],
	)
	# # make new customer for that user
	if 'isBand' in req_body:
		new_profile = BandProfile.objects.create(
			user=new_user,
			bandName=req_body['bandName'],
			city=req_body['city'],
			state=req_body['state'],
			isBand=req_body['isBand'],
 		)
	else:
		new_profile = UserProfile.objects.create(
			user=new_user,
			city=req_body['city'],
			state=req_body['state'],
		)

	token = Token.objects.create(user=new_user)

	data = json.dumps({"token": token.key})
	return HttpResponse(data, content_type='application/json')
