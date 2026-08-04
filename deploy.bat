@echo off
title Deploy do Site - Cloudflare Pages
color 0A

echo =========================================
echo    ATUALIZANDO SITE NO GITHUB E PAGES
echo =========================================
echo.

:: Garante que estamos no diretório do script
cd /d "%~dp0"

:: Pergunta a mensagem do commit (opcional)
set /p msg="Digite a descricao da alteracao (ou pressione ENTER para mensagem padrao): "

:: Se o usuario nao digitar nada, gera mensagem automatica com data/hora
if "%msg%"=="" (
    set msg=Atualizacao automatica em %date% as %time:~0,5%
)

echo.
echo [1/3] Adicionando arquivos...
git add .

echo.
echo [2/3] Criando commit: "%msg%"...
git commit -m "%msg%"

echo.
echo [3/3] Enviando para o GitHub...
git push origin main

echo.
echo =========================================
echo    SUCESSO! O site esta sendo atualizado.
echo =========================================
echo.
pause