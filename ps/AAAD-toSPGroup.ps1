# Connect to the SharePoint site
Connect-PnPOnline -Url https://ntxte01.sharepoint.com/customs/ -Credentials (Get-Credential)

# Get the SharePoint group you want to add the AD group to
$group = Get-PnPGroup -Identity "365 Test Group Member"

# Get the AD group you want to add to the SharePoint group
$adGroup = Get-PnPUnifiedGroup -Identity "Test Group - 365 Group"

# Add the AD group to the SharePoint group
Add-PnPUserToGroup -LoginName $adGroup.DisplayName -Identity $group

# Disconnect from the SharePoint site
Disconnect-PnPOnline