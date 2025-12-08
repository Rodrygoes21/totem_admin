@echo off
echo ====================================
echo   INICIANDO SERVIDOR DEL TOTEM
echo ====================================
echo.
echo Verificando Node.js...
node --version > nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js no esta instalado.
    echo Por favor instala Node.js desde https://nodejs.org
    pause
    exit /b 1
)

echo Node.js detectado correctamente.
echo.
echo Iniciando servidor en el puerto 3001...
echo.

cd /d "%~dp0"
node server.js

pause
