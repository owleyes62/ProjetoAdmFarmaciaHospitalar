function carregarPagina(pagina) {
  const app = document.getElementById('app');

  const [paginaLimpa, queryString] = pagina.split('?');

  // Aplica fade-out antes de trocar o conteúdo
  app.classList.add('fade-out');

  // Espera a transição terminar antes de trocar o conteúdo
  setTimeout(() => {
    fetch(`pages/${pagina.split('?')[0]}`)
      .then(res => res.text())
      .then(html => {
        app.innerHTML = html;
        localStorage.setItem('paginaAtual', pagina);

        // Aplica fade-in depois de trocar o conteúdo
        app.classList.remove('fade-out');
        app.classList.add('fade-in');

        // Reexecutar scripts após carregar HTML
        if (paginaLimpa === 'login.html') configurarLogin();
        if (paginaLimpa === 'pacientes.html') configurarPaciente();
        if (paginaLimpa === 'config.html') configurarConfig();
        if (paginaLimpa === 'relatorio.html') configurarRelatorio();
        if (paginaLimpa === 'medicamento.html') configurarMedicamento(queryString);
        if (paginaLimpa === 'entrega.html') configurarEntrega(queryString);
        if (paginaLimpa === 'prontuario.html') configurarProntuario(queryString);

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

function carregarPaginaComPaciente(pagina, pacienteId) {
  // Atualiza a URL no navegador
  window.history.pushState({}, '', `${pagina}?pacienteId=${pacienteId}`);

  // Chama o carregamento do conteúdo
  carregarPagina(`${pagina}?pacienteId=${pacienteId}`);
}

function configurarMedicamento(queryString) {
  const scriptBd = document.createElement('script');
  scriptBd.src = 'js/bdConnect.js';
  document.body.appendChild(scriptBd);

  scriptBd.onload = () => {
    const scriptMedicamento = document.createElement('script');
    scriptMedicamento.type = 'module';
    scriptMedicamento.src = 'js/medicamento.js' + (queryString ? '?' + queryString : '');
    document.body.appendChild(scriptMedicamento);
  };
}

function configurarEntrega(queryString) {
  const scriptBd = document.createElement('script');
  scriptBd.src = 'js/bdConnect.js';
  document.body.appendChild(scriptBd);

  scriptBd.onload = () => {
    const scriptMedicamento = document.createElement('script');
    scriptMedicamento.type = 'module';
    scriptMedicamento.src = 'js/entrega.js' + (queryString ? '?' + queryString : '');
    document.body.appendChild(scriptMedicamento);
  };
}


function configurarProntuario(queryString) {
  const scriptBd = document.createElement('script');
  scriptBd.src = 'js/bdConnect.js';
  document.body.appendChild(scriptBd);

  scriptBd.onload = () => {
    const scriptMedicamento = document.createElement('script');
    scriptMedicamento.type = 'module';
    scriptMedicamento.src = 'js/prontuario.js' + (queryString ? '?' + queryString : '');
    document.body.appendChild(scriptMedicamento);
  };
}


