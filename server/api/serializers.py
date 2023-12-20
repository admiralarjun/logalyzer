from rest_framework import serializers
from django.contrib.auth.models import User

from .models import CrpfUnit, CrpfDevice, ThreatInfo, LogLines, Alerts, Playbook, Profile_pic


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'date_joined']


class CrpfUnitSerializer(serializers.ModelSerializer):
    class Meta:
        model = CrpfUnit
        fields = '__all__'

class CrpfDeviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = CrpfDevice
        fields = '__all__'

class ThreatInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ThreatInfo
        fields = '__all__'

class LogLinesSerializer(serializers.ModelSerializer):
    class Meta:
        model = LogLines
        fields = '__all__'


class AlertsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alerts
        fields = '__all__'


class PlaybookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Playbook
        fields = ['id', 'name', 'content', 'creation_time', 'status']
        read_only_fields = ['id', 'creation_time']

class ProfilePicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile_pic
        fields = '__all__'


class LogLineSerializer(serializers.ModelSerializer):
    class Meta:
        model = LogLines
        fields = '__all__'


class CsvUploadSerializer(serializers.Serializer):
    file = serializers.FileField()