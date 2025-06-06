function carregarPagina(pagina) {
  const app = document.getElementById('app');
  const [paginaLimpa, queryString] = pagina.split('?');

  app.classList.add('fade-out');

  setTimeout(() => {
    fetch(`pages/${paginaLimpa}`)
      .then(res => res.text())
      .then(html => {
        app.innerHTML = html;
        localStorage.setItem('paginaAtual', pagina);

        app.classList.remove('fade-out');
        app.classList.add('fade-in');

        // Configurações de cada página
        if (paginaLimpa === 'login.html') configurarLogin();
        if (paginaLimpa === 'pacientes.html') configurarPaciente();
        if (paginaLimpa === 'config.html') configurarConfig();
        if (paginaLimpa === 'relatorio.html') configurarRelatorio();
        if (paginaLimpa === 'medicamento.html') configurarMedicamento(queryString);
        if (paginaLimpa === 'entrega.html') configurarEntrega(queryString);
        if (paginaLimpa === 'prontuario.html') configurarProntuario(queryString);

        setTimeout(() => app.classList.remove('fade-in'), 300);
      })
      .catch(err => console.error('Erro ao carregar página:', err));
  }, 300);
}

window.carregarPagina = carregarPagina;

window.addEventListener('DOMContentLoaded', () => {
  carregarPagina('login.html');
});

function removerScriptExistente(nomeScript) {
  document.querySelectorAll('script').forEach(script => {
    if (script.src && script.src.includes(nomeScript)) {
      script.remove();
    }
  });
}


function configurarLogin() {
  removerScriptExistente('js/bdConnect.js');
  removerScriptExistente('js/login.js');

  const scriptBd = document.createElement('script');
  scriptBd.src = 'js/bdConnect.js?t=' + new Date().getTime();
  document.body.appendChild(scriptBd);

  scriptBd.onload = () => {
    const scriptLogin = document.createElement('script');
    scriptLogin.type = 'module';
    scriptLogin.src = 'js/login.js?t=' + new Date().getTime();
    document.body.appendChild(scriptLogin);
  };
}

function configurarPaciente() {
  removerScriptExistente('js/bdConnect.js');
  removerScriptExistente('js/paciente.js');

  const scriptBd = document.createElement('script');
  scriptBd.src = 'js/bdConnect.js?t=' + new Date().getTime();
  document.body.appendChild(scriptBd);

  scriptBd.onload = () => {
    const scriptPaciente = document.createElement('script');
    scriptPaciente.src = 'js/paciente.js?t=' + new Date().getTime();
    document.body.appendChild(scriptPaciente);
  };
}

function configurarConfig() {
  // sem script associado ainda
}

function configurarRelatorio() {
  const form = document.getElementById('form-relatorio');
  
  if (!form) {
    console.warn('Formulário de relatório não encontrado.');
    return;
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const dados = {
      nome_funcionario: form.nome.value.trim(),
      id_funcionario: form['id-funcionario'].value.trim(),
      data: form.data.value,
      num_pacientes_atendidos: parseInt(form['pacientes-atendidos'].value),
      num_erros_medicamento: parseInt(form['erros-medicamento'].value),
      num_erros_pessoais: form['erros-pessoais'].value.trim(),
      observacoes: form['descricao-dia'].value.trim()
    };

    // Aqui você pode enviar os dados para Supabase futuramente
    console.log('Dados do relatório:', dados);

    alert('Relatório enviado com sucesso!');
    form.reset();
  });
}


function configurarMedicamento(queryString) {
  removerScriptExistente('js/bdConnect.js');
  removerScriptExistente('js/medicamento.js');

  const scriptBd = document.createElement('script');
  scriptBd.src = 'js/bdConnect.js?t=' + new Date().getTime();
  document.body.appendChild(scriptBd);

  scriptBd.onload = () => {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'js/medicamento.js?t=' + new Date().getTime() + (queryString ? '&' + queryString : '');
    document.body.appendChild(script);
  };
}

function configurarEntrega(queryString) {
  removerScriptExistente('js/bdConnect.js');
  removerScriptExistente('js/entrega.js');

  const scriptBd = document.createElement('script');
  scriptBd.src = 'js/bdConnect.js?t=' + new Date().getTime();
  document.body.appendChild(scriptBd);

  scriptBd.onload = () => {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'js/entrega.js?t=' + new Date().getTime() + (queryString ? '&' + queryString : '');
    document.body.appendChild(script);
  };
}

function configurarProntuario(queryString) {
  removerScriptExistente('js/bdConnect.js');
  removerScriptExistente('js/prontuario.js');

  const scriptBd = document.createElement('script');
  scriptBd.src = 'js/bdConnect.js?t=' + new Date().getTime();
  document.body.appendChild(scriptBd);

  scriptBd.onload = () => {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'js/prontuario.js?t=' + new Date().getTime() + (queryString ? '&' + queryString : '');
    document.body.appendChild(script);
  };
}

function carregarPaginaComPaciente(pagina, pacienteId) {
  window.history.pushState({}, '', `${pagina}?pacienteId=${pacienteId}`);
  carregarPagina(`${pagina}?pacienteId=${pacienteId}`);
}
window.carregarPaginaComPaciente = carregarPaginaComPaciente;
