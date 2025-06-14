document.addEventListener("DOMContentLoaded", () => {
    const descricao = document.getElementById('descricao-dinamica');
    const textoEtapa = document.getElementById("etapa-texto");
    const stepper = document.getElementById("stepper");

    // ETAPAS REAIS DA BANCADA (4 etapas)
    const etapas = [
        "Estoque: Preparação do material",
        "Processo: Automação e controle",
        "Montagem: Integração dos componentes",
        "Expedição: Envio do produto final"
    ];

    // Criação visual do stepper
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

            // Atualização visual
            stepElements.forEach((step, index) => {
                step.classList.remove('completed', 'active');
                if (index < etapaAtual) step.classList.add('completed');
                if (index === etapaAtual) step.classList.add('active');
            });

            // Avança para próxima etapa após 3 segundos
            setTimeout(() => {
                etapaAtual++;
                iniciarEtapas();
            }, 3000);
        } else {
            textoEtapa.textContent = "Processo concluído com sucesso!";
            stepElements.forEach(step => step.classList.add('completed'));
        }
    }

    iniciarEtapas();

    // Hover nas imagens (opcional - mantenha se necessário)
    document.querySelectorAll('.bancada-item img').forEach(img => {
        img.addEventListener('mouseenter', () => {
            descricao.textContent = img.dataset.descricao || 'Descrição não disponível';
        });
        img.addEventListener('mouseleave', () => {
            descricao.textContent = 'Passe o mouse sobre uma área da bancada para ver detalhes.';
        });
    });
});