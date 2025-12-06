# 📱 README: Aplicação Mobile (Frontend)

# Desafio III - App React Native CRUD (Frontend)

Este repositório contém o aplicativo móvel desenvolvido em **React Native + Expo** utilizando **TypeScript**, que simula as operações **CRUD (Criar, Ler, Atualizar, Deletar)** de publicações.

O Frontend foi projetado para consumir a **API RESTful Própria** (o Backend do Desafio III), mas está configurado com a API de simulação `JSONPlaceholder` para garantir o funcionamento visual em qualquer ambiente de rede.

### 🛠️ Tecnologias Utilizadas

* **Framework:** React Native (com Expo)
* **Linguagem:** TypeScript
* **UI/Design:** React Native Paper
* **Navegação:** React Navigation
* **Simulação de API:** JSONPlaceholder

---

### 🚀 Configuração e Como Rodar o Projeto

Para rodar este aplicativo, você precisa ter o Node.js, npm/yarn e o Expo Go instalados em seu celular.

1.  **Clone o Repositório:**
    ```bash
    git clone [Insira a URL do seu Repositório Frontend aqui]
    cd hello-rn
    ```

2.  **Instale as Dependências:**
    ```bash
    npm install
    # Ou yarn install
    ```

3.  **Inicie o Servidor Expo:**
    ```bash
    npx expo start --lan
    ```
    *Se estiver usando um ambiente de nuvem (como Codespaces), use `npx expo start --tunnel`.*

4.  **Acesse no Celular:**
    * Leia o **QR Code** exibido no terminal (ou no navegador) com o aplicativo **Expo Go**.

---

### 💡 Implementação do CRUD

| Funcionalidade | Método HTTP | Status de Persistência |
| :--- | :--- | :--- |
| **READ** (Listar) | `GET /posts` | Dados sempre carregados do JSONPlaceholder |
| **CREATE** (Cadastrar) | `POST /posts` | Simulado. A API retorna sucesso, mas o dado não é armazenado. |
| **UPDATE** (Editar) | `PUT /posts/:id` | Simulado. A API retorna sucesso, mas o dado original é mantido. |
| **DELETE** (Deletar) | `DELETE /posts/:id` | **Localmente persistente.** O item é removido do estado do app. |

> **Nota:** As operações de **CREATE e UPDATE** enviam as requisições com sucesso, mas o JSONPlaceholder não persiste os dados. Para persistência real, a URL precisa ser alterada para o IP local do **Backend Próprio** (API rodando na porta 3000).

---

### 🔗 Repositório Backend (API Própria)

Este projeto foi desenvolvido em conjunto com o seguinte repositório que contém o servidor Node.js/Express com o CRUD real para a entidade `/tasks`:

* **React-Native-Backend
**: https://github.com/matheus96-cr/React-Native-Backendhttps://github.com/matheus96-cr/React-Native-Backendhttps://github.com/matheus96-cr/React-Native-Backend
