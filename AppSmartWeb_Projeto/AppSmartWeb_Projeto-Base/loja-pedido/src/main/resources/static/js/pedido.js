// Função para renderizar os blocos conforme o tipo de pedido selecionado
function renderBlocos() {
    const tipoPedido = document.getElementById('tipoPedido').value;
    const pedidoView = document.getElementById('pedido-viewBlocoMontado');
    
    // Remove todas as classes de altura
    pedidoView.classList.remove('um-bloco', 'dois-blocos', 'tres-blocos');
    
    // Adiciona a classe apropriada baseada na seleção
    if (tipoPedido === 'simples') {
        pedidoView.classList.add('um-bloco');
    } else if (tipoPedido === 'duplo') {
        pedidoView.classList.add('dois-blocos');
    } else if (tipoPedido === 'triplo') {
        pedidoView.classList.add('tres-blocos');
    }

    verBlocosMontados();

    const tipo = document.getElementById("tipoPedido").value;
    const container = document.getElementById("blocosContainer");
    container.innerHTML = "";

    let blocos = tipo === "simples" ? 1 : tipo === "duplo" ? 2 : 3;

    for (let b = 0; b < blocos; b++) {
        const nBloco = b + 1;
        const blocoDiv = document.createElement("div");
        const tipo = document.getElementById("tipoPedido").value;
        blocoDiv.classList.add("bloco");
        blocoDiv.id = "bloco-container-" + nBloco;
        blocoDiv.innerHTML = `
            <h2 class="big-subtitle">Bloco ${b + 1}</h2>

            <div class="pedido-view spin" id="pedido-view${nBloco}">
                <div class="bloco-spin-container" id="bloco-spin-container-${nBloco}">
                    <img class="imagem" id="bloco-${nBloco}" src="assets/bloco/rBlocoCor0.png" alt="Bloco">
                </div>
                <img class="imagem" id="lamina${nBloco}-3" src="assets/placeholder.png" alt="Lâmina 3">
                <img class="imagem" id="lamina${nBloco}-1" src="assets/placeholder.png" alt="Lâmina 1">
                <img class="imagem" id="lamina${nBloco}-2" src="assets/placeholder.png" alt="Lâmina 2">
                <img class="imagem" id="padrao${nBloco}-1" src="assets/placeholder.png" alt="Padrão 1">
                <img class="imagem" id="padrao${nBloco}-2" src="assets/placeholder.png" alt="Padrão 2">
                <img class="imagem" id="padrao${nBloco}-3" src="assets/placeholder.png" alt="Padrão 3">
                <button id="spin${nBloco}" class="spin" onclick="spin(${nBloco})"><span
                        class="material-symbols-rounded">chevron_right</span></button>
            </div>
            
            <div class="input-box">
                <label for="block-color-${nBloco}">Cor do Bloco:
                    <select name="block-color-${nBloco}" id="block-color-${nBloco}" onchange="changePedidoView(${nBloco})">
                        <option value="nenhum">Nenhum</option>
                        <option value="preto">Preto</option>
                        <option value="vermelho">Vermelho</option>
                        <option value="azul">Azul</option>
                    </select>
                </label>
            </div>
            <div class="input-combo">
                <div class="input-box">
                    <label for="l1-color-${nBloco}">Cor Lâmina 1</label>
                    <select name="l1-color-${nBloco}" id="l1-color-${nBloco}" disabled onchange="changePedidoView(${nBloco}, this.value)">
                        <option value="" hidden selected>Selecione</option>
                        <option value="1">Vermelho</option>
                        <option value="2">Azul</option>
                        <option value="3">Preto</option>
                    </select>
                </div>
                <div class="input-box">
                    <label for="l1-pattern-${nBloco}">Padrão Lâmina 1</label>
                    <select name="l1-pattern-${nBloco}" id="l1-pattern-${nBloco}" disabled onchange="changePedidoView(${nBloco}, this.value)">
                        <option value="" hidden selected>Selecione</option>
                        <option value="0">Nenhum</option>
                        <option value="1">Casa</option>
                        <option value="2">Navio</option>
                        <option value="3">Estrela</option>
                    </select>
                </div>
            </div>
            <div class="input-combo">
                <div class="input-box">
                    <label for="l2-color-${nBloco}">Cor Lâmina 2</label>
                    <select name="l2-color-${nBloco}" id="l2-color-${nBloco}" disabled onchange="changePedidoView(${nBloco}, this.value)">
                        <option value="" hidden selected>Selecione</option>
                        <option value="1">Vermelho</option>
                        <option value="2">Azul</option>
                        <option value="3">Preto</option>
                    </select>
                </div>
                <div class="input-box">
                    <label for="l2-pattern-${nBloco}">Padrão Lâmina 2</label>
                    <select name="l2-pattern-${nBloco}" id="l2-pattern-${nBloco}" disabled onchange="changePedidoView(${nBloco}, this.value)">
                        <option value="" hidden selected>Selecione</option>
                        <option value="0">Nenhum</option>
                        <option value="1">Casa</option>
                        <option value="2">Navio</option>
                        <option value="3">Estrela</option>
                    </select>
                </div>
            </div>
            <div class="input-combo">
                <div class="input-box">
                    <label for="l3-color-${nBloco}">Cor Lâmina 3</label>
                    <select name="l3-color-${nBloco}" id="l3-color-${nBloco}" disabled onchange="changePedidoView(${nBloco}, this.value)">
                        <option value="" hidden selected>Selecione</option>
                        <option value="1">Vermelho</option>
                        <option value="2">Azul</option>
                        <option value="3">Preto</option>
                    </select>
                </div>
                <div class="input-box">
                    <label for="l3-pattern-${nBloco}">Padrão Lâmina 3</label>
                    <select name="l3-pattern-${nBloco}" id="l3-pattern-${nBloco}" disabled onchange="changePedidoView(${nBloco}, this.value)">
                        <option value="" hidden selected>Selecione</option>
                        <option value="0">Nenhum</option>
                        <option value="1">Casa</option>
                        <option value="2">Navio</option>
                        <option value="3">Estrela</option>
                    </select>
                </div>
            </div>
        `;

        container.appendChild(blocoDiv);
        verBlocosMontados();
    }
}

