from rest_framework import serializers
from django.contrib.auth.models import User

from .models import CrpfUnit, CrpfDevice, ThreatInfo, LogLines, Alerts


class UserSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = User
        fields = ['id', 'username', 'password', 'email']

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