from django.shortcuts import render
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Domain
from .serializers import DomainSerializer

from whois import whois

class CheckDomain(APIView):
    def post(self, request):
        domain_name = request.GET["name"]
        domain_details = whois(domain_name)

        serializer = DomainSerializer(domain_details)
        return Response(serializer.data)
