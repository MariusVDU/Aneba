@echo off
setlocal enabledelayedexpansion

REM ================================================================================================
REM  Ameba Game Store - Batch Startup Script
REM  Press Ctrl+C to stop all servers
REM ================================================================================================

echo.
echo ================================================
echo   Ameba Game Store
echo ================================================
echo.

REM Check dependencies
if not exist "node_modules" (
    echo [1/4] Installing backend dependencies...
    call npm install >nul 2>&1
    echo       Backend dependencies installed
) else (
    echo [1/4] Backend dependencies OK
)

if not exist "client\node_modules" (
    echo [2/4] Installing frontend dependencies...
    cd client
    call npm install >nul 2>&1
    cd ..
    echo       Frontend dependencies installed
) else (
    echo [2/4] Frontend dependencies OK
)

echo.
echo [3/4] Starting backend server...
start /B node server/index.js
timeout /t 2 /nobreak >nul
echo       Backend running on http://localhost:5000

echo [4/4] Starting frontend server...
echo.
echo ================================================
echo   Application is running!
echo   Backend:  http://localhost:5000
echo   Frontend: http://localhost:3000
echo ================================================
echo.
echo Press Ctrl+C to stop all servers
echo.

REM Setup cleanup handler
cd client

REM Run frontend - this blocks until Ctrl+C
call npm run dev

REM Cleanup when exits
echo.
echo ================================================
echo   Stopping all servers...
echo ================================================
cd ..

REM Kill all node processes
taskkill /F /IM node.exe >nul 2>&1

echo.
echo All servers stopped. Goodbye!
echo.
pause
