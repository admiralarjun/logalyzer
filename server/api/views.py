from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

from .models import *


@api_view(['GET'])
def view_all_units(request):
    all_units = list(CrpfUnit.objects.all().values())
    return Response(all_units)


@api_view(['GET'])
def view_unit_by_id(request, Id):
    unit = list(CrpfUnit.objects.filter(id=Id).values())
    if unit == []:
        return Response({"message": "Unit Id not Found"}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(unit)


@api_view(['GET'])
def view_all_devices(request):
    all_devices = list(CrpfDevice.objects.all().values())
    return Response(all_devices)

@api_view(['GET'])
def view_device_by_id(request,Id):
    device = list(CrpfDevice.objects.filter(id=Id).values())
    if device == []:
        return Response({"message": "Device Id not Found"}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(device)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def logout(request):
    # Delete the user's token
    request.auth.delete()

    return Response("Successfully logged out", status=status.HTTP_200_OK)
