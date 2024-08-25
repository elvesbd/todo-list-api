export interface SwaggerConfig {
  title: string;
  description: string;
  version: string;
  tags?: string[];
}

export const SWAGGER_CONFIG: SwaggerConfig = {
  title: 'Todo-App',
  description: `
    Esta API fornece endpoints para autenticação de usuários, gerenciamento de listas de tarefas e operações CRUD para tarefas.

    **Autenticação:**
    - Autentique usuários e obtenha um token de acesso (bearer token) para acessar rotas protegidas.

    **CRUD de Listas de Tarefas (TodosList):**
    - Realize operações CRUD (Criar, Ler, Atualizar, Deletar) em listas de tarefas para organizar suas tarefas.

    **Gerenciamento de Tarefas (Todo):**
    - Crie, edite, atualize o status como concluído ou exclua tarefas específicas dentro de suas listas.

    O acesso a determinados endpoints pode exigir autenticação via token de acesso, obtido através do processo de autenticação.
  `,
  version: '1.0',
  tags: ['auth', 'todo', 'todosList'],
};
