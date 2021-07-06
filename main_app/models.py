from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from rest_framework.authtoken.models import Token


class Domain(models.Model):
    domain_name = models.CharField(max_length=50)
    org = models.CharField(max_length=50)
    country = models.CharField(max_length=50)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_searches")
    date_created = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.domain_name