function verBlocosMontados() {
    const tipo = document.getElementById("tipoPedido").value;
    const andares = tipo === "simples" ? 1 : tipo === "duplo" ? 2 : 3;

    for (let i = 1; i <= 3; i++) {
        document.getElementById(`divAlturaAndar${i}`).style.zIndex = `${5 + (i - 1) * 6}`;
        document.getElementById(`divAlturaLaminaAndar${i}Pos1`).style.zIndex = `${6 + (i - 1) * 6}`;
        document.getElementById(`divAlturaLaminaAndar${i}Pos3`).style.zIndex = `${7 + (i - 1) * 6}`;
        document.getElementById(`divAlturaLaminaAndar${i}Pos2`).style.zIndex = `${8 + (i - 1) * 6}`;
        document.getElementById(`divAlturaPadraoAndar${i}Pos1`).style.zIndex = `${9 + (i - 1) * 6}`;
        document.getElementById(`divAlturaPadraoAndar${i}Pos2`).style.zIndex = `${10 + (i - 1) * 6}`;
    }

    document.getElementById("divAlturaTampa").style.zIndex = "23";
    document.getElementById("tampa").src = andares ? "assets/bloco/rTampa1.png" : "assets/bloco/rBlocoCor0.png";

    function aplicarFiltroPadrao(padraoElement, corLamina) {
        if (corLamina === "3" || corLamina === "preto") {
            // Força o padrão a ser branco (usando brightness(0) invert(1))
            padraoElement.style.filter = "brightness(0) invert(1)";
            // Opcional: aumenta o contraste para garantir que fique branco puro
            padraoElement.style.contrast = "1000%";
        } else {
            // Remove qualquer filtro para outras cores
            padraoElement.style.filter = "none";
            padraoElement.style.contrast = "100%";
        }
    }
    const setBlockColor = (num) => {
        const block = document.getElementById(`block-color-${num}`);
        if (block) {
            const cor = block.value;
            const corId = cor === "nenhum" ? 0 : cor === "preto" ? 1 : cor === "vermelho" ? 2 : 3;
            document.getElementById(`andar${num}Pedido`).src = `assets/bloco/rBlocoCor${corId}.png`;
        }
    };

    const setLamina = (lado, pos, andar) => {
        const lamina = document.getElementById(`${lado}-color-${andar}`);
        const laminaElem = document.getElementById(`pos${pos}andar${andar}Pedido`);
        if (lamina && laminaElem && lamina.value) {
            laminaElem.src = `assets/laminas/lamina${pos}-${lamina.value}.png`;
        } else if (laminaElem) {
            laminaElem.src = 'assets/placeholder.png';
        }
    };

    const setPadrao = (lado, posVisual, andar) => {
        const padraoInput = document.getElementById(`${lado}-pattern-${andar}`);
        const padraoElem = document.getElementById(`padrao${posVisual}andar${andar}Pedido`);
        const laminaColor = document.getElementById(`${lado}-color-${andar}`)?.value;

        if (!padraoElem) return;

        // Se o bloco NÃO estiver girado e for o lado l1, sempre aplica padrão se tiver valor
        if (!isSpunBlocoMontado && lado === 'l1') {
            const valor = padraoInput && padraoInput.value ? padraoInput.value : '0';
            const posFinal = (posVisual === 3) ? 1 : posVisual;
            if (valor !== "0" && valor !== "nenhum") {
                padraoElem.src = `assets/padroes/rpadrao${valor}-${posFinal}.png`;
                aplicarFiltroPadrao(padraoElem, laminaColor);
            } else {
                padraoElem.src = 'assets/placeholder.png';
                padraoElem.style.filter = "none";
            }
            return;
        }

        // Se estiver girado ou for outro lado, segue regra padrão
        if (padraoInput && padraoInput.value && padraoInput.value !== "0" && padraoInput.value !== "nenhum") {
            const posFinal = (posVisual === 3) ? 1 : posVisual;
            padraoElem.src = `assets/padroes/rpadrao${padraoInput.value}-${posFinal}.png`;
            aplicarFiltroPadrao(padraoElem, laminaColor);
        } else {
            padraoElem.src = 'assets/placeholder.png';
            padraoElem.style.filter = "none";
        }
    };

    const getVisualPos = (lado) => {
        if (!isSpunBlocoMontado) {
            if (lado === 'l1') return 1;
            if (lado === 'l2') return 2;
            if (lado === 'l3') return 3;
        } else {
            if (lado === 'l1') return 3;
            if (lado === 'l2') return 2;
            if (lado === 'l3') return 1;
        }
    };

    for (let i = 1; i <= 3; i++) {
        setBlockColor(i);

        ["l1", "l2", "l3"].forEach(lado => {
            const pos = getVisualPos(lado);
            setLamina(lado, pos, i);
            setPadrao(lado, pos, i);
        });
    }

    const alturaImagem = document.getElementById("andar1Pedido").offsetHeight;
    const fatorMultiplicador = 0.445;

    const alturas = [
        "38px",
        `${1 * fatorMultiplicador * alturaImagem}px`,
        `${2 * fatorMultiplicador * alturaImagem}px`,
        `${3 * fatorMultiplicador * alturaImagem}px`
    ];

    document.getElementById("divAlturaTampa").style.top = alturas[0];

    for (let i = 1; i <= 3; i++) {
        const altura = alturas[andares - i + 1];
        const display = i <= andares ? 'block' : 'none';

        document.getElementById(`divAlturaAndar${i}`).style.top = altura;
        document.getElementById(`divAlturaAndar${i}`).style.display = display;

        ["LaminaAndar", "PadraoAndar"].forEach(tipo => {
            for (let pos of [1, 2, 3]) {
                const elem = document.getElementById(`divAltura${tipo}${i}Pos${pos}`);
                if (elem) {
                    elem.style.top = altura;
                    elem.style.display = display;
                }
            }
        });
    }
}
// Atualiza a visualização do pedido
function changePedidoView(id, lamina) {
    const blockColor = document.getElementById("block-color-" + id).value;

    // Função auxiliar para aplicar filtro invert no PADRÃO se a lâmina for preta (cor "5")
    function aplicarFiltroPadrao(padraoElement, corLamina) {
        if (corLamina === "3") { // Assumindo que "5" é o valor para preto
            padraoElement.style.filter = "invert(100%)";
        } else {
            padraoElement.style.filter = "none";
        }
    }

    if (blockColor !== "") {
        const idCor = (blockColor === "preto" ? 1 : blockColor === "vermelho" ? 2 : 3);
        document.getElementById("bloco-" + id).src = "assets/bloco/rBlocoCor" + idCor + ".png";

        ["l1-color-", "l2-color-", "l3-color-"].forEach(prefix => {
            document.getElementById(prefix + id).disabled = false;
        });

        const l1Color = document.getElementById("l1-color-" + id).value;
        const l2Color = document.getElementById("l2-color-" + id).value;
        const l3Color = document.getElementById("l3-color-" + id).value;

        // Aplica filtro branco nos padrões quando a lâmina é preta
        if (l1Color === "3") {
            aplicarFiltroPadrao(document.getElementById("padrao" + id + "-1"), l1Color);
        }
        if (l2Color === "3") {
            aplicarFiltroPadrao(document.getElementById("padrao" + id + "-2"), l2Color);
        }
        if (l3Color === "3") {
            aplicarFiltroPadrao(document.getElementById("padrao" + id + "-3"), l3Color);
        }



        const l1Pattern = document.getElementById("l1-pattern-" + id).value;
        const l2Pattern = document.getElementById("l2-pattern-" + id).value;
        const l3Pattern = document.getElementById("l3-pattern-" + id).value;

        const view = document.getElementById("pedido-view" + id);
        const isSpun = view.dataset.isSpun === "true";

        const placeholder = "assets/laminas/placeholder.png";

        if (isSpun) {
            const lamina1 = document.getElementById("lamina" + id + "-3");
            lamina1.src = l1Color ? `assets/laminas/lamina3-${l1Color}.png` : placeholder;
            
            const lamina3 = document.getElementById("lamina" + id + "-1");
            lamina3.src = l3Color ? `assets/laminas/lamina1-${l3Color}.png` : placeholder;

            const padrao3 = document.getElementById("padrao" + id + "-3");
            padrao3.src = l3Pattern ? `assets/padroes/padrao${l3Pattern}-1.png` : placeholder;
            padrao3.hidden = false;
            aplicarFiltroPadrao(padrao3, l3Color);

            const padrao1 = document.getElementById("padrao" + id + "-1");
            padrao1.src = l1Pattern ? `assets/padroes/padrao${l1Pattern}-1.png` : placeholder;
            padrao1.hidden = true;
            aplicarFiltroPadrao(padrao1, l1Color);
        } else {
            const lamina1 = document.getElementById("lamina" + id + "-1");
            lamina1.src = l1Color ? `assets/laminas/lamina1-${l1Color}.png` : placeholder;
            
            const lamina3 = document.getElementById("lamina" + id + "-3");
            lamina3.src = l3Color ? `assets/laminas/lamina3-${l3Color}.png` : placeholder;

            const padrao1 = document.getElementById("padrao" + id + "-1");
            padrao1.src = l1Pattern ? `assets/padroes/padrao${l1Pattern}-1.png` : placeholder;
            padrao1.hidden = false;
            aplicarFiltroPadrao(padrao1, l1Color);

            const padrao3 = document.getElementById("padrao" + id + "-3");
            padrao3.src = l3Pattern ? `assets/padroes/padrao${l3Pattern}-1.png` : placeholder;
            padrao3.hidden = true;
            aplicarFiltroPadrao(padrao3, l3Color);
        }

        const lamina2 = document.getElementById("lamina" + id + "-2");
        lamina2.src = l2Color ? `assets/laminas/lamina2-${l2Color}.png` : placeholder;

        const padrao2 = document.getElementById("padrao" + id + "-2");
        padrao2.src = l2Pattern ? `assets/padroes/padrao${l2Pattern}-2.png` : placeholder;
        aplicarFiltroPadrao(padrao2, l2Color);

        ["l1-pattern-", "l2-pattern-", "l3-pattern-"].forEach((prefix, index) => {
            const color = [l1Color, l2Color, l3Color][index];
            document.getElementById(prefix + id).disabled = !color;
        });

    } else {
        const placeholder = "assets/laminas/placeholder.png";
        ["l1-color-", "l2-color-", "l3-color-", "l1-pattern-", "l2-pattern-", "l3-pattern-"].forEach(prefix => {
            document.getElementById(prefix + id).disabled = true;
        });

        document.getElementById("bloco-" + id).src = "assets/bloco/rBlocoCor0.png";

        ["lamina", "padrao"].forEach(prefix => {
            for (let i = 1; i <= 3; i++) {
                const elem = document.getElementById(prefix + id + "-" + i);
                elem.src = placeholder;
                if (prefix === "padrao") {
                    elem.style.filter = "none"; // Remove filtro apenas dos padrões
                }
            }
        });
    }

    verBlocosMontados();
}

