
Set Key="./evaluation-server-vm-1_key.pem"

Cmd /c Icacls %Key% /c /t /Inheritance:d

Cmd /c Icacls %Key% /c /t /Grant %UserName%:F

Cmd /c Icacls %Key% /c /t /Remove Administrator "Authenticated Users" BUILTIN\Administrators BUILTIN Everyone System Users

Cmd /c Icacls %Key%

ssh -i ./evaluation-server-vm-1_key.pem azureuser@20.67.122.227
