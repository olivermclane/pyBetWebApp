from rest_framework import serializers # Import the serializers module from Django REST Framework

from .models import Bettor, Bet, Sport, Event  # Import models to be serialized

# Define serializers to convert model instances to JSON and vice versa
# THIS CLASS (BetSerializer) IS NOT USED.
class BetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bet
        fields = (
            'bet_id', 'odds', 'event', 'event_id', 'bet_amount', 'bet_date', 'bettor_id')

class BettorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bettor
        fields = ('user_id', 'username', 'password', 'balance')


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('event_id', 'sport_id', 'nameA','nameB', 'date', 'oddsA', 'oddsB')


class SportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sport
        fields = ('sport_id', 'name', 'group', 'active')