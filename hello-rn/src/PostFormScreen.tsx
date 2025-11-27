// src/PostFormScreen.tsx

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import { 
  TextInput, 
  Button, 
  ActivityIndicator, 
  Title,
  useTheme 
} from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, Post } from './types';

type PostFormScreenProps = NativeStackScreenProps<RootStackParamList, 'PostForm'>;

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

const PostFormScreen: React.FC<PostFormScreenProps> = ({ route, navigation }) => {
  const theme = useTheme();
  const postId = route.params?.postId; 
  
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const [isFetchingData, setIsFetchingData] = useState(true); 

  const isEditing = postId !== undefined;

  // Efeito para carregar dados se estiver editando (UPDATE)
  useEffect(() => {
    if (isEditing) {
      const fetchPostDetails = async () => {
        try {
          setIsFetchingData(true);
          const response = await fetch(`${API_URL}/${postId}`);
          const data: Post = await response.json();
          setTitle(data.title);
          setBody(data.body);
        } catch (error) {
          console.error("Erro ao buscar detalhes do post:", error);
          Alert.alert("Erro", "Não foi possível carregar os dados para edição.");
        } finally {
          setIsFetchingData(false);
        }
      };
      fetchPostDetails();
    } else {
      setIsFetchingData(false); 
    }
  }, [postId, isEditing]);

  const handleSubmit = async () => {
    if (!title.trim() || !body.trim()) {
      Alert.alert("Atenção", "Preencha o título e o corpo da publicação.");
      return;
    }

    setLoading(true);

    const method = isEditing ? 'PUT' : 'POST';
    const url = isEditing ? `${API_URL}/${postId}` : API_URL;
    
    const payload = { 
      title, 
      body, 
      userId: 1, 
      ...(isEditing && { id: postId }) 
    };

    try {
      await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      Alert.alert(
        "Sucesso", 
        isEditing 
          ? `Publicação #${postId} atualizada (Simulado).` 
          : `Nova Publicação criada (Simulado).`
      );

      // Volta para a tela de lista, que irá recarregar os dados
      navigation.goBack(); 

    } catch (error) {
      console.error("Erro ao submeter o formulário:", error);
      Alert.alert("Erro", "Falha na comunicação com a API.");
    } finally {
      setLoading(false);
    }
  };

  if (isFetchingData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} color={theme.colors.primary} size="large" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Title style={styles.title}>
        {isEditing ? `Editar Post #${postId}` : 'Cadastrar Novo Post'}
      </Title>

      <TextInput
        label="Título"
        value={title}
        onChangeText={setTitle}
        mode="outlined"
        style={styles.input}
        disabled={loading}
      />

      <TextInput
        label="Conteúdo da Publicação"
        value={body}
        onChangeText={setBody}
        mode="outlined"
        multiline
        numberOfLines={6}
        style={styles.input}
        disabled={loading}
      />

      <Button 
        mode="contained" 
        onPress={handleSubmit} 
        loading={loading}
        disabled={loading}
        style={styles.button}
        contentStyle={styles.buttonContent}
      >
        {isEditing ? 'Salvar Alterações (UPDATE)' : 'Cadastrar (CREATE)'}
      </Button>
    </ScrollView>
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
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    marginBottom: 20,
    fontSize: 22,
    textAlign: 'center',
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
    paddingVertical: 5,
  },
  buttonContent: {
    height: 50,
  }
});

export default PostFormScreen;