document.addEventListener("DOMContentLoaded", () => {
    const descricao = document.getElementById('descricao-dinamica');
    const textoEtapa = document.getElementById("etapa-texto");
    const stepper = document.getElementById("stepper");

    const etapas = [
        "Retirando Bloco da Bancada de Estoque",
        "Esteira Movendo Bloco para Bancada de Montagem",
        "Colocando as Lâminas no Bloco",
        "Reposicionando Bloco para Esteira",
        "Esteira Movendo Bloco para Bancada de Expedição",
        "Reposiciona Bloco da Esteira para Bancada de Expedição"
    ];

    // Cria visualmente as etapas
    etapas.forEach((etapa, index) => {
        const step = document.createElement('div');
        step.classList.add('step');
        step.innerHTML = `
            <div class="circle">${index + 1}</div>
            <p>${etapa}</p>
        `;
        stepper.appendChild(step);
    });

    const stepElements = document.querySelectorAll('.step');
    let etapaAtual = 0;

    function iniciarEtapas() {
        if (etapaAtual < etapas.length) {
            textoEtapa.textContent = etapas[etapaAtual];

            // Atualiza os estilos visuais
            stepElements.forEach((step, index) => {
                step.classList.remove('completed', 'active');
                if (index < etapaAtual) step.classList.add('completed');
                if (index === etapaAtual) step.classList.add('active');
            });

            // Passa para a próxima etapa
            setTimeout(() => {
                etapaAtual++;
                iniciarEtapas();
            }, 3000);
        } else {
            textoEtapa.textContent = "Processo de montagem concluído.";
            stepElements.forEach((step, index) => {
                if (index < etapaAtual) step.classList.add('completed');
            });
        }
    }

    iniciarEtapas();

    // Eventos de hover nas imagens da bancada
    document.querySelectorAll('.bancada-item img').forEach(img => {
        img.addEventListener('mouseenter', () => {
            descricao.textContent = img.dataset.descricao;
        });
        img.addEventListener('mouseleave', () => {
            descricao.textContent = 'Passe o mouse sobre uma área da bancada para ver a descrição.';
        });
    });
});
