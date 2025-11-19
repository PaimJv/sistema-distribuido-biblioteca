# sistema-distribuido-biblioteca
A aplicação simula uma plataforma de biblioteca virtual, seguindo uma arquitetura de microserviços distribuídos. Ela é composta por três componentes principais, cada um executando em um contêiner Docker isolado, comunicando-se via APIs RESTful.

# Comandos importantes (terminal):
  docker compose up --build (iniciar a ligação)
  docker-compose down (encerrar a ligação)

  docker compose ps (
  docker compose logs frontend (logs do frontend)
  docker compose logs backend (logs do backend)

  docker compose exec frontend sh
  	ls -la /usr/share/nginx/html/  # Deve mostrar index.html, styles.css, script.js com permissões r-- (leitura para todos)
  	cat /usr/share/nginx/html/index.html  # Deve imprimir o HTML
  	cat /etc/nginx/conf.d/default.conf    # Deve mostrar o server block
  	nginx -t                              # Deve dizer "nginx: the configuration file nginx.conf syntax is ok" e "test is successful"

# Endereços utilizados para teste e verificação:
  http://localhost:8080/
  http://localhost:3000/books
