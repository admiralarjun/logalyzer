import http.server
import socketserver
import os
import time

# Set the port for the HTTP server
PORT = 7777

# Path to the app log file
log_file_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'app_log.log')

# Custom handler to serve the log file incrementally
class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')  # Allow cross-origin requests
        super().end_headers()

    def log_message(self, format, *args):
        pass  # Suppress log messages to the console

# Create the HTTP server with the custom handler
with socketserver.TCPServer(('', PORT), CustomHandler) as httpd:
    print(f'Serving on port {PORT}')

    try:
        while True:
            # Sleep for a short interval (e.g., 1 second)
            time.sleep(1)

            # Notify Django app by updating the log file modification time
            os.utime(log_file_path, None)

            # Handle a single request (to serve the log file)
            httpd.handle_request()

    except KeyboardInterrupt:
        print('\nServer stopped by the user.')
