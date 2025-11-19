const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:8080'  // Permite só do frontend
}));

const pool = new Pool({
    user: 'postgres',
    host: 'db',
    database: 'biblioteca',
    password: 'password',
    port: 5432,
});

// Endpoint para consultar livros (GET /books)
app.get('/books', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM livros');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Endpoint para cadastrar livro (POST /books)
app.post('/books', async (req, res) => {
    const { titulo, autor, ano } = req.body;
    if (!titulo || !autor || !ano) {
        return res.status(400).json({ error: 'Campos obrigatórios faltando' });
    }
    try {
        await pool.query('INSERT INTO livros (titulo, autor, ano) VALUES ($1, $2, $3)', [titulo, autor, ano]);
        res.status(201).json({ message: 'Livro cadastrado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(port, () => {
    console.log(`Backend rodando na porta ${port}`);
});