# 🚀 DeskData Frontend

> **Descrição breve**: DeskData Frontend é a interface web do sistema DeskData, desenvolvida com **React**, **TypeScript** e **Vite**, para visualização e análise de chamados técnicos através de dashboards interativos.

---

## 📌 Status do Projeto

✅ **Sprint 1 Concluída - 30/03/2025**

✔ Estrutura inicial da interface web finalizada  
✔ Dashboards com insights diários implementados  
🔜 Próximos passos: integração de busca semântica e análise de sentimentos (Sprint 2)

📅 **Ciclo da Sprint 1**: 10/03/2025 - 30/03/2025

---

## 🎨 Visão Geral

🔹 **O que é?**  
DeskData Frontend é a camada de apresentação do sistema DeskData, projetada para exibir dados processados de atendimentos inteligentes de forma intuitiva, com foco em dashboards e gráficos.

🔹 **Para quem?**  
Gestores e analistas que precisam de **visualizações intuitivas** para tomar decisões baseadas em interações de atendimento.

🔹 **Funcionalidades da Sprint 1:**  
✔ Interface web moderna e responsiva  
✔ Dashboards com gráficos de insights diários sobre chamados  

🔹 **Próximos Recursos (Sprints Futuras):**  
- Filtros e pesquisa dinâmica  
- Modo escuro  
- Extração de informações com Processamento de Linguagem Natural (PLN)  
- Análise de sentimentos nos dashboards  
- Busca semântica e prompt  
- CRUD de usuários  
- Autenticação segura com JWT  
- Sumarização automática de interações  
- Classificação de atendimentos (ex.: reclamação, suporte, dúvida)

---

## 📂 Estrutura do Projeto

```
/frontend-web
├── src/
│   ├── assets/          # Imagens e ícones
│   ├── components/      # Componentes reutilizáveis
│   ├── pages/           # Páginas principais
│   ├── context/         # Contextos de estado global
├── public/              # Arquivos estáticos
├── package.json         # Dependências e scripts
├── tailwind.config.js   # Configuração do Tailwind CSS
├── tsconfig.json        # Configuração do TypeScript
├── vite.config.ts       # Configuração do Vite
```

---

## 🛠 Tecnologias Utilizadas

- ⚛️ **React** + **Vite** (Biblioteca principal e empacotador rápido)  
- 📜 **TypeScript** (Tipagem estática)  
- 🎨 **Tailwind CSS** (Estilização)  
- 📊 **ApexCharts** (Gráficos interativos)  
- 🌐 **Axios** (Integração com o backend)  
- 🧪 **Vitest** (Testes automatizados)  

---

## 🚀 Como Rodar o Projeto

### 🔧 **Pré-requisitos**  
- [Node.js](https://nodejs.org/) (versão LTS recomendada)  
- [Git](https://git-scm.com/)

### 🛠 **Passos de Instalação**

1️⃣ **Clone o repositório**  
```sh
git clone https://github.com/DeskData-Api/Frontend-Web.git
cd Frontend-Web
```

2️⃣ **Instale as dependências**  
```sh
npm install
```

3️⃣ **Inicie o servidor de desenvolvimento**  
```sh
npm run dev
```  
O projeto estará disponível em: `http://localhost:5173`

4️⃣ **Rodar os testes (opcional)**  
```sh
npm run test
```

---

## 🧪 Configuração do SonarQube (Opcional)

### **Instalação com Docker**
1. Certifique-se de ter o [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado e rodando.  
2. Execute o container do SonarQube:  
```sh
docker run -d --name sonarqube -p 9000:9000 sonarqube:community
```
3. Acesse via navegador: `http://localhost:9000`  
   - Usuário: `admin` | Senha: `admin`

### **Instalação do Scanner**
```sh
npm install --save-dev sonar-scanner
```

### **Configuração**
Crie um arquivo `sonar-project.properties` na raiz do projeto:
```
sonar.projectKey=deskdata-frontend
sonar.organization=deskdata
sonar.projectName=DeskData - Frontend
sonar.projectVersion=1.0
sonar.sourceEncoding=UTF-8
sonar.sources=src
sonar.tests=__tests__
sonar.test.inclusions=**/*.test.tsx
sonar.typescript.lcov.reportPaths=coverage/lcov.info
```

### **Executando o Scanner**
Adicione ao `package.json`:
```json
"scripts": {
  "sonar": "sonar-scanner"
}
```
Execute:
```sh
npm run sonar
```

### **Resultados**
Acesse `http://localhost:9000` para visualizar os relatórios de qualidade de código.

---

## 📝 Contribuindo

1. Faça um fork do repositório.  
2. Crie uma branch (`feature/nova-funcionalidade`).  
3. Commit suas alterações (`git commit -m 'feat: adiciona nova funcionalidade'`).  
4. Envie um Pull Request.

---

### 🎯 **Gostou do projeto?**

Se esse projeto foi útil para você, deixe uma ⭐ no repositório! 😃