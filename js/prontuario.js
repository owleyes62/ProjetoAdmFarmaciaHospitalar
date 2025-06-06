// Obtém a URL do script atual e extrai os parâmetros da query string
const scriptUrl = import.meta.url || document.currentScript.src;
const urlParams = new URLSearchParams(scriptUrl.split('?')[1]);
const pacienteId = urlParams.get('pacienteId');

// Verifica se o pacienteId foi informado, se não, exibe erro
if (!pacienteId) {
  console.error('ID do paciente não informado na URL.');
} else {
  // Se existir, carrega o cabeçalho e os botões da tela do prontuário
  carregarCabecalhoPaciente(pacienteId);
  inserirBotoesPaciente(pacienteId);
  // carregarProntuarioPaciente(pacienteId) // Função comentada para carregar prontuário
}

// Função para inserir os botões de navegação no topo da tela, marca "Prontuário" como ativo
function inserirBotoesPaciente(pacienteId) {
  const container = document.querySelector('.botoes-superiores');
  if (!container) return;

  container.innerHTML = `
    <button onclick="carregarPaginaComPaciente('medicamento.html', ${pacienteId})">Medicamentos</button>
    <button onclick="carregarPaginaComPaciente('entrega.html', ${pacienteId})">Entrega</button>
    <button class="nav-btn ativo">Prontuário</button>
  `;
}

// Função para buscar e exibir os dados do paciente no cabeçalho da página
async function carregarCabecalhoPaciente(id) {
  try {
    // Consulta paciente no Supabase pelo id
    const { data, error } = await supabaseClient
      .from('paciente')
      .select('nome, idade, sexo, id_paciente')
      .eq('id_paciente', id)
      .single();

    if (error) throw error;

    // Atualiza o HTML do cabeçalho com as informações do paciente
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