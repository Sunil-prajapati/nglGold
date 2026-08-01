Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile("D:\Project\NglGold\assets\images\logo.jpg")
$img.Save("D:\Project\NglGold\assets\images\logo.png", [System.Drawing.Imaging.ImageFormat]::Png)
$img.Dispose()
