# ================================================================================================
#  Ameba Game Store - PowerShell Startup Script
#  Press Ctrl+C to stop all servers
# ================================================================================================

$ErrorActionPreference = "SilentlyContinue"
$backendProcess = $null

# Cleanup function - runs on Ctrl+C or script exit
function Cleanup {
    Write-Host ""
    Write-Host "================================================" -ForegroundColor Yellow
    Write-Host "  Stopping all servers..." -ForegroundColor Yellow
    Write-Host "================================================" -ForegroundColor Yellow
    
    # Stop backend process
    if ($backendProcess -and !$backendProcess.HasExited) {
        Write-Host "Stopping backend server (PID: $($backendProcess.Id))..." -ForegroundColor Cyan
        Stop-Process -Id $backendProcess.Id -Force -ErrorAction SilentlyContinue
    }
    
    # Kill any remaining node processes on ports 3000 and 5000
    $ports = @(3000, 5000, 3001)
    foreach ($port in $ports) {
        $connections = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
        if ($connections) {
            $connections | ForEach-Object {
                $pid = $_.OwningProcess
                Write-Host "Stopping process on port ${port} (PID: $pid)..." -ForegroundColor Cyan
                Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue
            }
        }
    }
    
    # Return to root directory
    Set-Location $PSScriptRoot
    
    Write-Host ""
    Write-Host "All servers stopped. Goodbye! 👋" -ForegroundColor Green
    Write-Host ""
}

# Register cleanup on Ctrl+C
$null = Register-EngineEvent -SourceIdentifier PowerShell.Exiting -Action { Cleanup }
trap { Cleanup; break }

# Main script
try {
    Write-Host ""
    Write-Host "================================================" -ForegroundColor Cyan
    Write-Host "  🎮 Ameba Game Store" -ForegroundColor Cyan
    Write-Host "================================================" -ForegroundColor Cyan
    Write-Host ""

    # Check dependencies
    if (-Not (Test-Path "node_modules")) {
        Write-Host "[1/4] Installing backend dependencies..." -ForegroundColor Yellow
        npm install | Out-Null
        Write-Host "      ✓ Backend dependencies installed" -ForegroundColor Green
    } else {
        Write-Host "[1/4] ✓ Backend dependencies OK" -ForegroundColor Green
    }

    if (-Not (Test-Path "client\node_modules")) {
        Write-Host "[2/4] Installing frontend dependencies..." -ForegroundColor Yellow
        Push-Location client
        npm install | Out-Null
        Pop-Location
        Write-Host "      ✓ Frontend dependencies installed" -ForegroundColor Green
    } else {
        Write-Host "[2/4] ✓ Frontend dependencies OK" -ForegroundColor Green
    }

    Write-Host ""
    Write-Host "[3/4] Starting backend server..." -ForegroundColor Yellow
    
    # Start backend
    $backendProcess = Start-Process -FilePath "node" -ArgumentList "server/index.js" -PassThru -WindowStyle Hidden
    Write-Host "      ✓ Backend running on http://localhost:5000 (PID: $($backendProcess.Id))" -ForegroundColor Green

    # Wait for backend
    Start-Sleep -Seconds 2

    Write-Host "[4/4] Starting frontend server..." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "================================================" -ForegroundColor Cyan
    Write-Host "  ✅ Application is running!" -ForegroundColor Green
    Write-Host "  📡 Backend:  http://localhost:5000" -ForegroundColor White
    Write-Host "  🎨 Frontend: http://localhost:3000" -ForegroundColor White
    Write-Host "================================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "💡 Press Ctrl+C to stop all servers" -ForegroundColor Yellow
    Write-Host ""

    # Start frontend (blocks here)
    Set-Location client
    npm run dev
    
} catch {
    Write-Host "Error occurred: $_" -ForegroundColor Red
} finally {
    Cleanup
}
