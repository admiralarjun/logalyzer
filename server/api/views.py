from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
<<<<<<< HEAD
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status
import re
=======
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

>>>>>>> b5e8511a21a3484f6b1d13451c9f5329ba9b75d4
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
def save_log_line(request):
    crpf_device_name = request.data.get('crpf_device_name')
    line_of_text = request.data.get('line_of_text')
    try:
        crpf_device = CrpfDevice.objects.get(device_name=crpf_device_name)
    except CrpfDevice.DoesNotExist:
        return Response({'message': 'CrpfDevice not found'}, status=404)
    log_line = LogLines(content=line_of_text, crpf_device=crpf_device, crpf_unit=crpf_device.crpf_unit)
    threats = ThreatInfo.objects.all()
    x=False
    for threat in threats:
        pattern = threat.signature
        if re.search(pattern, line_of_text):
            log_line.threat=threat
            x=True
    log_line.save()
    if x:
        alert_instance = Alerts(
            log_line=log_line,
            status='Unresolved',
        )
        alert_instance.save()
    return Response({'message': 'Log line saved successfully'})

<<<<<<< HEAD


@api_view(['POST'])
# @permission_classes([IsAdminUser])
def set_assignee(request):

    alert_id = request.data.get('alert_id')
    username = request.data.get('username')
    try:
        alert_instance = Alerts.objects.get(id=alert_id)
    except Alerts.DoesNotExist:
        return Response({'message': 'Alerts instance not found'}, status=404)
    try:
        assignee_user = User.objects.get(username=username)
    except User.DoesNotExist:
        return Response({'message': 'User not found'}, status=404)
    alert_instance.assignee = assignee_user
    alert_instance.save()

    return Response({'message': 'Assignee set successfully'})
=======
>>>>>>> b5e8511a21a3484f6b1d13451c9f5329ba9b75d4
