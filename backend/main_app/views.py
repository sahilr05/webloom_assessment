import subprocess

from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from whois import whois

from .serializers import DomainSerializer
from .serializers import UserSerializer


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


class SearchDomain(APIView):
    permission_classes = (IsAuthenticated,)

    @csrf_exempt
    def get(self, request):
        domain_name = request.GET["name"]
        domain_info = whois(domain_name)
        command = "whois {}".format(domain_name)
        # print("Command is : ", command)
        whois_output = subprocess.run(
            command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True
        )
        status = whois_output.returncode
        # print("Status is : ", status)
        org = domain_info["org"]
        country = domain_info["country"]
        serializer = DomainSerializer(
            data={
                "status": status,
                "org": org,
                "country": country,
                "domain_name": domain_name,
                "user": self.request.user.pk,
            }
        )

        if serializer.is_valid():
            serializer.save(user=self.request.user)
            return Response({"data": serializer.data})
        print(serializer.errors)
        return Response({"res": "400"})


class History(APIView):
    # permission_classes = (IsAuthenticated,)

    @csrf_exempt
    def get(self, request):
        user = User.objects.get(pk=self.request.user.pk)
        search_history = user.user_searches.all()
        serializer = DomainSerializer(search_history, many=True)
        return Response(serializer.data)
