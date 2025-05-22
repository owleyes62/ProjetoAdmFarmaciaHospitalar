function carregarPagina(pagina) {
  fetch(`pages/${pagina}`)
    .then(res => res.text())
    .then(html => {
      document.getElementById('app').innerHTML = html;

      // Após o HTML ser carregado, configurar eventos da página específica
      if (pagina === 'login.html') configurarLogin();
      if (pagina === 'paciente.html') configurarPaciente();
      if (pagina === 'config.html') configurarConfig();
      // Adicione mais se precisar
    })
    .catch(err => console.error('Erro ao carregar página:', err));
}

// Sempre iniciar na tela de login
window.addEventListener('DOMContentLoaded', () => {
  carregarPagina('login.html');
});

function configurarLogin() {
  const form = document.getElementById('login-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault(); // Impede o envio do formulário
      carregarPagina('pacientes.html');
    });
  }
}


function configurarPaciente() {
  const btnConfig = document.getElementById('btn-config');
  if (btnConfig) {
    btnConfig.addEventListener('click', () => {
      carregarPagina('config.html');
    });
  }
}

