from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Domain


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["email", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User(email=validated_data["email"], username=validated_data["username"])
        user.set_password(validated_data["password"])
        user.save()
        return user


class DomainSerializer(serializers.ModelSerializer):
    class Meta:
        model = Domain
        fields = ("domain_name", "org", "country", "user", "status")
