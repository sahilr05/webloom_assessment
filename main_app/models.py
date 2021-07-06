from django.contrib.auth.models import User
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone
from rest_framework.authtoken.models import Token


@receiver(post_save, sender=User)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


class Domain(models.Model):
    domain_name = models.CharField(max_length=50)
    org = models.CharField(max_length=50)
    country = models.CharField(max_length=50)
    status = models.SmallIntegerField()
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="user_searches"
    )
    date_created = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.domain_name
