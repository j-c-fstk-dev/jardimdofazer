# 🌸 Jardim do Fazer - Admin Panel

Painel administrativo completo para gerenciar seu ecommerce de produtos físicos e digitais, com suporte a blog.

## 🚀 Quick Start

### 1. Instalação

```bash
cd "admin"
npm install
```

### 2. Iniciar o servidor de desenvolvimento

```bash
npm run dev
```

Acesse: `http://localhost:5173`

### 3. Build para produção

```bash
npm run build
npm run preview
```

## 📋 Pré-requisitos

- Node.js v16+
- npm v7+
- Backend rodando em `http://localhost:3000` (ver instruções em `/backend`)

## 🏗️ Estrutura do Projeto

```
admin/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── Navbar.jsx      # Barra superior
│   │   ├── Sidebar.jsx     # Menu lateral
│   │   ├── Card.jsx        # Cards e stats
│   │   └── Modal.jsx       # Modais
│   ├── pages/              # Páginas da aplicação
│   │   ├── Dashboard.jsx   # Dashboard principal
│   │   ├── Products.jsx    # Gerenciamento de produtos
│   │   ├── Orders.jsx      # Gerenciamento de pedidos
│   │   └── Posts.jsx       # Gerenciamento de blog
│   ├── services/           # Serviços de API
│   │   └── api.js         # Cliente HTTP centralizado
│   ├── hooks/              # Hooks customizados
│   │   └── useAsync.js    # Hook para requisições assíncronas
│   ├── styles/             # Estilos globais
│   │   └── globals.css    # Tailwind + customizações
│   ├── App.jsx             # Componente raiz
│   └── main.jsx            # Entrada da aplicação
├── index.html              # Template HTML
├── vite.config.js          # Configuração Vite
├── tailwind.config.js      # Configuração Tailwind
├── postcss.config.js       # Configuração PostCSS
└── package.json            # Dependências

```

## 🎨 Funcionalidades

### Dashboard
- Resumo de vendas e estatísticas
- Contagem de produtos, pedidos e posts
- Receita total

### Produtos (CRUD Completo)
- Listar todos os produtos
- Criar novos produtos
- Editar produtos existentes
- Deletar produtos
- Tipos: Pronta entrega, Sob encomenda, Digital

### Pedidos
- Listar todos os pedidos
- Ver detalhes dos pedidos
- Atualizar status do pedido
- Status: Pendente → Pago → Enviado → Entregue

### Blog
- Gerenciar posts
- Criar/editar/deletar posts
- Upload de capa (URL)
- Slug automático gerado do título

## 🔧 Configuração

### Variáveis de Ambiente

Edite `src/services/api.js` se precisar mudar a URL da API:

```javascript
const API_URL = 'http://localhost:3000/api'; // Mude aqui se necessário
```

### Proxy Automático

O Vite está configurado para fazer proxy de requisições para `/api` → `http://localhost:3000/api`.

Se você tiver CORS issues:
1. Certifique-se de que o backend está com CORS habilitado
2. Ou use o proxy do Vite (já configurado)

## 📡 Integração com Backend

O painel se comunica com o backend via HTTP REST:

```
Frontend (React - 5173)
       ↓
Proxy Vite
       ↓
Backend (Node.js - 3000)
       ↓
Banco de Dados (SQLite)
```

### Endpoints disponíveis

**Produtos**
- `GET /api/products` - Listar
- `GET /api/products/:id` - Obter um
- `POST /api/products` - Criar
- `PUT /api/products/:id` - Atualizar
- `DELETE /api/products/:id` - Deletar

**Pedidos**
- `GET /api/orders` - Listar
- `GET /api/orders/:id` - Obter um
- `POST /api/orders` - Criar
- `PUT /api/orders/:id/status` - Atualizar status

**Posts**
- `GET /api/posts` - Listar
- `GET /api/posts/:id` - Obter um
- `POST /api/posts` - Criar
- `PUT /api/posts/:id` - Atualizar
- `DELETE /api/posts/:id` - Deletar

## 🎯 Stack Tecnológico

- **React 18** - UI library
- **Vite** - Build tool rápido
- **React Router v6** - Roteamento
- **Tailwind CSS** - Estilização
- **Fetch API** - HTTP client

## 📦 Dependências Principais

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.20.0",
  "tailwindcss": "^3.4.1",
  "vite": "^5.0.0"
}
```

## 🚨 Troubleshooting

### "Cannot GET /api/products"
- Backend não está rodando em `http://localhost:3000`
- Ou a rota não foi inicializada
- Verifique: `curl http://localhost:3000/api`

### CORS Error
- Verifique se o backend tem CORS configurado
- Ou use o proxy automático do Vite (já está configurado)

### Vite port 5173 já em uso
```bash
npm run dev -- --port 5174
```

### Build falha
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 🌐 Deploy

### Para produção (Netlify, Vercel, etc):

```bash
npm run build
# A pasta `dist/` está pronta para deploy
```

### Variáveis de ambiente em produção

Crie um arquivo `.env.production` (não versionado):
```
VITE_API_URL=https://seu-backend.com/api
```

E atualize `src/services/api.js`:
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
```

## 📝 Próximos Passos

- [ ] Autenticação de usuários
- [ ] Upload de imagens para produtos
- [ ] Filtros e busca avançada
- [ ] Relatórios e gráficos
- [ ] Integração de pagamento
- [ ] Dark mode
- [ ] Exportar dados (CSV/PDF)

## 🆘 Suporte

Se tiver problemas:
1. Verifique se o backend está rodando
2. Veja o console do navegador (F12)
3. Veja os logs do backend
4. Verifique a rede (aba Network no DevTools)

## 📄 Licença

MIT

---

**Desenvolvido com ❤️ para o Jardim do Fazer**
