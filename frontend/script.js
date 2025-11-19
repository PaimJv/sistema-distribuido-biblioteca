function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

document.getElementById('form-cadastro').addEventListener('submit', async (e) => {
    e.preventDefault();
    const titulo = document.getElementById('titulo').value;
    const autor = document.getElementById('autor').value;
    const ano = document.getElementById('ano').value;
    
    try {
        const response = await fetch('http://backend:3000/books', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ titulo, autor, ano })
        });
        if (response.ok) {
            showNotification('✅ Livro cadastrado com sucesso!', 'success');
            // Limpar os campos do formulário
            document.getElementById('form-cadastro').reset();
            carregarLivros();
        } else {
            showNotification('❌ Erro ao cadastrar livro.', 'error');
        }
    } catch (error) {
        showNotification('❌ Erro de rede: ' + error.message, 'error');
    }
});

document.getElementById('btn-consultar').addEventListener('click', carregarLivros);

async function carregarLivros() {
    const lista = document.getElementById('lista-livros');
    lista.innerHTML = '<div class="loading">Carregando livros...</div>';
    
    try {
        const response = await fetch('http://backend:3000/books');
        const livros = await response.json();
        lista.innerHTML = '';
        
        if (livros.length === 0) {
            lista.innerHTML = '<div class="empty-state">📚 Nenhum livro cadastrado ainda. Adicione o primeiro!</div>';
            return;
        }
        
        livros.forEach((livro, index) => {
            const li = document.createElement('li');
            li.style.animationDelay = `${index * 0.1}s`;
            li.innerHTML = `
                <strong>${livro.titulo}</strong><br>
                <span>Autor: ${livro.autor} | Ano: ${livro.ano}</span>
            `;
            lista.appendChild(li);
        });
    } catch (error) {
        lista.innerHTML = '<div class="empty-state">❌ Erro ao consultar livros</div>';
        showNotification('❌ Erro ao consultar livros: ' + error.message, 'error');
    }
}

// Carregar livros ao iniciar
carregarLivros();
