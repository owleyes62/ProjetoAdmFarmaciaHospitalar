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
