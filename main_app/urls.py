from django.conf import settings
from django.conf.urls.static import static
from django.urls import include
from django.urls import path

from main_app import views

urlpatterns = [
    path("domain/", views.CheckDomain.as_view()),
]