// Variável para controle do giro
let isSpun = false;

// Gira o pedido (espelha as lâminas/padrões 1 e 3)
function spin(id) {
    const view = document.getElementById("pedido-view" + id);
    view.classList.toggle("spin");

    const isSpun = view.dataset.isSpun !== "true";
    view.dataset.isSpun = isSpun;

    const lamina1 = document.getElementById("lamina" + id + "-1");
    const lamina3 = document.getElementById("lamina" + id + "-3");

    // Extrai apenas o nome do arquivo (ignorando o caminho completo)
    const extractFilename = (src) => {
        const matches = src.match(/([^\/]+\.png)$/);
        return matches ? matches[0] : src;
    };

    const src1 = extractFilename(lamina1.src);
    const src3 = extractFilename(lamina3.src);

    // Troca apenas a parte do nome do arquivo que precisa mudar
    const newSrc3 = src1.replace(/lamina\d-(\d)/, 'lamina3-$1');
    const newSrc1 = src3.replace(/lamina\d-(\d)/, 'lamina1-$1');

    // Mantém o caminho base correto
    const basePath = "assets/laminas/";
    lamina1.src = basePath + newSrc1;
    lamina3.src = basePath + newSrc3;

    document.getElementById("padrao" + id + "-3").hidden = !isSpun;
    document.getElementById("padrao" + id + "-1").hidden = isSpun;
}

