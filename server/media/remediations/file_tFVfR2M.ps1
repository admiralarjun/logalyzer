# Define the PHP file path
$phpFilePath = "D:\xampp\htdocs\sih-victim"

# Define the backup file path
$backupFilePath = $phpFilePath -replace '\.php$', '_backup.php'

# Copy the original PHP file to create a backup
Copy-Item -Path $phpFilePath -Destination $backupFilePath

# Read the content of the PHP file
$phpContent = Get-Content $phpFilePath -Raw

# Define the pattern to search for the input fields
$pattern = '<input type="text" name="(username|password)"[^>]*>'

# Define the replacement pattern with added input validation
$replacement = '<input type="text" name="$1" id="xss_input" value="" class="form-control" required  title="Only alphanumeric characters are allowed" pattern="^[a-zA-Z0-9]+$">'

# Perform the text replacement
$modifiedContent = $phpContent -replace $pattern, $replacement
 
# Write the modified content back to the PHP file
$modifiedContent | Set-Content $phpFilePath

Write-Host "Input validation added to the PHP file."
Write-Host "Backup created at: $backupFilePath"