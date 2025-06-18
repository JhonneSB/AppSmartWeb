document.addEventListener('DOMContentLoaded', () => {
    const wifiStatus = document.querySelector('.wifi-status');
    const wifiDiv = document.querySelector('.wifi-fixed');

    const status = sessionStorage.getItem("bancadaConectada");

    if (status === "true") {
        wifiStatus.textContent = "Conectado";
        wifiDiv.style.color = "#00ff0f";
        wifiDiv.style.border = "2px solid #00ff0f";
    } else if (status === "pausado") {
        wifiStatus.textContent = "Pausado";
        wifiDiv.style.color = "yellow";
        wifiDiv.style.border = "2px solid yellow";
    } else {
        wifiStatus.textContent = "Desconectado";
        wifiDiv.style.color = "red";
        wifiDiv.style.border = "2px solid red";
    }
});