from django import forms

class LogFileUploadForm(forms.Form):
    log_file = forms.FileField()

class LogFileUploadForm(forms.Form):
    log_file = forms.FileField(label='Select a log file')