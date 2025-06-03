const params = new URLSearchParams(window.location.search);
const pacienteId = params.get('pacienteId');



if (!pacienteId) {
  console.error('ID do paciente não informado na URL.');
} else {
  carregarCabecalhoPaciente(pacienteId);
  inserirBotoesPaciente(pacienteId);
  buscarMedicamentosDoPaciente(pacienteId); // Supondo que você vai implementar essa parte
  
}

function inserirBotoesPaciente(pacienteId) {
  const container = document.querySelector('.botoes-superiores');
  if (!container) return;

  container.innerHTML = `
    <button onclick="carregarPaginaComPaciente('medicamento.html', ${pacienteId})">Medicamentos</button>
    <button class="nav-btn ativo"">Entrega</button>
    <button onclick="carregarPaginaComPaciente('prontuario.html', ${pacienteId})">Prontuário</button>
  `;
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

async function carregarEntregasPaciente(id) {
  try {
    const { data, error } = await supabaseClient
      .from('entrega')
      .select('medicamento, frequencia, status')
      .eq('id_paciente', id);

    if (error) throw error;

    const listaEntrega = document.querySelector('.lista-entrega');
    listaEntrega.innerHTML = '';

    if (!data || data.length === 0) {
      listaEntrega.innerHTML = '<p>Nenhuma entrega encontrada para este paciente.</p>';
      return;
    }

    data.forEach(entrega => {
      const item = document.createElement('div');
      item.classList.add('entrega-item');
      item.textContent = `${entrega.medicamento} - ${entrega.frequencia} (${entrega.status})`;
      listaEntrega.appendChild(item);
    });

    const total = data.length;
    const prontos = data.filter(e => e.status.toLowerCase() === 'pronto').length;

    const infoMedicamentos = document.querySelector('.info-medicamentos');
    if (infoMedicamentos) {
      infoMedicamentos.innerHTML = `
        <p><strong>Total:</strong> ${total}</p>
        <p><strong>Prontos:</strong> ${prontos}</p>
      `;
    }

    const porcentagem = prontos && total ? Math.round((prontos / total) * 100) : 0;
    const porcentagemElem = document.querySelector('.porcentagem');
    if (porcentagemElem) {
      porcentagemElem.textContent = `${porcentagem}%`;
    }
  } catch (err) {
    console.error('Erro ao carregar entregas:', err.message);
  }
}


