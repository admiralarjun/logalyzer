# myapi/serializers.py
from rest_framework import serializers
from .models import LogLines

class LogLinesSerializer(serializers.ModelSerializer):
    class Meta:
        model = LogLines
        fields = '__all__'


