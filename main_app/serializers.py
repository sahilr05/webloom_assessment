from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Domain

class DomainSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()

    def get_name(self, obj):
        return obj.domain_name[1]

    class Meta:
        model = Domain
        fields = ('name', 'org', 'country')