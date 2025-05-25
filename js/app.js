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
        if (pagina === 'relatorio.html') configurarRelatorio(); // Se necessário


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

// envio de relatorio
function configurarRelatorio() {
  const form = document.getElementById('form-relatorio');
  if (form) {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();

      const nomeFuncionario = document.getElementById('nome').value;
      const idFuncionario = parseInt(document.getElementById('id-funcionario').value);
      const dataRelatorio = document.getElementById('data').value;
      const numPacientesAtendidos = parseInt(document.getElementById('pacientes-atendidos').value);
      const numErrosMedicamento = parseInt(document.getElementById('erros-medicamento').value);
      const numErrosPessoais = parseInt(document.getElementById('erros-pessoais').value) || 0;
      const observacoes = document.getElementById('descricao-dia').value;

      const { data, error } = await supabaseClient
        .from('relatorio')
        .insert([{
          nome_funcionario: nomeFuncionario,
          id_funcionario: idFuncionario,
          data: dataRelatorio,
          num_pacientes_atendidos: numPacientesAtendidos,
          num_erros_medicamento: numErrosMedicamento,
          num_erros_pessoais: numErrosPessoais,
          observacoes: observacoes
        }]);

      if (error) {
        alert('Erro ao enviar relatório: ' + error.message);
        console.error(error);
      } else {
        alert('Relatório enviado com sucesso!');
        form.reset();
      }
    });
  }
}
