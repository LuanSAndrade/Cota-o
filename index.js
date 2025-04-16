const express = require('express');
const axios = require('axios');
const cors = require('cors'); 
require('dotenv').config();

const app = express();
app.use(cors()); 
app.use(express.json());

const ACCESS_KEY = process.env.ACCESS_KEY;

const cache = [];

app.get('/cotacao', async (req, res) => {
    const base = req.query.base || 'USD';
    const symbols = req.query.symbols || '';
    const url = `https://api.exchangerate.host/live?access_key=${ACCESS_KEY}&base=${base}&symbols=${symbols}`;
    
    try {
        const response = await axios.get(url);
        if (response.data.success) {
            const quotes = Object.entries(response.data.quotes);

            const formattedQuotes = quotes.map(([symbol, rate]) => {
                const correctedSymbol = symbol.startsWith('USD') ? symbol.replace('USD', base) : symbol; 
                return `<li><strong>${correctedSymbol}</strong>: ${rate.toFixed(4)}</li>`;
            }).join('');

            res.send(`
                <div class="cotacoes-container">
                    <ul class="lista-cotacoes">
                        ${formattedQuotes}
                    </ul>
                </div>
            `);
        } else {
            res.status(500).send('Erro ao buscar cotações.');
        }
    } catch (error) {
        res.status(500).send(`Erro: ${error.message}`);
    }
});

app.post('/cotacao', (req, res) => {
    const { base, symbols, rate } = req.body;
    if (base && symbols && rate) {
        cache.push({ base, symbols, rate, date: new Date() });
        res.status(201).json({ message: 'Cotação registrada com sucesso!' });
    } else {
        res.status(400).json({ error: 'Dados da cotação inválidos' });
    }
});

app.get('/historico', (req, res) => {
    if (cache.length === 0) {
        res.send('<h2>Histórico vazio</h2>');
    } else {
        const formattedHistory = cache.map(entry => `
            <li class="historico-lista">
                <div><strong>Base:</strong> ${entry.base}</div>
                <div><strong>Moeda:</strong> ${entry.symbols}</div>
                <div><strong>Taxa:</strong> ${entry.rate}</div>
                <div><strong>Data:</strong> ${new Date(entry.date).toLocaleString()}</div>
            </li>
        `).join('');
        
        res.send(`
            <ul class="historico-lista">
                ${formattedHistory}
            </ul>
        `);
    }
});

app.get('/moedas', async (req, res) => {
    const url = `https://api.exchangerate.host/list?access_key=${ACCESS_KEY}`; 

    try {
        const response = await axios.get(url);
        if (response.data && response.data.success) {
            res.json(response.data.currencies); 
        } else {
            res.status(500).json({ error: 'Não foi possível buscar a lista de moedas.' });
        }
    } catch (error) {
        console.error('Erro ao conectar com a API pública:', error.message);
        res.status(500).json({ error: error.message });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://127.0.0.1:${PORT}`);
});
