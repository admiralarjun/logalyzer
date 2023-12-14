
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


class CrpfUnit(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=20,unique=True)
    description = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    contact = models.CharField(max_length=13)
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    creation_time = models.DateTimeField(default=timezone.now, editable=False)

    def __str__(self):
        return self.name


class CrpfDevice(models.Model):
    id = models.AutoField(primary_key=True)
    crpf_unit = models.ForeignKey(CrpfUnit, on_delete=models.CASCADE)
    device_name = models.CharField(max_length=100,unique=True)
    DEVICE_CHOICES = [
        ('mobile', 'Mobile'),
        ('server', 'Server'),
        ('desktop', 'Desktop'),
    ]
    color = models.CharField(max_length=20, choices=DEVICE_CHOICES)
    creation_time = models.DateTimeField(default=timezone.now, editable=False)

    def __str__(self):
        return self.device_name


class ThreatInfo(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100,unique=True)
    description = models.TextField()
    signature = models.CharField(max_length=255)
    score = models.IntegerField()


    color = models.CharField(max_length=20)
    bgcolor = models.CharField(max_length=20)
    ref_links = models.TextField()
    playbooks = models.ManyToManyField('Playbook')
    creation_time = models.DateTimeField(default=timezone.now, editable=False)

    def __str__(self):
        return self.name

class LogLines(models.Model):
    id = models.AutoField(primary_key=True)
    content = models.TextField()
    threat = models.ForeignKey(ThreatInfo, on_delete=models.SET_NULL,blank=True,null=True)
    crpf_unit = models.ForeignKey(CrpfUnit, on_delete=models.CASCADE)
    crpf_device = models.ForeignKey(CrpfDevice, on_delete=models.CASCADE)
    creation_time = models.DateTimeField(default=timezone.now, editable=False)

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
    assignee = models.ForeignKey(User, on_delete=models.CASCADE,null=True,blank=True)
    creation_time = models.DateTimeField(default=timezone.now, editable=False)
    updation_time = models.DateTimeField(null=True, editable=True,blank=True)
    def __str__(self):
        return f"{self.assignee} - ({self.status})"

class Playbook(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100,unique=True)
    content = models.TextField()
    creation_time = models.DateTimeField(default=timezone.now, editable=False)

    def __str__(self):
        return self.name
