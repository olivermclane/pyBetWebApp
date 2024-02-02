from datetime import timezone

from django.contrib.auth import authenticate, login
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response

from .models import Bettor, Sport, Bet, Event
from .serializers import BettorSerializer, SportSerializer, EventSerializer
from .API_Client import APIClient


# Create your views here.
class CommonResponse:
    # Reusable mixin to simplify sending common responses
    def send_error_response(self, message, status_code=status.HTTP_400_BAD_REQUEST):
        return Response({'error': message}, status=status_code)

    def send_success_response(self, data=None, status_code=status.HTTP_200_OK):
        return Response(data or {}, status=status_code)


class RegisterView(APIView, CommonResponse):
    # Handle user registration
    def post(self, request):
        # Validate user data
        serializer = BettorSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Create a new bettor
        bettor = Bettor.objects.create(**serializer.validated_data)
        bettor.set_password(serializer.validated_data['password'])  # Hash password
        bettor.save()

        # Generate refresh token for authentication
        refresh = RefreshToken.for_user(bettor)

        # Return success response with user data and token
        return self.send_success_response({
            'user': BettorSerializer(bettor).data,
            'token': str(refresh.access_token),
        })


class RefreshOddsView(APIView, CommonResponse):
    # Refresh sports and events data from external API
    def get(self, request):
        api_client = APIClient()  # Assuming APIClient handles external data fetching
        api_client.get_sports_and_events()
        return self.send_success_response("Odds refreshed!")


class LoginView(APIView, CommonResponse):
    # Handle user login
    def post(self, request):
        # Retrieve username and password from request data
        username = request.data.get('username')
        password = request.data.get('password')

        # Validate credentials
        if not username or not password:
            return self.send_error_response('Missing username or password')

        # Authenticate user
        bettor = authenticate(request, username=username, password=password)
        if not bettor:
            return self.send_error_response('Invalid credentials')

        # Log in the user
        login(request, bettor)

        # Generate refresh token
        refresh = RefreshToken.for_user(bettor)

        # Return success response with user data and token
        return self.send_success_response({
            'user': BettorSerializer(bettor).data,
            'token': str(refresh.access_token),
        })


class SportView(APIView, CommonResponse):
    # Retrieve a list of sports
    def get(self, request):
        sports = Sport.objects.all()
        serializer = SportSerializer(sports, many=True)
        return Response(serializer.data)


class EventView(APIView, CommonResponse):
    # Retrieve a list of events
    def get(self, request):
        sport_key = request.query_params.get('sport_key', None)  # Optional filter by sport
        if sport_key:
            events = Event.objects.filter(sport_id=sport_key)
        else:
            events = Event.objects.all()
        serializer = EventSerializer(events, many=True)
        return Response(serializer.data)


