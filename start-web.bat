@echo off
setlocal
set "ROOT=%~dp0"
cd /d "%ROOT%redthread-web"

REM Instalar dependencias (si ya estan, npm lo omite rapido)
call npm install

REM Levantar Vite en nueva ventana
start "RedThread Web (Vite)" cmd /k "npm run dev"
