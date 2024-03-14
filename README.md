# Loganalyzer

Loganalyzer is a web application developed as part of the Smart India Hackathon 2023 project. It comprises a central server for log analysis, a victim machine hosting PHP as the server, and an attacker machine. The victim machine gets attacked, and the logs are sent to the central server for analysis. The server decodes the logs and remediates the vulnerabilities. The web application is used to analyze threats and alerts.

## Features

- **Log Analysis**: Analyze logs from victim systems to identify threats and vulnerabilities.
- **Alert System**: Receive real-time alerts for suspicious activities and security breaches.
- **Vulnerability Remediation**: Remediate vulnerabilities identified in log analysis.
- **Dashboard**: View statistics and visualizations of threat analysis.
- **User Management**: Manage user accounts and permissions for accessing the system.
- **API Integration**: Utilize Django as an API for backend functionality.

## Tech Stack

- **Django**: Backend framework used for central server development and log analysis.
- **React.js**: Frontend library used for building the user interface.
- **PHP**: Server-side language used on the victim machine.
- **Python**: Programming language used for backend development and log analysis.
- **REST API**: Utilized for communication between frontend and backend.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Venky2004/logalyzer.git
    ```

2. Navigate to the project directory:
    ```bash
    cd logalyzer
    ```

3. Set up the Django backend:
    - Create a virtual environment (optional but recommended):
        ```bash
        python -m venv venv
        ```
    - Activate the virtual environment:
        - On Windows:
            ```bash
            venv\Scripts\activate
            ```
        - On macOS and Linux:
            ```bash
            source venv/bin/activate
            ```
    - Install dependencies:
        ```bash
        pip install -r requirements.txt
        ```
    - Run migrations:
        ```bash
        python manage.py migrate
        ```

4. Set up the React frontend:
    - Navigate to the frontend directory:
        ```bash
        cd frontend
        ```
    - Install dependencies:
        ```bash
        npm install
        ```

## Usage

1. Start the Django backend:
    ```bash
    python manage.py runserver
    ```

2. Start the React frontend:
    - Navigate to the frontend directory:
        ```bash
        cd react-ui
        ```
    - Start the development server:
        ```bash
        npm start
        ```

3. Open your web browser and navigate to [http://localhost:3000](http://localhost:3000) to access Loganalyzer.

## Live Demo

Check out the live demo of Loganalyzer [here](link-to-live-demo).
