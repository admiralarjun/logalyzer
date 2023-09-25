# log_analyzer/models.py
from django.db import models
from django.utils import timezone

class LogEntry(models.Model):
    timestamp = models.DateTimeField(default=timezone.now)
    log_level = models.CharField(max_length=50)
    log_message = models.TextField()
    log_file_name = models.CharField(max_length=255, default='')  # Provide a default value

    def __str__(self):
        return self.log_message
