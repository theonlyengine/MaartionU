from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import User
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token

@api_view(['POST'])
def register(request):
    data = request.data
    user = User.objects.create_user(email=data['email'], name=data['name'], password=data['password'])
    return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def login(request):
    user = authenticate(email=request.data['email'], password=request.data['password'])
    if user is not None:
        token, _ = Token.objects.get_or_create(user=user)
        return Response({'token': token.key}, status=status.HTTP_200_OK)
    return Response({'message': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
