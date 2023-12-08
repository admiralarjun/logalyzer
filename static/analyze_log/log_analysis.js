$(document).ready(function () {
    var detectedThreats = [];

    // Iterate over log lines
    $.each(logLines, function (index, logLine) {
        // Check if it's a threat
        if (logLine.is_threat == true) {
            // Add to detected threats list
            detectedThreats.push({
                pattern: logLine.threat_signature.pattern,
                name: logLine.threat_signature.name,
                description: logLine.threat_signature.description,
                color: logLine.threat_signature.color
            });
        }
    });

    // Render detected threats
    renderDetectedThreats(detectedThreats);
});

function renderDetectedThreats(threats) {
    // Render detected threat patterns
    var patternList = $('#detectedThreatPatterns ul');
    $.each(threats, function (index, threat) {
        patternList.append('<li style="color: ' + threat.color + '; font-weight: bold;">' + threat.pattern + '</li>');
    });

    // Render detected threat signatures
    var signatureList = $('#detectedThreatSignatures ul');
    $.each(threats, function (index, threat) {
        signatureList.append('<li>' + threat.name + ' - ' + threat.description + '</li>');
    });
}
