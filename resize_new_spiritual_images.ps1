Add-Type -AssemblyName System.Drawing

$spiritualPath = "public\images\spiritual"
$files = Get-ChildItem -Path $spiritualPath -Filter "DSC_*.JPG" -File

foreach ($file in $files) {
    $fileSize = $file.Length
    $fileSizeMB = [math]::Round($fileSize / 1MB, 2)
    
    Write-Host "Processing: $($file.Name) - Size: $fileSizeMB MB"
    
    if ($fileSize -gt 1MB) {
        try {
            # Create new filename with _resized suffix
            $newFileName = $file.BaseName + "_resized" + $file.Extension
            $newFilePath = Join-Path $spiritualPath $newFileName
            
            # Load original image
            $originalImage = [System.Drawing.Image]::FromFile($file.FullName)
            
            # Calculate new dimensions (reduce to 50% of original size)
            $newWidth = [int]($originalImage.Width * 0.5)
            $newHeight = [int]($originalImage.Height * 0.5)
            
            # Create new bitmap with new dimensions
            $newImage = New-Object System.Drawing.Bitmap($newWidth, $newHeight)
            $graphics = [System.Drawing.Graphics]::FromImage($newImage)
            
            # Set quality settings
            $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
            $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
            $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
            $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
            
            # Draw resized image
            $graphics.DrawImage($originalImage, 0, 0, $newWidth, $newHeight)
            
            # Save as new file
            $newImage.Save($newFilePath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
            
            # Clean up
            $graphics.Dispose()
            $newImage.Dispose()
            $originalImage.Dispose()
            
            # Check new file size
            $newFileSize = (Get-Item $newFilePath).Length
            $newFileSizeMB = [math]::Round($newFileSize / 1MB, 2)
            
            Write-Host "Created resized version: $newFileName - Size: $newFileSizeMB MB (was $fileSizeMB MB)" -ForegroundColor Green
        }
        catch {
            Write-Host "Error processing $($file.Name): $($_.Exception.Message)" -ForegroundColor Red
        }
    }
    else {
        Write-Host "Skipping: $($file.Name) - Already under 1MB" -ForegroundColor Yellow
    }
}

Write-Host "Image resizing completed! Check for files with '_resized' suffix." -ForegroundColor Cyan
