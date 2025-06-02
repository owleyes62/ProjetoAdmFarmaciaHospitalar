const params = new URLSearchParams(window.location.search);
const pacienteId = params.get('pacienteId');

if (!pacienteId) {
  console.error('ID do paciente não informado na URL.');
} else {
  carregarCabecalhoPaciente(pacienteId);
  carregarProntuarioPaciente(pacienteId);
}

async function carregarCabecalhoPaciente(id) {
  try {
    const { data, error } = await supabaseClient
      .from('paciente')
      .select('nome, idade, sexo, id_paciente')
      .eq('id_paciente', id)
      .single();

    if (error) throw error;

    const cabecalho = document.querySelector('.cabecalho-paciente');
    cabecalho.innerHTML = `
      <p><strong>Nome:</strong> ${data.nome}</p>
      <p><strong>Ficha:</strong> ${data.id_paciente}</p>
      <p><strong>Prioridade:</strong> <span class="prioridade verde">Verde</span></p>
      <p><strong>Sexo:</strong> ${data.sexo} | <strong>Idade:</strong> ${data.idade} anos</p>
      <p><strong>Paciente ambulatorio</strong></p>
    `;
  } catch (err) {
    console.error('Erro ao carregar cabeçalho do paciente:', err.message);
  }
}

async function carregarProntuarioPaciente(id) {
  try {
    const { data, error } = await supabaseClient
      .from('prontuario')
      .select('data, observacoes')
      .eq('id_paciente', id)
      .order('data', { ascending: false });

    if (error) throw error;

    const containerProntuario = document.querySelector('.conteudo-prontuario');
    containerProntuario.innerHTML = '';

    if (!data || data.length === 0) {
      containerProntuario.innerHTML = '<p>Nenhum prontuário encontrado para este paciente.</p>';
      return;
    }

    data.forEach(registro => {
      const bloco = document.createElement('div');
      bloco.classList.add('bloco-prontuario');
      bloco.innerHTML = `
        <p><strong>Data:</strong> ${new Date(registro.data).toLocaleDateString()}</p>
        <p><strong>Observações:</strong> ${registro.observacoes}</p>
      `;
      containerProntuario.appendChild(bloco);
    });
  } catch (err) {
    console.error('Erro ao carregar prontuário:', err.message);
  }
}
