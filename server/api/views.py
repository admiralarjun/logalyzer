import hashlib
import secrets
from datetime import timedelta
from django.http import JsonResponse
import requests

from dateutil.relativedelta import relativedelta
from django.conf import settings
from django.core.mail import send_mail, EmailMessage
from django.db.models import Count
from django.db.models.functions import TruncMonth
from django.http import JsonResponse
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from django.db.models import F
from django.core.mail import send_mail
import calendar
import re
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

from .models import *
from .serializers import UserSerializer, ThreatInfoSerializer, CrpfDeviceSerializer, CrpfUnitSerializer, \
    LogLinesSerializer, AlertsSerializer, PlaybookSerializer, LogLineSerializer, ProfilePicSerializer



# CRPF Units Views
@api_view(['GET'])
def view_all_units(request):
    all_units = CrpfUnit.objects.all()
    serializer = CrpfUnitSerializer(all_units, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def view_unit_by_id(request, Id):
    unit = get_object_or_404(CrpfUnit, id=Id)
    serializer = CrpfUnitSerializer(unit)
    return Response(serializer.data, status=status.HTTP_200_OK)
@api_view(['POST'])
def create_crpf_unit(request):
    serializer = CrpfUnitSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def update_crpf_unit(request, Id):
    crpf_unit = get_object_or_404(CrpfUnit, id=Id)
    serializer = CrpfUnitSerializer(crpf_unit, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_crpf_unit(request, Id):
    crpf_unit = get_object_or_404(CrpfUnit, id=Id)
    crpf_unit.delete()
    return Response({'message': 'CRPF Unit deleted successfully'}, status=status.HTTP_204_NO_CONTENT)


# CRPF Devices Views
@api_view(['GET'])
def view_all_devices(request):
    all_devices = CrpfDevice.objects.all()
    serializer = CrpfDeviceSerializer(all_devices, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def view_device_by_id(request, Id):
    device = get_object_or_404(CrpfDevice, id=Id)
    serializer = CrpfDeviceSerializer(device)
    return Response(serializer.data, status=status.HTTP_200_OK)
@api_view(['POST'])
def create_crpf_device(request):
    serializer = CrpfDeviceSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        crpf_device_instance = CrpfDevice.objects.get(id=serializer.data['id'])
        print("sgdhjs")
        access_key = secrets.token_hex(8)
        agent_content = render_to_string('agent.py', {'access_key': access_key})
        code = agent_content
        hashed_access_key = hashlib.md5(access_key.encode()).hexdigest()
        Crpf_Device_Agent_Repo.objects.create(crpf_device_id=crpf_device_instance, access_key=hashed_access_key, code=code)
        tosend = "Here is the code"
        subject = "Created A new device"
        from_email = 'sih.eh.central@gmail.com'
        to_email = [crpf_device_instance.crpf_unit.mail_address]

        email = EmailMessage(subject, strip_tags(tosend), from_email, to_email)
        email.attach('agent.py', agent_content, 'text/plain')
        email.send()
        send_mail(subject, tosend, 'sunnysnivas@gmail.com', [email], fail_silently=False)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET'])
def get_devices_by_unit(request, crpf_unit_id):
    try:
        devices = CrpfDevice.objects.filter(crpf_unit_id=crpf_unit_id)
        serializer = CrpfDeviceSerializer(devices, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except CrpfDevice.DoesNotExist:
        return Response({"message": "CRPF Unit ID not found"}, status=status.HTTP_404_NOT_FOUND)
@api_view(['POST'])
def update_crpf_device(request, Id):
    crpf_device = get_object_or_404(CrpfDevice, id=Id)
    serializer = CrpfDeviceSerializer(crpf_device, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_crpf_device(request, Id):
    crpf_device = get_object_or_404(CrpfDevice, id=Id)
    crpf_device.delete()
    return Response({'message': 'CRPF Device deleted successfully'}, status=status.HTTP_204_NO_CONTENT)


# Users Views
@api_view(['GET'])
def view_all_users(request):
    all_users = User.objects.all()

    users_data = []
    for user in all_users:
        user_data = {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'first_name':user.first_name,
            'last_name':user.last_name,
            'status':user.is_active,
            'last_login':user.last_login
        }

        try:
            profile_pic = Profile_pic.objects.get(user_id=user.id)
            if(profile_pic!=[]):
                user_data['profile_pic'] = profile_pic.profile_pic.url

        except Profile_pic.DoesNotExist:
            user_data['profile_pic'] = None

        users_data.append(user_data)

    return Response(users_data, status=status.HTTP_200_OK)


@api_view(['GET'])
def view_user_by_id(request, Id):
    try:
        user = User.objects.get(id=Id)
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response({"message": "User Id not Found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def signup(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        user = User.objects.get(username=request.data['username'])
        user.set_password(request.data['password'])
        user.save()
        token = Token.objects.create(user=user)
        return Response({'token': token.key, 'user': serializer.data})
    return Response(serializer.errors, status=status.HTTP_200_OK)

@api_view(['POST'])
def update_user(request, Id):
    user = get_object_or_404(User, id=Id)
    serializer = UserSerializer(user, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_user(request, Id):
    user = get_object_or_404(User, id=Id)
    user.delete()
    return Response({'message': 'User deleted successfully'}, status=status.HTTP_204_NO_CONTENT)


# Playbook Views
@api_view(['POST'])
def add_playbook(request):
    serializer = PlaybookSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def view_all_playbooks(request):
    all_playbooks = Playbook.objects.all()
    serializer = PlaybookSerializer(all_playbooks, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def view_playbook_by_id(request, Id):
    try:
        playbook = Playbook.objects.get(id=Id)
        serializer = PlaybookSerializer(playbook)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Playbook.DoesNotExist:
        return Response({"message": "Playbook Id not Found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def update_playbook(request, Id):
    playbook = get_object_or_404(Playbook, id=Id)
    serializer = PlaybookSerializer(playbook, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def delete_playbook(request, Id):
    playbook = get_object_or_404(Playbook, id=Id)
    playbook.delete()
    return Response({'message': 'Playbook deleted successfully'}, status=status.HTTP_204_NO_CONTENT)


# Threats Views
@api_view(['GET'])
def view_all_threats_info(request):
    all_threats = ThreatInfo.objects.all()
    serializer = ThreatInfoSerializer(all_threats, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def view_threat_by_id(request, Id):
    threat = get_object_or_404(ThreatInfo, id=Id)
    serializer = ThreatInfoSerializer(threat)
    return Response(serializer.data, status=status.HTTP_200_OK)




@api_view(['POST'])
def update_threat_info(request, Id):
    threat_info = get_object_or_404(ThreatInfo, id=Id)
    serializer = ThreatInfoSerializer(threat_info, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def delete_threat_info(request, Id):
    threat_info = get_object_or_404(ThreatInfo, id=Id)
    threat_info.delete()
    return Response({"message": "ThreatInfo deleted successfully"}, status=status.HTTP_204_NO_CONTENT)


# Alerts Views
@api_view(['GET'])
def view_all_alerts(request):
    all_alerts = Alerts.objects.all()
    serializer = AlertsSerializer(all_alerts, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_alerts_by_username(request, username):
    try:
        user = User.objects.get(username=username)
        alerts = Alerts.objects.filter(assignee=user)
        serializer = AlertsSerializer(alerts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response({"message": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    except Alerts.DoesNotExist:
        return Response({"message": "Alerts not found for the specified user"}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def view_alert_by_id(request, Id):
    alert = get_object_or_404(Alerts, id=Id)
    serializer = AlertsSerializer(alert)
    return Response(serializer.data, status=status.HTTP_200_OK)
@api_view(['GET'])
def get_unassigned_alerts(request):
    try:
        unassigned_alerts = Alerts.objects.filter(assignee=None)
        serializer = AlertsSerializer(unassigned_alerts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Alerts.DoesNotExist:
        return Response({"message": "No unassigned alerts found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def get_unresolved_alerts(request):
    try:
        unresolved_alerts = Alerts.objects.filter(status='Unresolved')
        serializer = AlertsSerializer(unresolved_alerts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Alerts.DoesNotExist:
        return Response({"message": "No unresolved alerts found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def get_resolved_alerts(request):
    try:
        resolved_alerts = Alerts.objects.filter(status='Resolved')
        serializer = AlertsSerializer(resolved_alerts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Alerts.DoesNotExist:
        return Response({"message": "No resolved alerts found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def get_ignored_alerts(request):
    try:
        ignored_alerts = Alerts.objects.filter(status='Ignored')
        serializer = AlertsSerializer(ignored_alerts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Alerts.DoesNotExist:
        return Response({"message": "No ignored alerts found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def get_alerts_by_crpf_device(request, crpf_device_id):
    try:
        alerts_by_device = Alerts.objects.filter(log_line__crpf_device_id=crpf_device_id)
        serializer = AlertsSerializer(alerts_by_device, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Alerts.DoesNotExist:
        return Response({"message": "No alerts found for the specified CRPF device"}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def get_alerts_by_crpf_unit(request, crpf_unit_id):
    try:
        alerts_by_unit = Alerts.objects.filter(log_line__crpf_unit_id=crpf_unit_id)
        serializer = AlertsSerializer(alerts_by_unit, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Alerts.DoesNotExist:
        return Response({"message": "No alerts found for the specified CRPF unit"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def update_alert(request, Id):
    alert = get_object_or_404(Alerts, id=Id)
    serializer = AlertsSerializer(alert, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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

@api_view(['DELETE'])
def delete_alert(request, Id):
    alert = get_object_or_404(Alerts, id=Id)
    alert.delete()
    return Response({"message": "Alert deleted successfully"}, status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def view_logline_by_id(request, Id):
    logline = list(LogLines.objects.filter(id=Id).values())
    if logline == []:
        return Response({"message": "Log Id not Found"}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(logline, status=status.HTTP_200_OK)


# LogLine Views
@api_view(['POST'])
def save_log_line(request):
    access_key = request.data.get('access_key')
    line_of_text = request.data.get('log_line')
    access_key= hashlib.md5(access_key.encode()).hexdigest()
    try:
        crpf_device_agent_repo = Crpf_Device_Agent_Repo.objects.get(access_key=access_key)
    except Crpf_Device_Agent_Repo.DoesNotExist:
        return Response({'message': 'Crpf_Device_Agent_Repo not found for the given access key'}, status=404)

    process_log_line(line_of_text, crpf_device_agent_repo)

    return Response({'message': 'Log line saved successfully'}, status=status.HTTP_201_CREATED)

@api_view(['GET'])
def get_log_lines_by_device(request, crpf_device_id):
    try:
        log_lines = LogLines.objects.filter(crpf_device_id=crpf_device_id)
        serializer = LogLinesSerializer(log_lines, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except LogLines.DoesNotExist:
        return Response({"message": "Log lines not found for the specified device"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def get_log_lines_by_unit(request, crpf_unit_id):
    try:
        devices = CrpfDevice.objects.filter(crpf_unit_id=crpf_unit_id)
        device_ids = devices.values_list('id', flat=True)
        log_lines = LogLines.objects.filter(crpf_device_id__in=device_ids)
        serializer = LogLinesSerializer(log_lines, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except CrpfDevice.DoesNotExist:
        return Response({"message": "CRPF Unit ID not found"}, status=status.HTTP_404_NOT_FOUND)
    except LogLines.DoesNotExist:
        return Response({"message": "Log lines not found for the specified unit"}, status=status.HTTP_404_NOT_FOUND)
@api_view(['POST'])
def update_log_line(request, Id):
    log_line = get_object_or_404(LogLines, id=Id)
    serializer = LogLineSerializer(log_line, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def delete_log_line(request, Id):
    log_line = get_object_or_404(LogLines, id=Id)
    log_line.delete()
    return Response({"message": "LogLine deleted successfully"}, status=status.HTTP_204_NO_CONTENT)




# Authentication

@api_view(['POST'])
def signup(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        user = User.objects.get(username=request.data['username'])
        user.set_password(request.data['password'])
        user.save()
        token = Token.objects.create(user=user)
        return Response({'token': token.key, 'user': serializer.data})
    return Response(serializer.errors, status=status.HTTP_200_OK)

@api_view(['POST'])
def login(request):
    user = get_object_or_404(User, username=request.data['username'])
    if not user.check_password(request.data['password']):
        return Response("missing user", status=status.HTTP_404_NOT_FOUND)
    token, created = Token.objects.get_or_create(user=user)
    serializer = UserSerializer(user)
    return Response({'token': token.key, 'user': serializer.data})

@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def test_token(request):
    return Response("passed!")


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def logout(request):
    # Delete the user's token
    request.auth.delete()
    return Response("Successfully logged out", status=status.HTTP_200_OK)


@api_view(['POST'])
def create_crpf_unit(request):
    serializer = CrpfUnitSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def create_threat_info(request):
    serializer = ThreatInfoSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def create_threat_info_process(request):
    serializer = ThreatInfoSerializer(data=request.data)
    if serializer.is_valid():
        threat_instance = serializer.save()
        process_threat_log_lines(threat_instance)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def upload_profile_pic(request):
    user_img = Profile_pic.objects.create()
    user_img.name = request.data['name']
    user_img.user_id = request.data['user_id']
    user_img.profile_pic = request.data['profile_pic']
    user_img.save()
    return Response({"message":"Uploaded Successful"})

@api_view(['GET'])
def get_profile_pic(request, Id):
    try:
        profile_pic = Profile_pic.objects.get(user_id=Id)
        serializer = ProfilePicSerializer(profile_pic)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Profile_pic.DoesNotExist:
        return Response({"message": "User Id not Found"})

@api_view(['GET'])
def get_devices_by_unit(request, crpf_unit_id):
    try:
        devices = CrpfDevice.objects.filter(crpf_unit_id=crpf_unit_id)
        serializer = CrpfDeviceSerializer(devices, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except CrpfDevice.DoesNotExist:
        return Response({"message": "CRPF Unit ID not found"}, status=status.HTTP_404_NOT_FOUND)



@api_view(['GET'])
def get_log_lines_by_device(request, crpf_device_id):
    try:
        log_lines = LogLines.objects.filter(crpf_device_id=crpf_device_id)
        serializer = LogLinesSerializer(log_lines, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except LogLines.DoesNotExist:
        return Response({"message": "Log lines not found for the specified device"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def get_log_lines_by_unit(request, crpf_unit_id):
    try:
        devices = CrpfDevice.objects.filter(crpf_unit_id=crpf_unit_id)
        device_ids = devices.values_list('id', flat=True)
        log_lines = LogLines.objects.filter(crpf_device_id__in=device_ids)
        serializer = LogLinesSerializer(log_lines, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except CrpfDevice.DoesNotExist:
        return Response({"message": "CRPF Unit ID not found"}, status=status.HTTP_404_NOT_FOUND)
    except LogLines.DoesNotExist:
        return Response({"message": "Log lines not found for the specified unit"}, status=status.HTTP_404_NOT_FOUND)



@api_view(['GET'])
def get_alerts_by_username(request, username):
    try:
        user = User.objects.get(username=username)
        alerts = Alerts.objects.filter(assignee=user)
        serializer = AlertsSerializer(alerts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response({"message": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    except Alerts.DoesNotExist:
        return Response({"message": "Alerts not found for the specified user"}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def get_unassigned_alerts(request):
    try:
        unassigned_alerts = Alerts.objects.filter(assignee=None)
        serializer = AlertsSerializer(unassigned_alerts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Alerts.DoesNotExist:
        return Response({"message": "No unassigned alerts found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def get_unresolved_alerts(request):
    try:
        unresolved_alerts = Alerts.objects.filter(status='Unresolved')
        serializer = AlertsSerializer(unresolved_alerts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Alerts.DoesNotExist:
        return Response({"message": "No unresolved alerts found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def get_resolved_alerts(request):
    try:
        resolved_alerts = Alerts.objects.filter(status='Resolved')
        serializer = AlertsSerializer(resolved_alerts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Alerts.DoesNotExist:
        return Response({"message": "No resolved alerts found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def get_ignored_alerts(request):
    try:
        ignored_alerts = Alerts.objects.filter(status='Ignored')
        serializer = AlertsSerializer(ignored_alerts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Alerts.DoesNotExist:
        return Response({"message": "No ignored alerts found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def get_alerts_by_crpf_device(request, crpf_device_id):
    try:
        alerts_by_device = Alerts.objects.filter(log_line__crpf_device_id=crpf_device_id)
        serializer = AlertsSerializer(alerts_by_device, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Alerts.DoesNotExist:
        return Response({"message": "No alerts found for the specified CRPF device"}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def get_alerts_by_crpf_unit(request, crpf_unit_id):
    try:
        alerts_by_unit = Alerts.objects.filter(log_line__crpf_unit_id=crpf_unit_id)
        serializer = AlertsSerializer(alerts_by_unit, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Alerts.DoesNotExist:
        return Response({"message": "No alerts found for the specified CRPF unit"}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def get_full_alert_details(request):
    alert_details = Alerts.objects.all().select_related(
        'log_line__crpf_unit',  # Select related CrpfUnit for LogLines
        'log_line__crpf_device',  # Select related CrpfDevice for LogLines
        'log_line__threat',  # Select related ThreatInfo for LogLines
        'assignee',  # Select related User for Assignee
        'assignee__profile_pic',  # Select related Profile_pic for User
    ).annotate(
        crpf_unit_name=F('log_line__crpf_unit__name'),
        crpf_unit_id =F('log_line__crpf_unit__id'),
        crpf_device_name=F('log_line__crpf_device__device_name'),
        crpf_device_id=F('log_line__crpf_device__id'),
        threat_signature_name=F('log_line__threat__name'),
        threat_signature_id=F('log_line__threat__id'),
        user_profile_pic=F('assignee__profile_pic__profile_pic'),
    ).values(
        'id', 'crpf_unit_name','crpf_unit_id', 'crpf_device_name','crpf_device_id', 'threat_signature_name','threat_signature_id','log_line',
        'status', 'assignee__first_name','assignee__last_name', 'user_profile_pic', 'assignee__id',
        'creation_time', 'update_time'
    )

    alert_details_list = list(alert_details)
    return Response(alert_details_list, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_alerts_stats_by_crpf_unit(request, crpf_unit_id):
    try:
        today = timezone.now().date()
        thirteen_months_ago = today - timedelta(days=365)

        stats = []

        for i in range(13):
            if i!=0:
                start_date = thirteen_months_ago + timedelta(days=i*30)
                _, last_day_of_month = calendar.monthrange(start_date.year, start_date.month)
                end_date = start_date.replace(day=last_day_of_month)

                alerts_by_unit = Alerts.objects.filter(
                    log_line__crpf_unit_id=crpf_unit_id,
                    creation_time__gte=start_date,
                    creation_time__lt=end_date + timedelta(days=1)  # Adding one day to include the whole last day
                )

                resolved_alerts = alerts_by_unit.filter(status='Resolved')

                stats.append({
                    'month': start_date.strftime('%B'),
                    'year': start_date.year,
                    'total_alerts': alerts_by_unit.count(),
                    'resolved_alerts': resolved_alerts.count()
                })

        return Response({
            "message": "Alerts statistics fetched successfully",
            "data": stats
        }, status=status.HTTP_200_OK)
    except Alerts.DoesNotExist:
        return Response({
            "message": "No alerts found for the specified CRPF unit",
            "data": []
        }, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def get_alerts_stats_all_units(request):
    try:
        today = timezone.now().date()
        twelve_months_ago = today - timedelta(days=365)

        stats = []

        for i in range(13):
            if i!=0:
                start_date = twelve_months_ago + timedelta(days=i*30)
                end_date = start_date + timedelta(days=30)

                alerts_all_units = Alerts.objects.filter(
                    creation_time__gte=start_date,
                    creation_time__lt=end_date + timedelta(days=1)  # Adding one day to include the whole last day
                )

                resolved_alerts_all_units = alerts_all_units.filter(status='Resolved')

                stats.append({
                    'month': start_date.strftime('%B'),
                    'year': start_date.year,
                    'total_alerts': alerts_all_units.count(),
                    'resolved_alerts': resolved_alerts_all_units.count()
                })

        return Response({
            "message": "Combined alerts statistics fetched successfully",
            "data": stats
        }, status=status.HTTP_200_OK)
    except Alerts.DoesNotExist:
        return Response({
            "message": "No alerts found for any CRPF unit",
            "data": []
        }, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def send_mail_to_someone(request):
    send_mail(
            'Devices Addition Status',
              'haaa',
            'sih.eh.central@gmail.com',
             ['venkatasairamreddy0404@gmail.com'],
            fail_silently=False,
        )
    return Response("Sent Successful")




# Utils

def process_log_line(line_of_text, crpf_device_agent_repo):
    log_line = LogLines(
        content=line_of_text,
        threat=None,  # You might want to set the threat based on your logic
        crpf_unit=crpf_device_agent_repo.crpf_device_id.crpf_unit,
        crpf_device=crpf_device_agent_repo.crpf_device_id,
    )

    threats = ThreatInfo.objects.all()
    threat_found = False

    for threat in threats:
        pattern = threat.signature
        if re.search(pattern, line_of_text):
            log_line.threat = threat
            threat_found = True

    log_line.save()

    if threat_found:
        alert_instance = Alerts(
            log_line=log_line,
            status='Unresolved',
        )
        alert_instance.save()


def process_threat_log_lines(threat):
    pattern=threat.signature
    all_log_lines = LogLines.objects.all()
    for log_line in all_log_lines:
        print("hiiii")
        if re.search(threat.signature, log_line.content):
            log_line.threat=threat
            alert_instance = Alerts(
                log_line=log_line,
                status='Unresolved',
            )
            alert_instance.save()

@api_view(['GET'])
def api_request_view(request):
    # Replace 'https://api.example.com' with the actual API endpoint you want to call
    api_url = 'https://api.example.com'
    url = "http://localhost:8000/api/profile/3gi"

    try:
        # Make a GET request to the API
        post_data = {'key1': 'value1', 'key2': 'value2'}

        # Make a POST request to the API
        # response = requests.post(api_url, data=post_data)
        response = requests.get(url)
        # Check if the request was successful (status code 200)
        if response.status_code == 200:
            # If successful, you can handle the API response here
            api_data = response.json()
            return JsonResponse({'success': True, 'data': api_data})
        else:
            # If not successful, you can handle the error here
            return JsonResponse(
                {'success': False, 'error': f'API request failed with status code {response.status_code}'})
    except Exception as e:
        # Handle exceptions (e.g., network issues, timeouts, etc.)
        return JsonResponse({'success': False, 'error': f'Error: {str(e)}'})