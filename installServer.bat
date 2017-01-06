@echo off
set startdir=%~dp0
set bashdir="C:\Program Files\Git\bin\bash.exe"
cd MinecraftServer && %bashdir% --login -i -c "java -jar ""BuildTools.jar"" --rev 1.8.8"
cd %startdir%
pause