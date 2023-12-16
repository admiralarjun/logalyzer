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
from .serializers import UserSerializer, ThreatInfoSerializer, CrpfDeviceSerializer, CrpfUnitSerializer, \
    LogLinesSerializer, AlertsSerializer, PlaybookSerializer, LogLineSerializer

# CRPF Units Views
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
        return Response(unit, status=status.HTTP_200_OK)

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
    all_devices = list(CrpfDevice.objects.all().values())
    return Response(all_devices, status=status.HTTP_200_OK)

@api_view(['GET'])
def view_device_by_id(request, Id):
    device = list(CrpfDevice.objects.filter(id=Id).values())
    if device == []:
        return Response({"message": "Device Id not Found"}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(device, status=status.HTTP_200_OK)

@api_view(['POST'])
def create_crpf_device(request):
    serializer = CrpfDeviceSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
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
    all_users = list(User.objects.all().values())
    return Response(all_users, status=status.HTTP_200_OK)

@api_view(['GET'])
def view_user_by_id(request, Id):
    user = list(User.objects.filter(id=Id).values())
    if user == []:
        return Response({"message": "User Id not Found"}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(user, status=status.HTTP_200_OK)

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
    playbook = Playbook.objects.create()
    playbook.name = request.data['name']
    playbook.content = request.data['content']
    playbook.save()
    return Response({"message": "PlayBook Added Successfully"}, status=status.HTTP_201_CREATED)

@api_view(['GET'])
def view_all_playbooks(request):
    all_playbooks = list(Playbook.objects.all().values())
    return Response(all_playbooks, status=status.HTTP_200_OK)

@api_view(['GET'])
def view_playbook_by_id(request, Id):
    playbook = list(Playbook.objects.filter(id=Id).values())
    if playbook == []:
        return Response({"message": "Playbook Id not Found"}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(playbook, status=status.HTTP_200_OK)


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
    threat = list(ThreatInfo.objects.filter(id=Id).values())
    if threat == []:
        return Response({"message": "Threat Id not Found"}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(threat, status=status.HTTP_200_OK)


@api_view(['POST'])
def create_threat_info(request):
    serializer = ThreatInfoSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
    all_alerts = list(Alerts.objects.all().values())
    return Response(all_alerts, status=status.HTTP_200_OK)

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
    alert = list(Alerts.objects.filter(id=Id).values())
    if alert == []:
        return Response({"message": "Alert Id not Found"}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(alert, status=status.HTTP_200_OK)

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


# LogLine Views
@api_view(['POST'])
def save_log_line(request):
    access_key = request.data.get('access_key')
    line_of_text = request.data.get('log_line')
    crpf_device_name = request.data.get('crpf_device_name')
    line_of_text = request.data.get('line_of_text')
    try:
        crpf_device = CrpfDevice.objects.get(device_name=crpf_device_name)
    except CrpfDevice.DoesNotExist:
        return Response({'message': 'CrpfDevice not found'}, status=404)
    log_line = LogLines(content=line_of_text, crpf_device=crpf_device, crpf_unit=crpf_device.crpf_unit)
    threats = ThreatInfo.objects.all()
    x = False
    for threat in threats:
        pattern = threat.signature
        if re.search(pattern, line_of_text):
            log_line.threat = threat
            x = True
    log_line.save()
    if x:
        alert_instance = Alerts(
            log_line=log_line,
            status='Unresolved',
        )
        alert_instance.save()
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
def create_crpf_device(request):
    serializer = CrpfDeviceSerializer(data=request.data)
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
def upload_profile_pic(request):
    user_img = Profile_pic.objects.create()
    user_img.name = request.data['name']
    user_img.user_id = request.data['user_id']
    user_img.profile_pic = request.data['profile_pic']
    user_img.save()
    return Response({"message":"Uploaded Successful"})

@api_view(['GET'])
def get_profile_pic(request,Id):
    profile = list(Profile_pic.objects.filter(user_id=Id).values())
    if profile == []:
        return Response({"message": "User Id not Found"}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(profile, status=status.HTTP_200_OK)

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

