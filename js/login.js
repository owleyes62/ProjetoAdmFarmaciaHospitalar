const form = document.getElementById('login-form');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const usuario = form.querySelector('input[type="text"]').value.trim();
    const senha = form.querySelector('input[type="password"]').value.trim();

    // Consulta no Supabase na tabela 'enfermeira' com nome e senha
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


// async function loginWithGoogle() {
//   const { data, error } = await supabaseClient.auth.signInWithOAuth({
//     provider: 'google',
//     options: {
//       // Aqui você pode adicionar scopes adicionais se quiser, ex: 'email profile'
//       redirectTo: window.location.origin // ou outra URL para onde quer redirecionar após login
//     }
//   });

//   if (error) {
//     console.error('Erro no login com Google:', error.message);
//   } else {
//     console.log('Redirecionando para login Google...');
//   }
// }