// Variável para controle do giro
let isSpunBlocoMontado = false;

function spinBlocoMontado() {
    const view = document.getElementById("pedido-viewBlocoMontado");
    view.classList.toggle("spinAtivo");

    isSpunBlocoMontado = view.dataset.isSpunBlocoMontado !== "true";
    view.dataset.isSpunBlocoMontado = isSpunBlocoMontado;

    const andares = [1, 2, 3];

    andares.forEach(andar => {
        const lamina1 = document.getElementById(`pos1andar${andar}Pedido`);
        const lamina3 = document.getElementById(`pos3andar${andar}Pedido`);

        if (lamina1 && lamina3) {
            const src1 = lamina1.src;
            const src3 = lamina3.src;

            const newSrc3 = src1.replace(/lamina\d-(\d)/, `lamina3-$1`);
            const newSrc1 = src3.replace(/lamina\d-(\d)/, `lamina1-$1`);

            lamina1.src = newSrc1;
            lamina3.src = newSrc3;
        }

        const padrao1 = document.getElementById(`padrao1andar${andar}Pedido`);
        const padrao3 = document.getElementById(`padrao3andar${andar}Pedido`);

        //if (padrao1 && padrao3) {
        //    padrao1.hidden = !isSpunBlocoMontado;
        //  padrao3.hidden = isSpunBlocoMontado;

        //}
    });

    verBlocosMontados();
}

