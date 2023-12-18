import os
import time
import requests
import json

# Global variables for the file paths
LOG_FILE_PATH = 'apache.log'
FILE_POINTER_POSITION_PATH = 'file_pointer_position.txt'
pushdata = {
    "access_key": "{{ access_key }}",
    "log_line": None
}
headers = {'Content-Type': 'application/json'}

def tail(f, file_pointer_position):
    f.seek(file_pointer_position, os.SEEK_SET)

    while True:
        line = f.readline()
        if not line:
            time.sleep(0.1)
            continue
        yield line

def send_newlines():
    try:
        with open(FILE_POINTER_POSITION_PATH, 'r') as fp:
            file_pointer_position = int(fp.read())
    except FileNotFoundError:
        file_pointer_position = 0

    # Wait for the log file to be present
    while not os.path.exists(LOG_FILE_PATH):
        time.sleep(1)

    # Process the log file
    with open(LOG_FILE_PATH, 'r') as f:
        loglines = tail(f, file_pointer_position)
        for line in loglines:
            pushdata['log_line'] = line
            print(pushdata['log_line'])
            json_data = json.dumps(pushdata)
            print(json_data)
            # Send a POST request with the line as data
            requests.post('http://127.0.0.1:8000/api/save_log_line/', data=json_data, headers=headers)
            # Save the current file pointer position after processing each line
            with open(FILE_POINTER_POSITION_PATH, 'w') as fp:
                fp.write(str(f.tell()))

while True:
    send_newlines()
