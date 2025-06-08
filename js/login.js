// Autenticação tradicional com nome e senha via formulário
const form = document.getElementById('login-form');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const usuario = form.querySelector('input[type="text"]').value.trim();
    const senha = form.querySelector('input[type="password"]').value.trim();

    // Consulta no Supabase para verificar usuário e senha na tabela enfermeira
    const { data, error } = await supabaseClient
      .from('enfermeira')
      .select('*')
      .eq('nome', usuario)
      .eq('senha', senha)
      .single();

    if (error || !data) {
      alert('Usuário ou senha inválidos');
      return;
    }

    carregarPagina('pacientes.html');
  });
} else {
  console.error('Formulário de login não encontrado!');
}

// Autenticação via Google OAuth com botão específico
const btnGoogle = document.getElementById('login-google');

if (btnGoogle) {
  btnGoogle.addEventListener('click', async () => {
    console.log('🚀 Botão Google clicado!');
    
    // Detecta automaticamente o ambiente atual
    const currentUrl = window.location.origin;
    
    // CORREÇÃO: Usa sempre a URL atual, seja Codespaces, localhost ou Vercel
    const redirectUrl = currentUrl;

    console.log('🌐 URL de redirect:', redirectUrl);
    console.log('🌐 URL atual:', currentUrl);
    console.log('🔧 Ambiente detectado:', 
      currentUrl.includes('github.dev') ? 'GitHub Codespaces' :
      currentUrl.includes('localhost') ? 'Localhost' :
      currentUrl.includes('vercel.app') ? 'Vercel' : 'Outro'
    );

    try {
      // Inicia fluxo de login via Google com redirecionamento
      const { data, error } = await supabaseClient.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl
        }
      });

      if (error) {
        console.error('❌ Erro ao iniciar login com Google:', error.message);
        alert('Erro ao conectar com Google: ' + error.message);
      } else {
        console.log('✅ OAuth iniciado com sucesso:', data);
        console.log('🔄 Redirecionando para autenticação Google...');
      }
    } catch (err) {
      console.error('❌ Erro inesperado no OAuth:', err);
      alert('Erro inesperado: ' + err.message);
    }
  });
} else {
  console.warn('⚠️ Botão de login com Google não encontrado.');
}

// Função para verificar sessão atual
async function verificarSessaoAtual() {
  try {
    const { data: { session }, error } = await supabaseClient.auth.getSession();
    
    console.log('Verificação manual de sessão:', session ? 'Logado' : 'Não logado');
    
    if (session && !error) {
      console.log('Usuário já logado, redirecionando para pacientes.html');
      carregarPagina('pacientes.html');
      return true;
    }
  } catch (error) {
    console.error('Erro ao verificar sessão:', error);
  }
  
  return false;
}

// Escuta mudanças no estado de autenticação
console.log('Registrando listener onAuthStateChange...');

supabaseClient.auth.onAuthStateChange(async (event, session) => {
  console.log('🔥 Auth state changed:', event, session ? 'COM SESSÃO' : 'SEM SESSÃO');
  
  if (event === 'SIGNED_IN' && session) {
    console.log('✅ SIGNED_IN detectado! Usuário:', session.user.email);
    carregarPagina('pacientes.html');
  }
  
  if (event === 'SIGNED_OUT') {
    console.log('❌ SIGNED_OUT detectado');
    carregarPagina('login.html');
  }
  
  // Para qualquer evento com sessão válida, verificar se precisa redirecionar
  if (session && window.location.pathname.includes('login')) {
    console.log('🔄 Sessão ativa detectada na página de login, redirecionando...');
    carregarPagina('pacientes.html');
  }
});

// Verificação imediata quando o script de login carrega
console.log('Script de login carregado, verificando sessão atual...');

// Pequeno delay para garantir que tudo inicializou
setTimeout(async () => {
  const jaLogado = await verificarSessaoAtual();
  if (!jaLogado) {
    console.log('Usuário não logado, permanecendo na tela de login');
  }
}, 100);