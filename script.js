document.getElementById('getCotacaoForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const base = document.getElementById('base').value || 'USD'; 
    const symbols = document.getElementById('symbols').value || ''; 
    const url = `http://127.0.0.1:5000/cotacao?base=${base}&symbols=${symbols}`;

    const resultDiv = document.getElementById('getCotacaoResult');
    resultDiv.innerHTML = 'Carregando...';

    try {
        const response = await fetch(url);
        const html = await response.text();
        resultDiv.innerHTML = html; 
    } catch (error) {
        resultDiv.innerText = `Erro ao buscar cotação: ${error.message}`;
    }
});

document.getElementById('postCotacaoForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const base = document.getElementById('basePost').value;
    const symbols = document.getElementById('symbolsPost').value;
    const rate = document.getElementById('rate').value;

    const url = 'http://127.0.0.1:5000/cotacao';
    const body = { base, symbols, rate };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
        const data = await response.json();

        document.getElementById('postCotacaoResult').innerText = data.message || `Erro: ${data.error}`;
    } catch (error) {
        document.getElementById('postCotacaoResult').innerText = `Erro ao registrar cotação: ${error.message}`;
    }
});

document.getElementById('getHistorico').addEventListener('click', async () => {
    const url = 'http://127.0.0.1:5000/historico';

    try {
        const response = await fetch(url);
        const data = await response.text();

        document.getElementById('historicoResult').innerHTML = data;
    } catch (error) {
        document.getElementById('historicoResult').innerText = `Erro ao buscar histórico: ${error.message}`;
    }
});

document.getElementById('verMoedas').addEventListener('click', async () => {
    const url = 'http://127.0.0.1:5000/moedas';

    try {
        const response = await fetch(url);
        const data = await response.json();

        let resultHTML = '<h4>Lista de Moedas:</h4><ul class="moedas-lista">';
        for (const [code, name] of Object.entries(data)) {
            resultHTML += `<li><strong>${code}:</strong> ${name}</li>`;
        }
        resultHTML += '</ul>';

        document.getElementById('moedasResult').innerHTML = resultHTML;
    } catch (error) {
        document.getElementById('moedasResult').innerText = `Erro ao buscar lista de moedas: ${error.message}`;
    }
});



