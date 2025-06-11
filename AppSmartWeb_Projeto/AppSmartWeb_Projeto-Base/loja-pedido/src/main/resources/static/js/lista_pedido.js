document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.btn-excluir').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const pedidoId = this.getAttribute('data-id');
            
            if(confirm('Tem certeza que deseja excluir este pedido?')) {
                fetch(`/api/pedidos/${pedidoId}`, {
                    method: 'DELETE'
                })
                .then(response => {
                    if(response.ok) {
                        alert('Pedido excluído com sucesso!');
                        window.location.reload();
                    } else {
                        throw new Error('Falha ao excluir');
                    }
                })
                .catch(error => {
                    alert('Erro: ' + error.message);
                });
            }
        });
    });
});