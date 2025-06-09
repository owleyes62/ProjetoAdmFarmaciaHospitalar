# Sistema de Administração Hospitalar - Frontend

Este projeto é a interface web de um Sistema de Administração Hospitalar, desenvolvido para facilitar a gestão de pacientes, medicamentos, prontuários e relatórios clínicos. Todo o front-end foi criado com HTML, CSS e JavaScript puro, e se comunica com um banco de dados Supabase para persistência dos dados.

## 🚀 Funcionalidades Principais

- 📋 Listagem de Pacientes para atendimento
- 💊 Gestão de Medicamentos por enfermeira
- 📝 Emissão de Relatórios diario
- 📁 Visualização de Prontuários
- 🔒 Tela de Login
- ⚙️ Tela de Configurações
- 📊 Navegação com sistema SPA (Single Page Application)

## 🛠️ Tecnologias Utilizadas

- **HTML5 & CSS3**
- **JavaScript Puro (ES6+)**
- **[Supabase](https://supabase.com/)** (como backend e banco de dados)

## 🧠 Como Funciona

- **Navegação SPA:**  
  A página `index.html` é a base da aplicação. Ela utiliza JavaScript para carregar outras páginas dinamicamente via `fetch`, criando a experiência de uma aplicação SPA.
  **[index.html](https://github.com/owleyes62/ProjetoAdmFarmaciaHospitalar/blob/main/index.html)**
  
- **Gerenciador de Páginas:**  
  O arquivo `app.js` é responsável por manipular o conteúdo dinâmico e executar a função correta para cada página carregada.
  **[app.js](https://github.com/owleyes62/ProjetoAdmFarmaciaHospitalar/blob/main/js/app.js)**
  
- **Conexão com o Banco:**  
  O `bdConnect.js` armazena as credenciais de acesso ao Supabase, incluindo a `anonKey` e a `url` da instância.
  **[app.js](https://github.com/owleyes62/ProjetoAdmFarmaciaHospitalar/blob/main/js/bdConnect.js)**

- **Modularização por Página:**  
  Cada funcionalidade (como login, pacientes, medicamentos) tem seu próprio arquivo `.js` que encapsula sua lógica.
  **[arquivos js](https://github.com/owleyes62/ProjetoAdmFarmaciaHospitalar/tree/main/js)**

## 📁 Estrutura de Arquivos

projetoAdmHopitalar/
│
├── index.html                 # Página inicial (ex: ligação entre todas as paginas)
│
├── pages/                    # páginas para exibição
│   ├── login.html
│   ├── atendidos.html
│   ├── paciente.html
│   ├── ajuda.html
│   ├── entrega.html
│   ├── medicamento.html
│   ├── prontuario.html
│   ├── relatorio.html
│   └── config.html
│
├── css/                      # Arquivos de estilo
│   ├── style.css             # Estilo global
│   └── pages/                # Estilos específicos por página (opcional)
│       ├── login.css
│       ├── atendidos.css
│       ├── relatorio.css
│       ├── paciente.css
│       ├── ajuda.css
│       ├── medicamento.css
│       ├── entrega.css
│       ├── prontuario.css
│       └── config.css
│
├── js/                       # Scripts JavaScript
│   ├──  app.js               # Comportamento geral (ex: alternar telas, validações)
│   ├──  bdConnect.js               # Scripts específicos (opcional: BD)
│   ├──  paciente.js
│   ├──  Entrega.js 
│   ├──  medicamento.js
│   ├──  login.js
│   └──  prontuario.js 
│
├── assets/                   # Arquivos estáticos (imagens, fontes, ícones)
│   ├── persona.png
│   └── icons
│       ├── icon-512.png
│       └── icon-192.png
│   
│
└── README.md                 # (Opcional) Documentação/resumo do projeto
