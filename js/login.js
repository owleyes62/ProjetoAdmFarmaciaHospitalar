// Autenticação tradicional
const form = document.getElementById('login-form');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const usuario = form.querySelector('input[type="text"]').value.trim();
    const senha = form.querySelector('input[type="password"]').value.trim();

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

// Autenticação com Google
const btnGoogle = document.getElementById('login-google');

if (btnGoogle) {
  btnGoogle.addEventListener('click', async () => {
    const { error } = await supabaseClient.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin // ou sua URL de produção
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
