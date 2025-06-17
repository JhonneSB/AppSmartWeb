function conectarBancada() {
    const btn = document.getElementById("btnConectar");
    const ipDigitado = document.querySelector('.ip-input').value.trim();

    // Gera os IPs baseados no input
    const partes = ipDigitado.split('.');
    if (partes.length !== 4) {
        alert('Digite um IP válido no formato xxx.xxx.xxx.xxx');
        return;
    }
    const ipBase = partes.slice(0, 3).join('.');

    const ips = {
        estoque: `${ipBase}.10`,
        processo: `${ipBase}.20`,
        montagem: `${ipBase}.30`,
        expedicao: `${ipBase}.40`
    };

    // Atualiza os IPs na tela
    const ipContainer = document.querySelector('.ip-container');
    ipContainer.innerHTML = '';
    Object.values(ips).forEach(ip => {
        const span = document.createElement('span');
        span.className = 'ip-box';
        span.textContent = ip;
        ipContainer.appendChild(span);
    });

    if (!conectado) {
        fetch("/smart/ping", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(ips)
        })
            .then(res => res.json())
            .then(status => {
                const wifiStatus = document.querySelector('.wifi-status');
                const wifiDiv = document.querySelector('.wifi-fixed');

                const algumOnline = Object.values(status).some(ok => ok === true);

                if (algumOnline) {
                    wifiStatus.textContent = "Conectado";
                    wifiDiv.style.color = "green";
                } else {
                    wifiStatus.textContent = "Desconectado";
                    wifiDiv.style.color = "red";
                }

                Object.entries(status).forEach(([nome, ok]) => {
                    const inputId = `hostIp${capitalize(nome)}`;
                    const input = document.getElementById(inputId);
                    const cor = ok ? "rgb(0,255,0)" : "rgb(255,0,0)";
                    if (input) {
                        input.style.color = cor;
                        sessionStorage.setItem(`corFonte_${inputId}`, cor);
                    }
                });

                // Inicia as leituras no backend
                return fetch("/start-leituras", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(ips)
                });
            })
            .then(() => {
                iniciarSSEClps();
                pausado = 0;
                if (pausado === 0) {
                    const inputs = document.querySelectorAll('.divBancadaStatus input');
                    inputs.forEach(input => {
                        input.style.color = "rgb(0,255,0)";
                    });
                }
            })
            .catch(error => {
                console.error("Erro ao conectar:", error);
            });

        btn.textContent = "Desconectar";
        conectado = true;
        sessionStorage.setItem("bancadaConectada", "true");
    } else {
        pararSSEClps();

        if (pausado === 0) {
            pausado = 1;
        }
        if (pausado === 1) {
            const inputs = document.querySelectorAll('.divBancadaStatus input');
            inputs.forEach(input => {
                input.style.color = "rgb(255,255,0)";
            });
        }
        fetch("/stop-leituras", { method: "POST" });

        clps.forEach(clp => {
            document.getElementById(`${clp}-dados`).textContent = "--";
        });
        ["Estoque", "Processo", "Montagem", "Expedicao"].forEach(nome => {
            document.getElementById(`leitura${nome}`).value = "--";
        });

        btn.textContent = "Conectar";
        conectado = false;
        sessionStorage.removeItem("bancadaConectada");
    }
}