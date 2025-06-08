// O supabaseClient será criado pelo bdConnect.js
// Vamos aguardar ele estar disponível antes de usar

// Carrega uma página HTML no container #app, com animação e configurações específicas por página
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

        // Chama função de configuração específica da página carregada
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

// Inicializa carregando a página adequada ao carregar o DOM
window.addEventListener('DOMContentLoaded', async () => {
  console.log('🚀 DOM carregado, verificando autenticação...');
  
  try {
    // Aguarda o supabaseClient estar disponível
    if (!window.supabaseClient) {
      console.log('⏳ Aguardando supabaseClient...');
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    if (!window.supabaseClient) {
      console.error('❌ supabaseClient não disponível após timeout');
      carregarPagina('login.html');
      return;
    }
    
    const { data: { session }, error } = await window.supabaseClient.auth.getSession();
    
    if (error) {
      console.error('❌ Erro ao verificar sessão:', error);
      carregarPagina('login.html');
      return;
    }
    
    console.log('🔍 Verificação de sessão inicial:', session ? '✅ LOGADO' : '❌ NÃO LOGADO');
    
    if (session) {
      console.log('👤 Usuário logado:', session.user.email);
      carregarPagina('pacientes.html');
    } else {
      console.log('📝 Carregando página de login');
      carregarPagina('login.html');
    }
  } catch (error) {
    console.error('❌ Erro ao verificar sessão:', error);
    carregarPagina('login.html');
  }
});

// Remove scripts já adicionados na página com base no nome do arquivo
function removerScriptExistente(nomeScript) {
  document.querySelectorAll('script').forEach(script => {
    if (script.src && script.src.includes(nomeScript)) {
      script.remove();
    }
  });
}

// Configura scripts para a página de login
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

// Configura scripts para a página de pacientes
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

// Configuração da página de configurações (ainda sem script)
function configurarConfig() {
  // sem script associado ainda
}

// Configura a lógica do formulário da página de relatório
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

    // Aqui poderá enviar dados ao backend futuramente
    console.log('Dados do relatório:', dados);

    alert('Relatório enviado com sucesso!');
    form.reset();
  });
}

// Configura scripts para a página de medicamento, passando query string
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

// Configura scripts para a página de entrega, passando query string
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

// Configura scripts para a página de prontuário, passando query string
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

// Função para carregar uma página específica já vinculada a um paciente pelo ID na query string
function carregarPaginaComPaciente(pagina, pacienteId) {
  window.history.pushState({}, '', `${pagina}?pacienteId=${pacienteId}`);
  carregarPagina(`${pagina}?pacienteId=${pacienteId}`);
}
window.carregarPaginaComPaciente = carregarPaginaComPaciente;