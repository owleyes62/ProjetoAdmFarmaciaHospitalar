async function listarPacientes() {
  try {
    const { data, error } = await supabaseClient.from('paciente').select('nome');

    if (error) {
      console.error('Erro ao buscar pacientes:', error);
      return;
    }

    const container = document.getElementById('lista-pacientes');
    container.innerHTML = ''; // limpa o conteúdo anterior

    if (!data || data.length === 0) {
      container.innerHTML = '<p>Nenhum paciente encontrado.</p>';
      return;
    }

    let contador = 1;  // contador começa em 1

    // Cria um bloco para cada paciente com o mesmo layout do exemplo
    data.forEach(paciente => {
      const pacienteDiv = document.createElement('div');
      pacienteDiv.classList.add('linha-paciente');
      pacienteDiv.setAttribute('onclick', "carregarPagina('entrega.html')");

      pacienteDiv.innerHTML = `
        <span class="check-caixa"></span>
        <span class="circulo-numero">${contador}</span>
        <div class="info-paciente">
          <div class="linha-nome-sino">
            <span class="nome-paciente">${paciente.nome}</span>
            <i class="fa fa-bell sino-alerta"></i>
          </div>
          <span class="detalhe-paciente">
            <span class="prioridade">Prioridade Alerta</span> - 09:45
          </span>
          <div class="barra-container">
            <span class="entrega-label">Entrega</span>
            <div class="barra-carregamento">
              <div class="progresso" style="width: 60%;"></div>
            </div>
          </div>
        </div>
      `;

      container.appendChild(pacienteDiv);
      container.appendChild(document.createElement('hr'));
    });
  } catch (err) {
    console.error('Erro inesperado:', err);
  }
}

listarPacientes();


