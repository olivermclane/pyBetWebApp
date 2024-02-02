from django.urls import path

from . import views
from .views import LoginView, RegisterView, SportView, EventView, RefreshOddsView

## Register Routes for API
urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),  ## REGISTER ROUTE /bet/register
    path('login/', LoginView.as_view(), name='login'),  ## LOGIN ROUTE /bet/login
    path('sport/', SportView.as_view(), name='sports'),  ## SPORT ROUTE /bet/sport
    path('event/', EventView.as_view(), name='events'),  ## EVENT ROUTE /bet/event
    path('refresh/', RefreshOddsView.as_view(), name='refresh')  ## REFRESH ODDS ROUTE /bet/refresh

]
