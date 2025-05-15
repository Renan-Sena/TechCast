```mermaid
flowchart LR
  A[Usuário acessa a plataforma] --> B{Usuário faz login ou se registra}
  B --> C[Usuário entra no dashboard]

  subgraph Dashboard Principal
    direction TB
    C --> D[Usuário escolhe a opção Home]
    C --> E[Usuário escolhe a opção Criar Conteúdo]
    C --> F[Usuário escolhe a opção Pesquisa]
    C --> G[Usuário escolhe a opção Biblioteca]
  end

  D --> K[Usuário é levado para a página principal do dashboard]

  E --> H[Criador vai para o dashboard de criação de conteúdo]
  
  subgraph Dashboard de Criação de Conteúdo
    direction TB
    H --> I[Criador envia novo conteúdo para o backend]
    I --> J[Backend armazena conteúdo no banco de dados]
    J --> K[Frontend exibe mensagem de sucesso]
  end

  F --> O[Usuário pesquisa podcasts]
  O --> P[Backend consulta banco de dados por podcasts]
  P --> Q[Retorna resultados de pesquisa para o frontend]
  Q --> R[Frontend exibe os resultados]

  G --> S[Usuário acessa biblioteca de podcasts]
  S --> T[Backend consulta banco de dados por podcasts da biblioteca]
  T --> U[Retorna podcasts da biblioteca para o frontend]
  U --> V[Frontend exibe os podcasts da biblioteca]

  subgraph Banco de Dados [Banco de Dados - PostgreSQL]
    direction TB
    J --> W[Armazena o novo conteúdo no banco]
    P --> X[Consulta podcasts no banco]
    T --> Y[Consulta biblioteca de podcasts no banco]
  end
  
  subgraph Fluxo de Interação
    direction LR
    K --> Z[Usuário interage com o conteúdo]
    Z --> AA[Usuário compartilha feedback ou avalia o conteúdo]
    AA --> AB[Usuário continua navegando ou interagindo]
  end
