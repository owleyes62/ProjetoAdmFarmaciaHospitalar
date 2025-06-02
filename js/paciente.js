

async function listarPacientes() {
  try {
    const { data, error } = await supabaseClient.from('paciente').select('id_paciente, nome');

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

    let porcentagem = 100;
    let contador = 1;

    data.forEach(paciente => {
      const pacienteDiv = document.createElement('div');
      pacienteDiv.classList.add('linha-paciente');

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
              <div class="progresso" style="width: ${porcentagem}%;"></div>
            </div>
          </div>
          <div class="botoes-paciente">
            <button onclick="carregarPaginaComPaciente('medicamento.html', ${paciente.id_paciente})">Medicamentos</button>
            <button onclick="carregarPaginaComPaciente('entrega.html', ${paciente.id_paciente})">Entrega</button>
            <button onclick="carregarPaginaComPaciente('prontuario.html', ${paciente.id_paciente})">Prontuário</button>
          </div>
        </div>
      `;

      container.appendChild(pacienteDiv);
      contador++;
      porcentagem -= 20;
      container.appendChild(document.createElement('hr'));
    });

  } catch (err) {
    console.error('Erro inesperado:', err);
  }
}

listarPacientes();
