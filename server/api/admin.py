

from django.contrib import admin
from .models import CrpfUnit, CrpfDevice, ThreatInfo, LogLines, Alerts, Playbook

admin.site.register(CrpfUnit)
admin.site.register(CrpfDevice)
admin.site.register(ThreatInfo)
admin.site.register(LogLines)
admin.site.register(Alerts)
admin.site.register(Playbook)
