from django.db import models
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import AbstractUser

# Models for the betting application

class Sport(models.Model):
    """
    Sport model to represent different sports.
    """

    # Primary key field for unique sport identification
    sport_id = models.CharField(primary_key=True, max_length=100)

    # Information about the sport
    name = models.CharField('Sport Name', max_length=100)
    group = models.CharField('Sport Group', max_length=100)  # Categorize sports
    active = models.BooleanField('Active', max_length=100)  # Track sport availability

    # String representation for displaying sport information
    def __str__(self):
        return self.name


class Event(models.Model):
    """
    Event model to represent specific sporting events.
    """

    # Primary key field for unique event identification
    event_id = models.CharField(primary_key=True, max_length=100)

    # Foreign key to link the event to a specific sport
    sport_id = models.ForeignKey(Sport, on_delete=models.CASCADE)

    # Event details
    nameA = models.CharField('Event name A', max_length=100, null=True, blank=True)
    nameB = models.CharField('Event name B', max_length=100, null=True, blank=True)
    date = models.DateTimeField('Date')
    oddsA = models.IntegerField('Odds for team A')
    oddsB = models.IntegerField('Odds for team B')

    # String representation for displaying event information
    def __str__(self):
        return f"{self.date} - {self.nameA} vs {self.nameB} - {self.oddsA} - {self.oddsB}"


class Bettor(AbstractUser):
    """
    Bettor model to represent users who place bets.
    """

    # Primary key field for unique user identification
    user_id = models.AutoField(primary_key=True)

    # Additional user information
    username = models.CharField('username', max_length=100, unique=True)
    password = models.CharField('password', max_length=100)  # Stored hashed
    balance = models.IntegerField('Balance', default=0)  # User's betting balance

    # String representation for displaying bettor information
    def __str__(self):
        return f'{self.username} - {self.balance}'

    # Method to hash and set the user's password
    def set_password(self, raw_password):
        self.password = make_password(raw_password)
        self.save(update_fields=['password'])

    # Override the save method to hash the password before saving
    def save(self, *args, **kwargs):
        self.password = make_password(self.password)
        super().save(*args, **kwargs)

    # Method to update the bettor's balance
    def update_balance(self, amount):
        self.balance += amount

# THIS IS UNUSED
class Bet(models.Model):
    """
    Bet model to represent individual bets placed by bettors.
    """

    # Primary key field for unique bet identification
    bet_id = models.AutoField("Bet ID", primary_key=True)

    # Bet details
    odds = models.IntegerField('Odds')
    event = models.CharField('Event', max_length=100)
    event_id = models.ForeignKey(Event, on_delete=models.CASCADE)  # Link to the associated event
    bet_amount = models.IntegerField('Bid Amount')
    bet_date = models.DateField('Bid Date')
    bettor_id = models.ForeignKey(Bettor, on_delete=models.CASCADE)  # Link to the bettor
    bet_on_going = models.BooleanField('Bet ongoing', default=True)  # Indicate bet status

    # String representation for displaying bet information
    def __str__(self):
        return f"{self.event} - {self.odds}: ${self.bet_amount}"