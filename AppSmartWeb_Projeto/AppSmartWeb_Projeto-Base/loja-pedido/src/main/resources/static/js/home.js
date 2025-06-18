let conectado = false;
let pausado = 0;
let clps = ["estoque", "processo", "montagem", "expedicao"];

function conectarBancada(ipsExternos = null) {
    const btn = document.getElementById("btnConectar");
    let ips;

    if (ipsExternos) {
        ips = ipsExternos;
    } else {
        const ipDigitado = document.querySelector('.ip-input').value.trim();
        const partes = ipDigitado.split('.');
        if (partes.length !== 4) {
            alert('Digite um IP válido no formato xxx.xxx.xxx.xxx');
            return;
        }
        const ipBase = partes.slice(0, 3).join('.');

        ips = {
            estoque: `${ipBase}.10`,
            processo: `${ipBase}.20`,
            montagem: `${ipBase}.30`,
            expedicao: `${ipBase}.40`
        };
    }

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
                console.log("Resposta do ping:", status);
                const wifiStatus = document.querySelector('.wifi-status');
                const wifiDiv = document.querySelector('.wifi-fixed');
                const ipbox = document.querySelectorAll('.ip-box');
                const algumOnline = Object.values(status).some(ok => ok === true);
            
                if (algumOnline) {
                    wifiStatus.textContent = "Conectado";
                    wifiDiv.style.color = "#00ff0f";
                    wifiDiv.style.border = "2px solid #00ff0f";
                    ipbox.forEach(box => {
                        box.style.color = "#00ff0f";
                        box.style.border = "2px solid #00ff0f";
                        box.style.fontSize = "0.83rem";
                    });
                    btn.querySelector('.btn-text').textContent = "DESCONECTAR";
                    conectado = true;
                    sessionStorage.setItem("bancadaConectada", "true");

                    sessionStorage.setItem("ipsBancada", JSON.stringify(ips));
                } else {
                    wifiStatus.textContent = "Desconectado";
                    wifiDiv.style.color = "red";
                    wifiDiv.style.border = "2px solid red";
                    ipbox.forEach(box => {
                        box.style.color = "red";
                        box.style.border = "2px solid red";
                        box.style.fontSize = "0.83rem";
                    });
                    btn.querySelector('.btn-text').textContent = "CONECTAR";
                    conectado = false;
                    sessionStorage.setItem("bancadaConectada", "false");
                }
            
                // Continua com as outras lógicas
                Object.entries(status).forEach(([nome, ok]) => {
                    const inputId = `hostIp${capitalize(nome)}`;
                    const input = document.getElementById(inputId);
                    const cor = ok ? "rgb(0,255,0)" : "rgb(255,0,0)";
                    if (input) {
                        input.style.color = cor;
                        sessionStorage.setItem(`corFonte_${inputId}`, cor);
                    }
                });
            
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

    } else {
        const wifiStatus = document.querySelector('.wifi-status');
        const wifiDiv = document.querySelector('.wifi-fixed');
        const ipbox = document.querySelectorAll('.ip-box');

        if (pausado === 0) {
            pausado = 1;
        }
        if (pausado === 1) {
            sessionStorage.setItem("bancadaConectada", "pausado");
            wifiStatus.textContent = "Pausado";
            wifiDiv.style.color = "yellow";
            wifiDiv.style.border = "2px solid yellow"
            ipbox.forEach(box => {
                box.style.fontSize = "0.83rem";
                box.style.color = "yellow"
                box.style.border = "2px solid yellow";
            });
            const inputs = document.querySelectorAll('.divBancadaStatus input');
            inputs.forEach(input => {
                input.style.color = "rgb(255,255,0)";

            });
        }

        btn.querySelector('.btn-text').textContent = "CONECTAR";
        conectado = false;
        fetch("/stop-leituras", { method: "POST" });

        clps.forEach(clp => {
            document.getElementById(`${clp}-dados`).textContent = "--";
        });
        ["Estoque", "Processo", "Montagem", "Expedicao"].forEach(nome => {
            document.getElementById(`leitura${nome}`).value = "--";
        });
    }
}

function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

