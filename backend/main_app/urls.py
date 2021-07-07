from django.urls import path
from main_app import views

urlpatterns = [
    path("search/", views.SearchDomain.as_view()),
    path("history/", views.History.as_view()),
]
