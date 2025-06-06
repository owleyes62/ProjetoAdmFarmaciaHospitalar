// Pega a URL do script atual e extrai o parâmetro pacienteId da query string
const scriptUrl = import.meta.url || document.currentScript.src;
const urlParams = new URLSearchParams(scriptUrl.split('?')[1]);
const pacienteId = urlParams.get('pacienteId');

// Se não houver pacienteId na URL, mostra erro no console, senão carrega dados do paciente
if (!pacienteId) {
  console.error('ID do paciente não informado na URL.');
} else {
  carregarCabecalhoPaciente(pacienteId);
  inserirBotoesPaciente(pacienteId); 
  // carregarEntregasPaciente(pacienteId) // (Comentado por enquanto)
}

// Insere os botões de navegação superiores na tela entrega com links para outras páginas do paciente
function inserirBotoesPaciente(pacienteId) {
  const container = document.querySelector('.botoes-superiores');
  if (!container) return;

  container.innerHTML = `
    <button onclick="carregarPaginaComPaciente('medicamento.html', ${pacienteId})">Medicamentos</button>
    <button class="nav-btn ativo"">Entrega</button>
    <button onclick="carregarPaginaComPaciente('prontuario.html', ${pacienteId})">Prontuário</button>
  `;
}

// Busca os dados do paciente no Supabase e carrega o cabeçalho com essas informações
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