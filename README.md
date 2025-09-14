# Organizador de Tarefas

Um aplicativo web simples para **gerenciar suas tarefas**, desenvolvido com **Next.js, React e Tailwind CSS**. Permite adicionar, listar e remover tarefas de forma prática e intuitiva.

---

## 📝 Funcionalidades

* Adicionar novas tarefas.
* Listar tarefas existentes.
* Remover tarefas concluídas.
* Interface responsiva para desktop e mobile.
* Header com navegação e logo.
* Layout centralizado com Hero Section e chamadas visuais.

---

## 💻 Tecnologias Utilizadas

* [Next.js](https://nextjs.org/) – Framework React para desenvolvimento web.
* [React](https://reactjs.org/) – Biblioteca JavaScript para construção de interfaces.
* [Tailwind CSS](https://tailwindcss.com/) – Framework CSS utilitário para estilização rápida.
* [TypeScript](https://www.typescriptlang.org/) *(opcional, se usado)*.

---

## 📁 Estrutura do Projeto

```
.
├── public/
│   ├── to-do-list.png       # Logo
│   └── imagem-tarefas.png  # Imagem do Hero
├── pages/
│   ├── index.tsx           # Página inicial
│   └── dashboard.tsx       # Dashboard com form de tarefas
├── components/
│   └── Header.tsx          # Componente de Header
├── styles/
│   └── globals.css         # Estilos globais
├── tailwind.config.js      # Configuração do Tailwind
└── package.json            # Dependências do projeto
```

---

## 🚀 Como Rodar o Projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/organizador-de-tarefas.git
cd organizador-de-tarefas
```

### 2. Instalar dependências

```bash
npm install
# ou
yarn install
```

### 3. Rodar o servidor de desenvolvimento

```bash
npm run dev
# ou
yarn dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o projeto.

---

## 📦 Scripts disponíveis

* `dev` – Inicia o servidor de desenvolvimento.
* `build` – Cria o build de produção.
* `start` – Inicia o servidor em modo produção.
* `lint` – Verifica problemas de linting.

---

## ✨ Melhorias Futuras

* Marcar tarefas como concluídas.
* Ordenar tarefas por prioridade ou data.
* Persistir tarefas no **localStorage** ou banco de dados.
* Adicionar autenticação de usuário.
* Criar notificações ou lembretes.

---

## 🧑‍💻 Autor

**Seu Nome** – [GitHub](https://github.com/marcosdev82/))

