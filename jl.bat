@echo off
setlocal

REM Obter o diretório onde o script .bat está localizado
set SCRIPT_DIR=%~dp0

REM Construir o caminho completo para o arquivo JAR
set JL_PATH=%SCRIPT_DIR%printer-1.0.jar

REM Executar o arquivo JAR
java -jar "%JL_PATH%" %*

endlocal