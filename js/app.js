function carregarPagina(pagina) {
  const app = document.getElementById('app');

  // Aplica fade-out antes de trocar o conteúdo
  app.classList.add('fade-out');

  // Espera a transição terminar antes de trocar o conteúdo
  setTimeout(() => {
    fetch(`pages/${pagina}`)
      .then(res => res.text())
      .then(html => {
        app.innerHTML = html;
        localStorage.setItem('paginaAtual', pagina);

        // Aplica fade-in depois de trocar o conteúdo
        app.classList.remove('fade-out');
        app.classList.add('fade-in');

        // ⚠️ Chamar função de configuração da página carregada
        if (pagina === 'login.html') configurarLogin();
        if (pagina === 'pacientes.html') configurarPaciente();
        if (pagina === 'config.html') configurarConfig(); // Se necessário

        // Remove a classe fade-in depois de um tempo (para a próxima troca funcionar)
        setTimeout(() => {
          app.classList.remove('fade-in');
        }, 300);
      })
      .catch(err => console.error('Erro ao carregar página:', err));
  }, 300);
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

  // ⚠️ Carregar os scripts necessários da tela pacientes
  const scriptBd = document.createElement('script');
  scriptBd.src = 'js/bdConnect.js';
  document.body.appendChild(scriptBd);

  scriptBd.onload = () => {
    const scriptPaciente = document.createElement('script');
    scriptPaciente.src = 'js/paciente.js';
    document.body.appendChild(scriptPaciente);
  };
}

function configurarConfig() {
  // Código para configurar eventos da tela config (opcional)
}
