from django.db import models
import re
class LogLine:
    def __init__(self, lineNumber, line):
        self.line = line
        self.lineNumber = lineNumber
        self.is_threat = False
        self.threat_signature = {
            "name": '',
            "pattern":'',
            "description": '',
            "threat_score": 0,
            "color": '#FFFFFF',
            "background_color": '#00000030'
        }

    def set_threat_info(self, is_threat, threat_signature):
        self.is_threat = is_threat
        self.threat_signature = threat_signature

    def analyze_threat(self, threat_signatures):
        for signature in threat_signatures:
            matches = re.finditer(signature["pattern"], self.line, re.IGNORECASE)
            for match in matches:
                threat_signature = {
                    "name": signature["name"],
                    "pattern": signature["pattern"],
                    "description":signature["description"],
                    "threat_score": signature["threat_score"],
                    "color": signature["color"],
                    "background_color": signature["background_color"]
                }
                self.set_threat_info(True, threat_signature)
                return  # Exit after the first match, adjust if needed
