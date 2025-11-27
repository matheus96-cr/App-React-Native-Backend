// src/types.ts

// Tipagem da entidade Post (Publicação)
export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string; 
}

// Tipagem para o React Navigation (RootStackParamList)
export type RootStackParamList = {
  PostList: undefined; // Listar e Deletar
  PostForm: { postId?: number } | undefined; // Criar (sem ID) ou Editar (com ID)
};