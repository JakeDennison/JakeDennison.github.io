# Load SharePoint PowerShell snap-in
Add-Type -AssemblyName "Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c"

$webUrl = "https://sp.safalo.com/dev/docman/"
$site = Get-SPSite $webUrl
$web = $site.RootWeb

Get-PnPView -List "Employee Project Log "

# Replace "Your List Name" and "Your View Title" with the actual values
$listName = "Employee Project Log "
$viewName = "All Items"
$list = $web.Lists[$listName]
$view = $list.Views[$viewName]

$groupFields = @("Employee", "Project", "Week")

# Build the XML for the view query
$viewQuery = "<GroupBy Collapse='FALSE' GroupLimit='30'>"
foreach ($field in $groupFields) {
    $viewQuery += "<FieldRef Name='$field' />"
}
$viewQuery += "</GroupBy>"

# Update the view query and update the view
$view.Query = $viewQuery
$view.Update()