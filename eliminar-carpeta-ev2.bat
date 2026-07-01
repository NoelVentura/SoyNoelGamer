@echo off
cd /d "%~dp0"
if not exist "ev2" (
    echo La carpeta ev2 ya no existe.
    pause
    exit /b 0
)
rmdir /s /q "ev2" 2>nul
if exist "ev2" (
    echo No se pudo borrar: cierra las pestanas de ev2 en el navegador y en Cursor, luego vuelve a ejecutar este archivo.
    pause
    exit /b 1
)
echo Carpeta ev2 eliminada.
timeout /t 2 >nul
