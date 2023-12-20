
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from colorfield.fields import ColorField

class CrpfUnit(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=20,unique=True)
    description = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    contact = models.CharField(max_length=13)
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    creation_time = models.DateTimeField(default=timezone.now, editable=False)
    unit_image = models.FileField(blank=False, upload_to="crpf_unit_pictures/", null=True)
    mail_address = models.EmailField(default=False)

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
    device_type = models.CharField(max_length=20, choices=DEVICE_CHOICES)
    creation_time = models.DateTimeField(default=timezone.now, editable=False)

    def __str__(self):
        return self.device_name


class ThreatInfo(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100,unique=True)
    description = models.TextField()
    signature = models.CharField(max_length=255)
    score = models.IntegerField()
    color = ColorField(default='#000000', verbose_name='Color')
    bgcolor = ColorField(default='#000000', verbose_name='Color')
    ref_links = models.TextField()
    playbooks = models.ManyToManyField('Playbook')
    creation_time = models.DateTimeField(default=timezone.now, editable=False)
    remediation = models.TextField()
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
    update_time = models.DateTimeField(default=timezone.now, editable=False)
    def __str__(self):
        return f"{self.assignee} - ({self.status})"

class Playbook(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100,unique=True)
    content = models.TextField()
    creation_time = models.DateTimeField(default=timezone.now, editable=False)
    status_choices = [
        ('Approved', 'Approved'),
        ('Rejected', 'Rejected'),
        ('WaitList', 'WaitList'),
    ]
    status = models.CharField(max_length=20, choices=status_choices)
    def __str__(self):
        return self.name

class Profile_pic(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User,on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    profile_pic = models.FileField(blank=False, upload_to="profile_pictures/", null=True)
    created_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return str(self.name)

class Crpf_Device_Agent_Repo(models.Model):
    id = models.AutoField(primary_key=True)
    crpf_device_id = models.ForeignKey(CrpfDevice, on_delete=models.CASCADE)
    access_key = models.TextField(unique=True)
    code = models.TextField()
    version = models.TextField()

    def __str__(self):
        return str(self.crpf_device_id)




