const link = 'http://localhost:3000/books'

document.getElementById('form-cadastro').addEventListener('submit', async (e) => {
    e.preventDefault();
    const titulo = document.getElementById('titulo').value;
    const autor = document.getElementById('autor').value;
    const ano = document.getElementById('ano').value;
    
    try {
        const response = await fetch(link, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ titulo, autor, ano })
        });
        if (response.ok) {
            alert('Livro cadastrado com sucesso!');
            carregarLivros();
        } else {
            alert('Erro ao cadastrar livro.');
        }
    } catch (error) {
        alert('Erro de rede: ' + error.message);
    }
});

document.getElementById('btn-consultar').addEventListener('click', carregarLivros);

async function carregarLivros() {
    try {
        const response = await fetch(link);
        const livros = await response.json();
        const lista = document.getElementById('lista-livros');
        lista.innerHTML = '';
        livros.forEach(livro => {
            const li = document.createElement('li');
            li.textContent = `${livro.titulo} - ${livro.autor} (${livro.ano})`;
            lista.appendChild(li);
        });
    } catch (error) {
        alert('Erro ao consultar livros: ' + error.message);
    }
}

// Carregar livros ao iniciar
carregarLivros();