// Envia pedido para a base de dados
// Envia pedido para a base de dados
function enviarPedido() {
    const tipo = document.getElementById("tipoPedido").value;
    const blocos = document.querySelectorAll(".bloco[id^='bloco-container-']"); // More specific selector

    // Validate if there are blocks
    if (blocos.length === 0) {
        alert("Nenhum bloco encontrado para enviar!");
        return;
    }

    const pedido = {
        tipo: tipo,
        blocos: []
    };

    blocos.forEach((bloco, index) => {
        const numBloco = index + 1;
        const corInput = document.getElementById("block-color-" + numBloco);

        // Skip if block color is not selected
        if (!corInput || corInput.value === "nenhum") {
            return;
        }

        const laminas = [];
        const laminaInputs = [
            { color: "l1-color-", pattern: "l1-pattern-" },
            { color: "l2-color-", pattern: "l2-pattern-" },
            { color: "l3-color-", pattern: "l3-pattern-" }
        ];

        laminaInputs.forEach((input, i) => {
            const colorInput = document.getElementById(input.color + numBloco);
            const patternInput = document.getElementById(input.pattern + numBloco);

            // Only add if color is selected
            if (colorInput && colorInput.value) {
                laminas.push({
                    cor: colorInput.value,
                    padrao: patternInput ? patternInput.value || "0" : "0"
                });
            }
        });

        pedido.blocos.push({
            cor: corInput.value,
            laminas: laminas
        });
    });

    // Validate if we have at least one block with color selected
    if (pedido.blocos.length === 0) {
        alert("Por favor, selecione pelo menos um bloco com cor definida!");
        return;
    }

    fetch("/store/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([pedido])
    }).then(res => {
        if (res.ok) {
            alert("Pedido enviado com sucesso!");
            // Optionally reset the form
            renderBlocos(); // This will reset to initial state
        } else {
            res.text().then(text => {
                alert("Erro ao enviar pedido: " + text);
            });
        }
    }).catch(error => {
        alert("Erro na conexão: " + error.message);
    });
}

