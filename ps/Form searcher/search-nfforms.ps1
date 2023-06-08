Add-Type -Path "C:\Program Files\Common Files\Microsoft Shared\Web Server Extensions\16\ISAPI\Microsoft.SharePoint.Client.dll"
Add-Type -Path "C:\Program Files\Common Files\Microsoft Shared\Web Server Extensions\16\ISAPI\Microsoft.SharePoint.Client.Runtime.dll"

$siteUrl = "http://your-sharepoint-site-url"
$username = "your-username"
$password = "your-password"
$searchString = "your-search-string"
$newString = "your-new-string"
$outputFile = "C:\Path\to\output.csv"  # Replace with the desired output file path

$securePassword = ConvertTo-SecureString -String $password -AsPlainText -Force
$credentials = New-Object -TypeName System.Net.NetworkCredential -ArgumentList $username, $securePassword

# Create an array to store the found file locations
$foundFiles = @()

# Function to search for XML files in a library containing a specific string
function SearchNintexForms([Microsoft.SharePoint.Client.Web]$web, [string]$listTitle, [string]$searchString, [string]$newString) {
    Write-Host "Searching for NintexForms in $($web.Url)/$listTitle"
    $context = $web.Context
    $web.Lists.EnsureSiteAssetsLibrary()
    $list = $web.Lists.GetByTitle($listTitle)
    $context.Load($list)
    $context.ExecuteQuery()

    # Check if the list is the NintexForms library
    if ($list.BaseType -eq "DocumentLibrary" -and $list.BaseTemplate -eq 101 -and $list.Title -eq "NintexForms") {
        # Retrieve XML files in the NintexForms library
        $camlQuery = New-Object Microsoft.SharePoint.Client.CamlQuery
        $camlQuery.ViewXml = "<View Scope='RecursiveAll'><Query><Where><Eq><FieldRef Name='File_x0020_Type' /><Value Type='Text'>xml</Value></Eq></Where></Query></View>"
        $items = $list.GetItems($camlQuery)
        $context.Load($items)
        $context.ExecuteQuery()

        # Store the file locations
        foreach ($item in $items) {
            $fileUrl = "$($web.Url)/$($list.Title)/$($item["FileLeafRef"])"
            $fileContent = $item.File.OpenBinary()
            $context.ExecuteQuery()

            # Check if the file contains the search string
            if ($fileContent -match $searchString) {
                Write-Host "XML File Location: $fileUrl"
                $foundFiles += [PSCustomObject]@{
                    "FileUrl" = $fileUrl
                }

                # Read the file content as a string
                $fileContentString = [System.Text.Encoding]::UTF8.GetString($fileContent)

                # Replace the search string with the new string
                $newContentString = $fileContentString -replace $searchString, $newString

                # Convert the updated string back to byte array
                $newContentBytes = [System.Text.Encoding]::UTF8.GetBytes($newContentString)

                # Upload the updated content to the file
                $item.File.SaveBinary($newContentBytes)
                $context.ExecuteQuery()
            }
        }
    }

    # Recursively search in sub-webs
    $subwebs = $web.Webs
    $context.Load($subwebs)
    $context.ExecuteQuery()
    foreach ($subweb in $subwebs) {
        SearchNintexForms $subweb $listTitle $searchString $newString
    }
}

# Connect to the SharePoint site
$context = New-Object -TypeName Microsoft.SharePoint.Client.ClientContext -ArgumentList $siteUrl
$context.Credentials = $credentials

$web = $context.Web
$context.Load($web)
$context.ExecuteQuery()

# Search for NintexForms library in the root web and replace the search string
SearchNintexForms $web "NintexForms" $searchString $newString

# Disconnect from the SharePoint site
$context.Dispose()

# Export the found files to CSV
$foundFiles | Export-Csv -Path $outputFile -NoTypeInformation
