# myapi/views.py
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from .models import LogLines, CrpfDevice, ThreatInfo, Alerts
from .serializers import LogLinesSerializer, AssigneeUpdateSerializer
import re
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



