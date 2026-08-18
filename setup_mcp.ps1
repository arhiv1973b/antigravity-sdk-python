$McpServices = @(
    @{
        Name          = "MCP_FILESYSTEM"
        Image         = "mcp/filesystem"
        ContainerName = "mcp_filesystem_full"
        Args          = "/run"
        Volumes       = "H:\ACTOR_DEV_ENV\run:/run"
        PortStart     = 8091
    },
    @{
        Name          = "MCP_GITHUB"
        Image         = "mcp/github-chat"
        ContainerName = "mcp_github_chat"
        Args          = ""
        Volumes       = ""
        PortStart     = 8092
    },
    @{
        Name          = "MCP_PLAYWRIGHT"
        Image         = "mcp/playwright"
        ContainerName = "mcp_playwright"
        Args          = ""
        Volumes       = ""
        PortStart     = 8093
    }
)

function Test-Port {
    param([int]$Port)
    $tcpClient = New-Object System.Net.Sockets.TcpClient
    try {
        $tcpClient.Connect("127.0.0.1", $Port)
        return $true
    } catch {
        return $false
    } finally {
        $tcpClient.Close()
    }
}

foreach ($service in $McpServices) {
    Write-Host "--- Настройка сервиса: $($service.Name) ---" -ForegroundColor Cyan
    
    # Поиск свободного порта
    $port = $service.PortStart
    while (Test-Port $port) {
        Write-Host "Порт $port занят, ищу свободный..."
        $port++
    }
    Write-Host "Использую порт: $port"

    # Обработка томов
    $volumeArg = ""
    if (-not [string]::IsNullOrWhiteSpace($service.Volumes)) {
        $hostPath = $service.Volumes.Split(':')[0]
        if (-Not (Test-Path $hostPath)) {
            Write-Host "Создаю каталог $hostPath..."
            New-Item -ItemType Directory -Path $hostPath | Out-Null
        }
        $volumeArg = "-v $($service.Volumes)"
    }

    # Остановка и удаление старого контейнера
    docker rm -f $service.ContainerName 2>$null

    # Запуск контейнера
    $runCmd = "docker run -d --name $($service.ContainerName) -p $port:8090"
    if ($volumeArg) { $runCmd += " $volumeArg" }
    $runCmd += " $($service.Image) $($service.Args)"
    
    Write-Host "Запуск: $runCmd"
    Invoke-Expression $runCmd

    # Регистрация в Gemini CLI
    Write-Host "Регистрация в Gemini CLI..."
    gemini mcp remove $service.Name 2>$null
    
    $mcpAddCmd = "docker run -i --rm"
    if ($volumeArg) { $mcpAddCmd += " $volumeArg" }
    $mcpAddCmd += " $($service.Image) $($service.Args)"
    
    gemini mcp add $service.Name $mcpAddCmd
}

Write-Host "`n--- Итоговый статус MCP ---" -ForegroundColor Cyan
$list = gemini mcp list
$list | Out-String | Write-Host
