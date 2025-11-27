import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, View, StyleSheet, Alert } from 'react-native';
import { 
  ActivityIndicator, 
  Card, 
  Title, 
  Paragraph, 
  FAB, 
  IconButton, 
  Divider 
} from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, Post } from './types'; 

type PostListScreenProps = NativeStackScreenProps<RootStackParamList, 'PostList'>;

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

const PostListScreen: React.FC<PostListScreenProps> = ({ navigation }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Função READ: Buscar a lista de posts
  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      const data: Post[] = await response.json(); 
      // Limita a 10 posts para simplificar a visualização
      setPosts(data.slice(0, 10)); 
    } catch (error) {
      console.error("Erro ao buscar posts:", error);
      Alert.alert("Erro", "Não foi possível carregar a lista de posts.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Função DELETE: Excluir um post
  const handleDelete = async (postId: number) => {
    Alert.alert(
      "Confirmar Exclusão",
      `Tem certeza que deseja deletar o post #${postId}?`,
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Deletar", 
          style: "destructive", 
          onPress: async () => {
            try {
              // Requisição DELETE para o JSONPlaceholder
              await fetch(`${API_URL}/${postId}`, {
                method: 'DELETE',
              });

              // Remove o post da lista exibida
              setPosts(prevPosts => prevPosts.filter(p => p.id !== postId));
              Alert.alert("Sucesso", `Post #${postId} deletado (Simulado)`);
              
            } catch (error) {
              console.error("Erro ao deletar post:", error);
              Alert.alert("Erro", "Falha ao tentar deletar o post.");
            }
          }
        },
      ]
    );
  };

  // Carrega os posts na montagem e sempre que a tela foca
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchPosts();
    });
    return unsubscribe; 
  }, [navigation, fetchPosts]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} color="#007BFF" size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Title>{item.title}</Title>
              <Paragraph style={styles.bodyText} numberOfLines={2}>
                {item.body}
              </Paragraph>
              <View style={styles.actions}>
                {/* Botão EDITAR (Leva para PostFormScreen com o ID) */}
                <IconButton
                  icon="pencil"
                  color="#007BFF"
                  onPress={() => navigation.navigate('PostForm', { postId: item.id })}
                />
                {/* Botão DELETAR (Chama a função handleDelete) */}
                <IconButton
                  icon="delete"
                  color="#FF0000"
                  onPress={() => handleDelete(item.id)}
                />
              </View>
            </Card.Content>
          </Card>
        )}
      />
      
      {/* FAB para CRIAR (Leva para PostFormScreen sem ID) */}
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('PostForm')}
        label="Novo Post"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  card: {
    marginVertical: 4,
    marginHorizontal: 8,
    elevation: 2,
  },
  bodyText: {
    color: '#666',
    marginTop: 5,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#007BFF',
  },
});

export default PostListScreen;