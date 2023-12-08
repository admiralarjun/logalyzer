# log_analyzer/views.py
from django.shortcuts import render, redirect
from .models import LogLine
from .forms import LogFileUploadForm
import os,re,json
from django.core.files.storage import default_storage
from django.core.files.uploadedfile import SimpleUploadedFile
from django.utils.text import slugify

def get_unique_filename(file_name):
    # Generates a unique filename to prevent overwriting existing files
    if not default_storage.exists(file_name):
        return file_name
    root, ext = os.path.splitext(file_name)
    index = 1
    while default_storage.exists(file_name):
        file_name = f'{root}_{index}{ext}'
        index += 1
    return file_name

def home(request):
    # Get a list of uploaded log files
    log_files = get_uploaded_log_files()

    # Handle log file upload
    if request.method == 'POST':
        form = LogFileUploadForm(request.POST, request.FILES)
        if form.is_valid():
            log_file = request.FILES['log_file']
            log_file_name = log_file.name
            log_file_path = os.path.join('logs', log_file_name)
            
            # Check if the file already exists
            if default_storage.exists(log_file_path):
                # Append a number to the filename to avoid conflicts
                base_name, extension = os.path.splitext(log_file_name)
                count = 1
                while default_storage.exists(log_file_path):
                    log_file_name = f"{base_name}_{count}{extension}"
                    log_file_path = os.path.join('logs', log_file_name)
                    count += 1

            # Save the uploaded log file
            with default_storage.open(log_file_path, 'wb+') as destination:
                for chunk in log_file.chunks():
                    destination.write(chunk)

            return redirect('home')  # Redirect back to the home page after uploading

    else:
        form = LogFileUploadForm()

    # Filter log files based on user input
    search_query = request.GET.get('search_query', '')  # Get the search query from the request
    if search_query:
        log_files = [file for file in log_files if search_query.lower() in file.lower()]

    return render(request, 'home.html', {'log_files': log_files, 'form': form, 'search_query': search_query})


def get_uploaded_log_files():
    # Get a list of uploaded log files from the 'logs' directory
    log_files = []
    for file_name in default_storage.listdir('logs')[1]:
        log_files.append(file_name)
    return log_files

def analyze_log(request, log_file_name):
    # Read threat signatures from the JSON file
    with open('signatures/threat_signatures.json', 'r') as json_file:
        threat_signatures = json.load(json_file)

    log_content = get_log_content(log_file_name)

    # Initialize a list to store log lines as objects
    log_lines = []
    detected_threats = []

    # Analyze the log content for threats using signature-based detection
    lineNumber = 0
    for line in log_content.split('\n'):
        lineNumber += 1
        log_line = LogLine(lineNumber,line)
        log_line.analyze_threat(threat_signatures)
        log_lines.append(log_line)
        # if log_line.is_threat and log_line.threat_signature["pattern"] not in detected_threats:
        #     detected_threats.append(log_line.threat_signature)

        if log_line.is_threat:
            detected_threats.append(log_line)


    # Render a template with the log lines and threat signatures
    return render(request, 'analyze_log.html', {'log_lines': log_lines, 'detected_threats': detected_threats})


def get_log_content(log_file_name):
    # Retrieve and return the content of the selected log file
    log_file_path = os.path.join('logs', log_file_name)
    if default_storage.exists(log_file_path):
        with default_storage.open(log_file_path) as log_file:
            log_content = log_file.read()
            return log_content.decode('utf-8')
    else:
        return "Log file not found."