document.querySelector('.ip-input').addEventListener('blur', () => {
    const ipDigitado = document.querySelector('.ip-input').value.trim();
    const partes = ipDigitado.split('.');

    if (partes.length !== 4 || partes.some(p => isNaN(p) || p < 0 || p > 255)) {
        // Se o formato for inválido, apenas sai sem fazer nada
        console.warn('IP inválido, ignorando cálculo automático dos IPs.');
        return;
    }

    const ipBase = partes.slice(0, 3).join('.');

    const ips = {
        estoque: `${ipBase}.10`,
        processo: `${ipBase}.20`,
        montagem: `${ipBase}.30`,
        expedicao: `${ipBase}.40`
    };

    // Atualiza os IPs na tela (os .ip-box)
    const ipContainer = document.querySelector('.ip-container');
    ipContainer.innerHTML = '';

    Object.values(ips).forEach(ip => {
        const span = document.createElement('span');
        span.className = 'ip-box';
        span.textContent = ip;
        ipContainer.appendChild(span);
    });

    console.log('IPs calculados automaticamente:', ips);
});

document.addEventListener('DOMContentLoaded', () => {
    const status = sessionStorage.getItem("bancadaConectada");
    const ipsSalvos = sessionStorage.getItem("ipsBancada");
    const ipDigitadoSalvo = sessionStorage.getItem("ipDigitado");

    if (ipsSalvos) {
        const ipsRecuperados = JSON.parse(ipsSalvos);

        if (ipDigitadoSalvo) {
            document.querySelector('.ip-input').value = ipDigitadoSalvo;
        } else {
            const ipBase = ipsRecuperados.estoque.split('.').slice(0, 3).join('.');
            document.querySelector('.ip-input').value = ipBase + ".x";
        }

        atualizarIpBoxes(ipsRecuperados);

        if (status === "true") {
            // Conectado de verdade
            conectarBancada(ipsRecuperados);
        } else if (status === "pausado") {
            // Modo pausado - só interface
            const wifiStatus = document.querySelector('.wifi-status');
            const wifiDiv = document.querySelector('.wifi-fixed');
            const ipbox = document.querySelectorAll('.ip-box');

            wifiStatus.textContent = "Pausado";
            wifiDiv.style.color = "yellow";
            wifiDiv.style.border = "2px solid yellow";
            ipbox.forEach(box => {
                box.style.fontSize = "0.83rem";
                box.style.color = "yellow";
                box.style.border = "2px solid yellow";
            });

            const inputs = document.querySelectorAll('.divBancadaStatus input');
            inputs.forEach(input => {
                input.style.color = "rgb(255,255,0)";
            });

            console.log("Modo pausado restaurado na interface.");
        } else {
            // Status desconectado ou outro valor
            const wifiStatus = document.querySelector('.wifi-status');
            const wifiDiv = document.querySelector('.wifi-fixed');
            const ipbox = document.querySelectorAll('.ip-box');

            wifiStatus.textContent = "Desconectado";
            wifiDiv.style.color = "red";
            wifiDiv.style.border = "2px solid red";
            ipbox.forEach(box => {
                box.style.fontSize = "0.83rem";
                box.style.color = "red";
                box.style.border = "2px solid red";
            });

            const inputs = document.querySelectorAll('.divBancadaStatus input');
            inputs.forEach(input => {
                input.style.color = "rgb(255,0,0)";
            });

            console.log("Status da bancada: desconectado.");
        }
    } else {
        // Sem IPs salvos → desconectado
        const wifiStatus = document.querySelector('.wifi-status');
        const wifiDiv = document.querySelector('.wifi-fixed');
        const ipbox = document.querySelectorAll('.ip-box');

        wifiStatus.textContent = "Desconectado";
        wifiDiv.style.color = "red";
        wifiDiv.style.border = "2px solid red";
        ipbox.forEach(box => {
            box.style.fontSize = "0.83rem";
            box.style.color = "red";
            box.style.border = "2px solid red";
        });

        const inputs = document.querySelectorAll('.divBancadaStatus input');
        inputs.forEach(input => {
            input.style.color = "rgb(255,0,0)";
        });

        console.log("Sem IPs salvos. Status da bancada: desconectado.");
    }

    // Escuta input para salvar IP digitado no sessionStorage
    const ipInput = document.querySelector('.ip-input');
    ipInput.addEventListener('input', () => {
        sessionStorage.setItem('ipDigitado', ipInput.value);
    });
});

// Função para atualizar os IP boxes no container
function atualizarIpBoxes(ips) {
    const ipContainer = document.querySelector('.ip-container');
    ipContainer.innerHTML = ''; // limpa antes

    Object.values(ips).forEach(ip => {
        const span = document.createElement('span');
        span.className = 'ip-box';
        span.textContent = ip;
        ipContainer.appendChild(span);
    });
}