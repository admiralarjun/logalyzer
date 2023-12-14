from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status
import re
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
    return Response(all_units,status=status.HTTP_200_OK)


@api_view(['GET'])
def view_unit_by_id(request, Id):
    unit = list(CrpfUnit.objects.filter(id=Id).values())
    if unit == []:
        return Response({"message": "Unit Id not Found"}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(unit,status=status.HTTP_200_OK)


@api_view(['GET'])
def view_all_devices(request):
    all_devices = list(CrpfDevice.objects.all().values())
    return Response(all_devices,status=status.HTTP_200_OK)

@api_view(['GET'])
def view_device_by_id(request,Id):
    device = list(CrpfDevice.objects.filter(id=Id).values())
    if device == []:
        return Response({"message": "Device Id not Found"}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(device,status=status.HTTP_200_OK)

@api_view(['GET'])
def view_all_users(request):
    all_users = list(User.objects.all().values())
    return Response(all_users,status=status.HTTP_200_OK)

@api_view(['GET'])
def view_user_by_id(request,Id):
    user = list(User.objects.filter(id=Id).values())
    if user == []:
        return Response({"message":"User Id not Found"},status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(user,status=status.HTTP_200_OK)

@api_view(['POST'])
def add_playbook(request):
    playbook = Playbook.objects.create()
    playbook.name = request.data['name']
    playbook.content = request.data['content']
    playbook.save()
    return Response({"message":"PlayBook Added Successfully"},status=status.HTTP_201_CREATED)
    # need to write full code for admin and ass well as users
@api_view(['GET'])
def view_all_playbooks(request):
    all_playbooks = list(Playbook.objects.all().values())
    return Response(all_playbooks, status=status.HTTP_200_OK)

@api_view(['GET'])
def view_playbook_by_id(request,Id):
    playbook = list(Playbook.objects.filter(id=Id).values())
    if playbook == []:
        return Response({"message":"Playbook Id not Found"},status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(playbook,status=status.HTTP_200_OK)

@api_view(['GET'])
def view_all_threats_info(request):
    all_threats = list(ThreatInfo.objects.all().values())
    return Response(all_threats, status=status.HTTP_200_OK)

@api_view(['GET'])
def view_threat_by_id(request,Id):
    threat = list(ThreatInfo.objects.filter(id=Id).values())
    if threat == []:
        return Response({"message":"Threat Id not Found"},status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(threat,status=status.HTTP_200_OK)

@api_view(['GET'])
def view_all_alerts(request):
    all_alerts = list(Alerts.objects.all().values())
    return Response(all_alerts, status=status.HTTP_200_OK)
@api_view(['GET'])
def view_alert_by_id(request,Id):
    alert = list(Alerts.objects.filter(id=Id).values())
    if alert == []:
        return Response({"message":"User Id not Found"},status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(alert,status=status.HTTP_200_OK)

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