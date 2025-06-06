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
      alert('Usuário ou senha inválidos'); // Erro de autenticação
      return;
    }

    carregarPagina('pacientes.html'); // Redireciona para a página de pacientes ao logar
  });
} else {
  console.error('Formulário de login não encontrado!');
}

// Autenticação via Google OAuth com botão específico
const btnGoogle = document.getElementById('login-google');

if (btnGoogle) {
  btnGoogle.addEventListener('click', async () => {
    // Inicia fluxo de login via Google com redirecionamento
    const { error } = await supabaseClient.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin // URL para redirecionar após login
      }
    });

    if (error) {
      console.error('Erro ao iniciar login com Google:', error.message);
    } else {
      console.log('Redirecionando para autenticação Google...');
    }
  });
} else {
  console.warn('Botão de login com Google não encontrado.');
}