/**
 * Busca, processa e exibe a lista de pedidos de blocos de construção.
 * 
 * Esta função faz uma requisição à API de pedidos e renderiza cada pedido
 * com sua representação visual correspondente.
 * 
 * Fluxo principal:
 * 1. Faz requisição GET para /store/orders
 * 2. Converte resposta para JSON
 * 3. Renderiza lista ou mensagem de vazio
 * 4. Para cada pedido, cria estrutura HTML e renderiza visualização do bloco
 * 5. Trata erros de requisição
 */
function listarPedidos() {
    // Faz requisição GET para o endpoint de pedidos
    fetch("/store/orders")
        // Converte a resposta para JSON
        .then(response => response.json())
        // Processa os dados recebidos
        .then(data => {
            // Obtém referência do container principal da lista
            const listaContainer = document.getElementById("listaPedidos");
            // Limpa o conteúdo anterior
            listaContainer.innerHTML = "";

            // Verifica se a lista de pedidos está vazia
            if (data.length === 0) {
                // Exibe mensagem de lista vazia
                listaContainer.innerHTML = "<p>Nenhum pedido encontrado.</p>";
                return; // Encerra a execução
            }

            // Itera sobre cada pedido recebido
            data.forEach((pedido, index) => {
                // Cria container individual para o pedido
                const pedidoDiv = document.createElement("div");
                // Adiciona classe CSS para estilização
                pedidoDiv.classList.add("pedido-container");
                
                // Define o conteúdo HTML do container do pedido:
                // - Título com número e tipo do pedido
                // - Container vazio para a representação visual do bloco
                pedidoDiv.innerHTML = `
                    <h3>Pedido ${index + 1} - Tipo: ${pedido.tipo}</h3>
                    <div class="bloco-container" id="bloco-pedido-${index}"></div>
                `;

                // Adiciona o pedido à lista principal
                listaContainer.appendChild(pedidoDiv);
                
                // Renderiza a representação visual do bloco:
                // - Utiliza a função renderizarBlocoUnico definida em outro lugar
                // - Passa o objeto pedido e o índice para identificação única
                renderizarBlocoUnico(pedido, index);
            });
        })
        // Tratamento de erros na requisição
        .catch(() => {
            // Exibe alerta genérico em caso de falha
            alert("Erro ao carregar pedidos.");
        });
}

