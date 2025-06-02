# Sistema de Administração Hospitalar - Frontend

Este é o front-end de um sistema hospitalar focado na gestão de pacientes, medicamentos, relatórios e prontuários. A aplicação é feita com HTML, CSS e JavaScript puro, conectando-se a um banco de dados via Supabase.

## 🚀 Funcionalidades Principais

- 📋 Listagem de Pacientes
- 💊 Gestão de Medicamentos
- 📝 Emissão de Relatórios
- 📁 Visualização de Prontuários
- 🔒 Tela de Login
- ⚙️ Tela de Configurações
- 📊 Navegação com sistema SPA (Single Page Application)

## 🛠️ Tecnologias Utilizadas

- **HTML5 & CSS3**
- **JavaScript Puro (ES6+)**
- **[Supabase](https://supabase.com/)** (como backend e banco de dados)

## 🧠 Como Funciona

- O `index.html` serve como página principal e carrega dinamicamente as outras páginas via `fetch`, simulando um comportamento de SPA.
- O `app.js` gerencia as mudanças de tela e invoca funções específicas com base na página carregada.
- O `bdConnect.js` conecta a aplicação ao Supabase com a `anonKey` e `url` da instância.
- algumas telas possui seu próprio arquivo `.js` para isolar a lógica de cada funcionalidade.
- O `formulário de relatório` envia dados para a tabela `relatorio` no Supabase.
