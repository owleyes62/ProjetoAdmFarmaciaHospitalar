// Extrai o pacienteId dos parâmetros da URL do script atual
const scriptUrl = import.meta.url || document.currentScript.src;
const urlParams = new URLSearchParams(scriptUrl.split('?')[1]);
const pacienteId = urlParams.get('pacienteId');

if (!pacienteId) {
  console.error('ID do paciente não informado na URL.');
} else {
  carregarCabecalhoPaciente(pacienteId); // Preenche cabeçalho com dados do paciente
  inserirBotoesPaciente(pacienteId);     // Insere botões de navegação da tela medicamento
}

// Insere botões superiores para navegação entre telas do paciente
function inserirBotoesPaciente(pacienteId) {
  const container = document.querySelector('.botoes-superiores');
  if (!container) return;

  container.innerHTML = `
    <button class="nav-btn ativo">Medicamentos</button>
    <button onclick="carregarPaginaComPaciente('entrega.html', ${pacienteId})">Entrega</button>
    <button onclick="carregarPaginaComPaciente('prontuario.html', ${pacienteId})">Prontuário</button>
  `;
}

// Busca dados do paciente no Supabase e atualiza o cabeçalho da página
async function carregarCabecalhoPaciente(id) {
  try {
    const { data, error } = await supabaseClient
      .from('paciente')
      .select('nome, idade, sexo, id_paciente')
      .eq('id_paciente', id)
      .single();

    if (error) throw error;

    const cabecalho = document.querySelector('.cabecalho-paciente');
    if (!cabecalho) return;

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