function renderizarBlocoUnico(pedido, pedidoIndex) {
    const container = document.getElementById(`bloco-pedido-${pedidoIndex}`);
    const tipo = pedido.tipo;
    const andares = tipo === "simples" ? 1 : tipo === "duplo" ? 2 : 3;
    
    container.innerHTML = '';

    const pedidoView = document.createElement('div');
    pedidoView.className = 'pedido-view spin';
    pedidoView.id = `pedido-${pedidoIndex}-viewBlocoMontado`;
    pedidoView.dataset.isSpun = "false";
    container.appendChild(pedidoView);

    const relativeContainer = document.createElement('div');
    relativeContainer.className = 'relative1';
    pedidoView.appendChild(relativeContainer);

    const zIndexConfig = {
        tampa: 100,
        andar: i => 21 + ((i - 1) * 3),
        lamina: (i, pos) => {
            if (pos === 1) return 22 + ((i - 1) * 3);
            if (pos === 2) return 24 + ((i - 1) * 3);
            if (pos === 3) return 23 + ((i - 1) * 3);
        },
        padrao: (i, pos) => 25 + ((i - 1) * 3) + pos
    };

    const alturaImagem = 147;
    const fatorMultiplicador = 0.445;
    const alturas = [
        `38px`,
        `${1 * fatorMultiplicador * alturaImagem}px`,
        `${2 * fatorMultiplicador * alturaImagem}px`,
        `${3 * fatorMultiplicador * alturaImagem}px`
    ];

    // Tampa
    const tampaDiv = document.createElement('div');
    tampaDiv.id = `pedido-${pedidoIndex}-divAlturaTampa`;
    tampaDiv.className = 'absolute0';
    tampaDiv.style.zIndex = zIndexConfig.tampa;
    tampaDiv.style.top = alturas[0];
    relativeContainer.appendChild(tampaDiv);

    const tampaImg = document.createElement('img');
    tampaImg.className = 'imagemBlocoMontado';
    tampaImg.id = `pedido-${pedidoIndex}-tampa`;
    tampaImg.src = 'assets/bloco/rTampa1.png';
    tampaImg.alt = 'tampa';
    tampaDiv.appendChild(tampaImg);
    
    // Andares
    for (let andarNum = 3; andarNum >= 1; andarNum--) {
        const blocoAndar = pedido.blocos[andarNum - 1] || {};
        const mostrarAndar = andarNum <= andares;

        const andarDiv = document.createElement('div');
        andarDiv.id = `pedido-${pedidoIndex}-divAlturaAndar${andarNum}`;
        andarDiv.className = 'absolute0';
        andarDiv.style.zIndex = zIndexConfig.andar(andarNum);
        andarDiv.style.display = mostrarAndar ? 'block' : 'none';
        
        let posicaoTop;
        if (andares === 1) {
            posicaoTop = alturas[1];
        } else if (andares === 2) {
            posicaoTop = alturas[3 - andarNum];
        } else {
            posicaoTop = alturas[4 - andarNum];
        }
        andarDiv.style.top = posicaoTop;
        
        relativeContainer.appendChild(andarDiv);

        // Bloco base
        const andarImg = document.createElement('img');
        andarImg.className = 'imagemBlocoMontado';
        andarImg.id = `pedido-${pedidoIndex}-andar${andarNum}Pedido`;
        andarImg.alt = 'bloco';
        
        const corBloco = blocoAndar.cor || "branco";
        const corId = corBloco === "preto" ? 1 : corBloco === "vermelho" ? 2 : 3;
        andarImg.src = `assets/bloco/rBlocoCor${corId}.png`;
        andarDiv.appendChild(andarImg);

        // Lâminas e padrões
        for (let pos = 1; pos <= 3; pos++) {
            const lamina = (blocoAndar.laminas || [])[pos - 1] || {};
            const posFinal = pos === 3 ? 1 : pos;

            // Lâmina
            const laminaDiv = document.createElement('div');
            laminaDiv.id = `pedido-${pedidoIndex}-divAlturaLaminaAndar${andarNum}Pos${pos}`;
            laminaDiv.className = 'absolute0';
            laminaDiv.style.zIndex = zIndexConfig.lamina(andarNum, pos);
            laminaDiv.style.display = mostrarAndar ? 'block' : 'none';
            laminaDiv.style.top = posicaoTop;
            relativeContainer.appendChild(laminaDiv);

            const laminaImg = document.createElement('img');
            laminaImg.className = 'imagemBlocoMontado';
            laminaImg.id = `pedido-${pedidoIndex}-pos${pos}andar${andarNum}Pedido`;
            laminaImg.alt = `Lamina${pos}`;
            // Verificação para placeholder
            laminaImg.src = lamina && lamina.cor ? `assets/laminas/lamina${pos}-${lamina.cor}.png` : 'assets/placeholder.png';
            laminaDiv.appendChild(laminaImg);
            // Padrão

            const padraoDiv = document.createElement('div');
            padraoDiv.id = `pedido-${pedidoIndex}-divAlturaPadraoAndar${andarNum}Pos${pos}`;
            padraoDiv.className = 'absolute0';
            padraoDiv.style.zIndex = zIndexConfig.padrao(andarNum, pos);
            padraoDiv.style.display = mostrarAndar ? 'block' : 'none';
            padraoDiv.style.top = posicaoTop;
            relativeContainer.appendChild(padraoDiv);

            const padraoImg = document.createElement('img');
            padraoImg.className = 'imagemBlocoMontado2';
            padraoImg.id = `pedido-${pedidoIndex}-padrao${pos}andar${andarNum}Pedido`;
            padraoImg.alt = `Padrao${pos}`;

            if (lamina && lamina.padrao && lamina.padrao !== "nenhum" && lamina.padrao !== "0") {
                padraoImg.src = `assets/padroes/rpadroes${lamina.padrao}-${posFinal}.png`;
                aplicarFiltroPadrao(padraoImg, lamina.cor);
                
                // Esconde especificamente o padrão na posição 3
                if (pos === 3) {
                    padraoDiv.style.display = 'none';
                }
                } else {
                padraoImg.src = 'assets/placeholder.png';
                padraoImg.style.filter = "none";
            }
            padraoDiv.appendChild(padraoImg);

        }
    }
                const spinButton = criarBotaoGiro(pedidoIndex);
                relativeContainer.appendChild(spinButton);
}

