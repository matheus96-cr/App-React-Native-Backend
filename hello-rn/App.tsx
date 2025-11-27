// App.tsx

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';

// IMPORTAÇÕES DAS NOVAS TELAS CRUD (PostList e PostForm)
import PostListScreen from './src/PostListScreen';
import PostFormScreen from './src/PostFormScreen';
import { RootStackParamList } from './src/types'; 

const Stack = createNativeStackNavigator<RootStackParamList>();

// Define um tema simples
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#007BFF', // Azul
    accent: '#FFC107', // Amarelo
  },
};

const App: React.FC = () => {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="PostList">
          <Stack.Screen 
            name="PostList" 
            component={PostListScreen} 
            options={{ title: 'Publicações (CRUD Simulado)' }} 
          />
          <Stack.Screen 
            name="PostForm" 
            component={PostFormScreen} 
            options={({ route }) => ({ 
                title: route.params?.postId ? 'Editar Publicação' : 'Nova Publicação'
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;