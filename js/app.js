function carregarPagina(pagina) {
  fetch(`pages/${pagina}`)
    .then(res => res.text())
    .then(html => {
      document.getElementById('app').innerHTML = html;
      localStorage.setItem('paginaAtual', pagina); // Salva a página atual
    })
    .catch(err => console.error('Erro ao carregar página:', err));
}

// Ao iniciar, carrega a última página visitada ou a tela de login
window.addEventListener('DOMContentLoaded', () => {
  const ultimaPagina = localStorage.getItem('paginaAtual') || 'login.html';
  carregarPagina(ultimaPagina);
});
