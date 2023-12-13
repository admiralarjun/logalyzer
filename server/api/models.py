from django.db import models
from django.contrib.auth.models import User

class CrpfUnit(models.Model):
    id = models.AutoField(primary_key=True)
    description = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)

    def __str__(self):
        return self.location


class CrpfDevice(models.Model):
    id = models.AutoField(primary_key=True)
    crpf_unit = models.ForeignKey(CrpfUnit, on_delete=models.CASCADE)
    device_name = models.CharField(max_length=100)
    def __str__(self):
        return self.device_name


class ThreatInfo(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    description = models.TextField()
    signature = models.CharField(max_length=255)
    score = models.IntegerField()

    COLOR_CHOICES = [
        ('red', 'Red'),
        ('blue', 'Blue'),
        ('green', 'Green'),
    ]
    color = models.CharField(max_length=20, choices=COLOR_CHOICES)
    ref_links = models.TextField()
    playbook_if = models.ForeignKey('Playbook', on_delete=models.CASCADE,null=True)
    def __str__(self):
        return self.name

class LogLines(models.Model):
    id = models.AutoField(primary_key=True)
    content = models.TextField()
    threat = models.ForeignKey(ThreatInfo, on_delete=models.CASCADE)
    crpf_unit = models.ForeignKey(CrpfUnit, on_delete=models.CASCADE)
    crpf_device = models.ForeignKey(CrpfDevice, on_delete=models.CASCADE)
    def __str__(self):
        return f"{self.id}"

class Alerts(models.Model):
    id = models.AutoField(primary_key=True)
    log_line = models.ForeignKey(LogLines, on_delete=models.CASCADE)
    status_choices = [
        ('Resolved', 'Resolved'),
        ('Unresolved', 'Unresolved'),
        ('Ignored', 'Ignored'),
    ]
    status = models.CharField(max_length=20, choices=status_choices)
    assignee = models.ForeignKey(User, on_delete=models.CASCADE)
    def __str__(self):
        return f"{self.assignee} - ({self.status})"

class Playbook(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    content = models.TextField()
    def __str__(self):
        return self.name
