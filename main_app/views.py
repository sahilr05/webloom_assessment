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


class CreateAccount(APIView):
    def post(self, request):
        data = request.data

        # throws 409 conflict error if existing username detected
        if (data["username"],) in User.objects.values_list("username"):
            return Response(
                {"409": "Conflict", "duplicate error": "user already exists"},
                status=status.HTTP_409_CONFLICT,
            )

        AccountSerializer = UserSerializer(
            data={
                "username": data["username"],
                "email": data["email"],
                "password": data["password"],
            }
        )

        if AccountSerializer.is_valid():
            AccountSerializer.save()
            return Response(AccountSerializer.data, status=status.HTTP_201_CREATED)
        return Response(AccountSerializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CheckDomain(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        domain_name = request.GET["name"]
        domain_details = whois(domain_name)

        serializer = DomainSerializer(domain_details)
        return Response(serializer.data)
