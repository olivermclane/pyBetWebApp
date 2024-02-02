import requests
import os
from dotenv import load_dotenv

from .models import Sport, Event

load_dotenv()

"""https://the-odds-api.com is a free API that allows you to to query across several different Sports books. They 
have several different subscriptions but for their API but I used the free licence which allows around 500 request 
per month."""


class APIClient:
    """Handles communication with the Odds API."""

    def __init__(self):
        self.api_key = os.getenv("ODDS_API_KEY")  # API_KEY
        self.base_url = "https://api.the-odds-api.com/v4"  # Base endpoint URL

    def get_sports_and_events(self):
        """Fetches a list of available sports."""
        endpoint = "/sports"  # Endpoint for getting sports
        params = {"api_key": self.api_key}  # Parameters for endpoint ( API-key)
        response = requests.get(f"{self.base_url}{endpoint}", params=params)  # Sending a get request and caching
        # repsonse
        response.raise_for_status()  # Raise an exception for error status codes (important we don't handle as they
        # rate limit API)
        sports_data = response.json()  # Get Response's json containing sports data
        for sport in sports_data:
            Sport.objects.get_or_create(sport_id=sport['key'],
                                        defaults={'sport_id': sport['key'],
                                                  'name': sport['title'],
                                                  'group': sport['group'],
                                                  'active': sport['active']})
            seen_event_ids = set()
            event_data = self.get_odds(sport['key'])
            for event in event_data:
                if event["id"] not in seen_event_ids:  # Check for duplicates events
                    seen_event_ids.add(event["id"])  # Grabbing the event id

                for bookmaker in event["bookmakers"]:
                    for market in bookmaker["markets"]:
                        if event['home_team'] is not None and event['away_team'] is not None:
                            event_obj, created = Event.objects.get_or_create(event_id=event['id'],
                                                                             defaults={'event_id': event['id'],
                                                                                       'sport_id': Sport.objects.get(
                                                                                           sport_id=event['sport_key']
                                                                                       ),
                                                                                       'nameA': event['home_team'],
                                                                                       'nameB': event['away_team'],
                                                                                       'date': event['commence_time'],
                                                                                       'oddsA': market['outcomes'][1][
                                                                                           'price'],
                                                                                       'oddsB': market['outcomes'][0][
                                                                                           'price'],
                                                                                       })
                            if not created:  # Update odds for existing event
                                event_obj.oddsA = market['outcomes'][1]['price']
                                event_obj.oddsB = market['outcomes'][0]['price']
                                event_obj.save()

    def get_odds(self, sport_key):
        """Fetches odds for a specific sport."""
        endpoint = "/sports/" + sport_key + "/odds/"  # Endpoint for getting odds and events
        params = {"api_key": self.api_key, "sport_key": sport_key, "regions": "us,us2"}  # Parameters for endpoint (
        # API-key, and sport)
        response = requests.get(f"{self.base_url}{endpoint}", params=params)  # Sending a get request and caching
        # repsonse
        response.raise_for_status()  # Raise an exception for error status codes (important we don't handle as they
        # rate limit API)
        odds_data = response.json()  # Get Response's json containing odds data

        return odds_data

    def get_game_results(self, event_id):
        """Fetches the winner and status for a specific event."""
        endpoint = "/v4/sports/{sport}/scores/"  # Updated endpoint for scores
        params = {"apiKey": self.api_key, "eventIds": event_id}  # Required parameters

        response = requests.get(f"{self.base_url}{endpoint}", params=params)
        response.raise_for_status()  # Raise an exception for error status codes

        data = response.json()

        if data["completed"]:
            winner_score = max([int(team["score"]) for team in data["scores"]])  # Convert scores to integers
            winner_name = [team["name"] for team in data["scores"] if int(team["score"]) == winner_score][0]
            status = "Completed"
        else:
            winner_name = None
            winner_score = None
            status = "In Progress"

        return {
            "status": status,
            "winner": winner_name,
        }
