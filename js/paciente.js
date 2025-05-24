async function listarPacientes() {
  try {
    const { data, error } = await supabaseClient.from('paciente').select('*');

    console.log('Dados recebidos:', data);

    if (error) {
      console.error('Erro ao buscar pacientes:', error);
      return;
    }

    const container = document.getElementById('lista-pacientes');
    container.innerHTML = '';

    if (!data || data.length === 0) {
      container.innerHTML = '<p>Nenhum paciente encontrado.</p>';
      return;
    }

    data.forEach(paciente => {
      const div = document.createElement('div');
      div.classList.add('paciente-card');

      div.innerHTML = `
        <h3>${paciente.nome}</h3>
        <p>Idade: ${paciente.idade}</p>
        <p>Sexo: ${paciente.sexo}</p>
        <p>Email: ${paciente.email}</p>
        <p>Telefone: ${paciente.telefone}</p>
      `;

      container.appendChild(div);
    });
  } catch (err) {
    console.error('Erro inesperado:', err);
  }
}

listarPacientes();