function criarBotaoGiro(pedidoIndex) {
    const button = document.createElement('button');
    button.id = `spinBlocoMontado-${pedidoIndex}`;
    button.className = 'spin';
    button.innerHTML = '<span class="material-symbols-rounded">chevron_right</span>';
    
    button.addEventListener('click', function(e) {
        e.stopPropagation();
        spinBlocoUnico(pedidoIndex);
    });
    
    return button;
}




function spinBlocoUnico(pedidoIndex) {
    const view = document.getElementById(`pedido-${pedidoIndex}-viewBlocoMontado`);
    view.classList.toggle("spinAtivo");

    const isSpun = view.dataset.isSpun !== "true";
    view.dataset.isSpun = isSpun;

    const andares = [1, 2, 3];

    andares.forEach(andar => {
        const lamina1 = document.getElementById(`pedido-${pedidoIndex}-pos1andar${andar}Pedido`);
        const lamina3 = document.getElementById(`pedido-${pedidoIndex}-pos3andar${andar}Pedido`);

        if (lamina1 && lamina3) {
            // Função para extrair apenas o nome do arquivo
            const extractFilename = (src) => {
                const matches = src.match(/([^\/]+\.png)$/);
                return matches ? matches[0] : src;
            };

            // Salva os filtros atuais
            const filter1 = lamina1.style.filter;
            const filter3 = lamina3.style.filter;
            
            // Extrai apenas o nome do arquivo
            const src1 = extractFilename(lamina1.src);
            const src3 = extractFilename(lamina3.src);

            // Troca apenas a parte necessária do nome do arquivo
            const newSrc3 = src1.replace(/lamina\d-(\d)/, 'lamina3-$1');
            const newSrc1 = src3.replace(/lamina\d-(\d)/, 'lamina1-$1');

            // Mantém o caminho base correto
            const basePath = "assets/laminas/";
            lamina1.src = basePath + newSrc1;
            lamina3.src = basePath + newSrc3;
            
            // Troca os filtros também
            lamina1.style.filter = filter3;
            lamina3.style.filter = filter1;
        }

        const padrao1 = document.getElementById(`pedido-${pedidoIndex}-padrao1andar${andar}Pedido`);
        const padrao3 = document.getElementById(`pedido-${pedidoIndex}-padrao3andar${andar}Pedido`);

        if (padrao1 && padrao3) {
            // Função similar para os padrões
            const extractFilename = (src) => {
                const matches = src.match(/([^\/]+\.png)$/);
                return matches ? matches[0] : src;
            };

            // Salva os filtros atuais
            const filterPadrao1 = padrao1.style.filter;
            const filterPadrao3 = padrao3.style.filter;
            
            // Extrai apenas o nome do arquivo
            const srcPadrao1 = extractFilename(padrao1.src);
            const srcPadrao3 = extractFilename(padrao3.src);

            // Troca apenas a parte necessária do nome do arquivo
            const newSrcPadrao3 = srcPadrao1.replace(/rpadrao(\d)-1/, 'rpadrao$1-3');
            const newSrcPadrao1 = srcPadrao3.replace(/rpadrao(\d)-3/, 'rpadrao$1-1');

            // Mantém o caminho base correto
            const basePath = "assets/padroes/";
            padrao1.src = basePath + newSrcPadrao1;
            padrao3.src = basePath + newSrcPadrao3;
            
            // Troca os filtros também
            padrao1.style.filter = filterPadrao3;
            padrao3.style.filter = filterPadrao1;
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("blocosContainer") && document.getElementById("tipoPedido")) {
        renderBlocos();
    }

    if (document.getElementById("listaPedidos")) {
        listarPedidos();
    }
});
window.onload = renderBlocos;