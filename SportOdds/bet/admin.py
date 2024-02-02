# Import necessary modules
from .models import Bettor, Bet, Sport, Event
from django.contrib import admin
from django.forms import ModelForm, DecimalField, NumberInput


# Define a custom form for the Bettor model in the admin interface
class BettorAdminForm(ModelForm):
    # Meta class to specify model and fields for the form
    class Meta:
        model = Bettor
        fields = ['username', 'balance', 'user_id']  # Fields to include in the form

    # Customize the balance field with a DecimalField and NumberInput
    balance = DecimalField(label='Balance', widget=NumberInput(attrs={'min': 0}))


# Register the Bettor model with the custom form in the admin site
@admin.register(Bettor)
class BettorsAdmin(admin.ModelAdmin):
    form = BettorAdminForm  # Use the custom BettorAdminForm

    # Override the save_model method to handle balance updates
    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)

        if form.is_valid():
            new_balance = form.cleaned_data['balance']
            obj.balance = new_balance
            obj.save()


# Define admin classes for other models (Bet, Sport, Event)
class BetAdmin(admin.ModelAdmin):
    list_display = (
        'bet_id', 'odds', 'event', 'event_id', 'bet_amount', 'bet_date', 'bettor_id')


class SportAdmin(admin.ModelAdmin):
    list_display = ('sport_id', 'name', 'group', 'active')


class EventAdmin(admin.ModelAdmin):
    list_display = ('event_id', 'sport_id', 'nameA', 'nameB', 'date', 'oddsA', 'oddsB')


# Register the remaining models with their respective admin classes
admin.site.register(Bet, BetAdmin)
admin.site.register(Sport, SportAdmin)
admin.site.register(Event, EventAdmin)
