document.getElementById('idbusca').addEventListener('input', function() {
    var busca = this.value;
    fetch('/auth/busca', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ busca: busca })
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById('resultadoPesquisa').innerHTML = data;
    })
    .catch(error => {
        console.error('Erro:', error);
    });
});
