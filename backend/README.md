# 🌸 Jardim do Fazer - Backend

Sistema de ecommerce para produtos físicos e digitais com blog integrado.

## 📋 Pré-requisitos

- Node.js v16+ instalado
- npm v7+

Verifique com:
```bash
node --version
npm --version
```

## 🚀 Instalação e Setup

### 1. Navegar para a pasta do projeto

```bash
cd "/home/jcdev/Documents/projetos/jardim do fazer/backend"
```

### 2. Instalar dependências

```bash
npm install
```

Isso vai instalar:
- **express** — framework web
- **sqlite3** — banco de dados

### 3. Iniciar o servidor

```bash
npm start
```

Você deve ver:
```
╔════════════════════════════════════════╗
║  🌸 JARDIM DO FAZER - Backend Started  ║
║                                        ║
║  📍 http://localhost:3000/api          ║
║                                        ║
║  ✅ Banco de dados: SQLite ativado     ║
║  ✅ Rotas: /products, /orders, /posts  ║
╚════════════════════════════════════════╝
```

## 📚 API Endpoints

### Base URL
```
http://localhost:3000/api
```

### PRODUTOS

**Listar todos os produtos**
```bash
GET /products
```

**Obter produto por ID**
```bash
GET /products/:id
```

**Criar novo produto**
```bash
POST /products
Content-Type: application/json

{
  "name": "Urso de Crochê",
  "description": "Urso feito à mão",
  "price": 49.90,
  "type": "fisico_encomenda",
  "stock": 10,
  "production_time": 7
}
```

**Atualizar produto**
```bash
PUT /products/:id
Content-Type: application/json

{
  "name": "Urso de Crochê XL",
  "description": "Urso grande feito à mão",
  "price": 79.90,
  "type": "fisico_encomenda",
  "stock": 5,
  "production_time": 10
}
```

**Deletar produto**
```bash
DELETE /products/:id
```

---

### PEDIDOS

**Listar todos os pedidos**
```bash
GET /orders
```

**Obter pedido por ID**
```bash
GET /orders/:id
```

**Criar novo pedido**
```bash
POST /orders
Content-Type: application/json

{
  "customer_name": "João Silva",
  "email": "joao@email.com",
  "phone": "11999999999",
  "items": [
    {
      "product_id": 1,
      "quantity": 2,
      "price": 49.90
    }
  ]
}
```

**Atualizar status do pedido**
```bash
PUT /orders/:id/status
Content-Type: application/json

{
  "status": "paid"
}
```

Status válidos: `pending`, `paid`, `shipped`, `delivered`

---

### BLOG (POSTS)

**Listar todos os posts**
```bash
GET /posts
```

**Obter post por ID**
```bash
GET /posts/:id
```

**Obter post por slug**
```bash
GET /posts/slug/:slug
```

**Criar novo post**
```bash
POST /posts
Content-Type: application/json

{
  "title": "Meu Primeiro Crochê",
  "content": "Neste post vou ensinar como fazer...",
  "cover_image": "https://exemplo.com/imagem.jpg"
}
```

**Atualizar post**
```bash
PUT /posts/:id
Content-Type: application/json

{
  "title": "Crochê para Iniciantes",
  "content": "Conteúdo atualizado...",
  "cover_image": "https://exemplo.com/nova-imagem.jpg"
}
```

**Deletar post**
```bash
DELETE /posts/:id
```

---

## 🗄️ Estrutura do Banco de Dados

### products
- id: chave primária
- name: texto
- description: texto (opcional)
- price: número
- type: 'fisico_encomenda' | 'fisico_pronta' | 'digital'
- stock: número (opcional)
- production_time: dias (opcional)
- created_at: data/hora

### orders
- id: chave primária
- customer_name: texto
- email: texto
- phone: texto (opcional)
- status: 'pending' | 'paid' | 'shipped' | 'delivered'
- total_price: número
- payment_method: texto (opcional)
- created_at: data/hora

### order_items
- id: chave primária
- order_id: chave estrangeira
- product_id: chave estrangeira
- quantity: número
- price: número

### posts
- id: chave primária
- title: texto
- slug: texto (automático, único)
- content: texto
- cover_image: URL (opcional)
- created_at: data/hora

### digital_products
- id: chave primária
- product_id: chave estrangeira única
- file_url: texto
- access_type: 'download' | 'course'

### user_access
- id: chave primária
- email: texto
- product_id: chave estrangeira
- access_link: texto
- password: texto (opcional)
- expires_at: data/hora (opcional)
- created_at: data/hora

### product_images
- id: chave primária
- product_id: chave estrangeira
- image_url: texto
- order_index: número

---

## 🧪 Testando com cURL

```bash
# Criar um produto
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Meu Produto",
    "price": 99.90,
    "type": "fisico_pronta"
  }'

# Listar produtos
curl http://localhost:3000/api/products

# Criar um post
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Meu Post",
    "content": "Conteúdo do post aqui"
  }'
```

---

## 📁 Estrutura de Pastas

```
backend/
├── app.js                          # Arquivo principal
├── package.json                    # Dependências
├── jardim.db                       # Banco de dados (criado automaticamente)
├── database/
│   └── db.js                       # Configuração do SQLite
├── controllers/
│   ├── productController.js        # Lógica de produtos
│   ├── orderController.js          # Lógica de pedidos
│   └── postController.js           # Lógica de blog
└── routes/
    ├── productRoutes.js            # Rotas de produtos
    ├── orderRoutes.js              # Rotas de pedidos
    └── postRoutes.js               # Rotas de blog
```

---

## ⚙️ Próximos Passos

Depois de ter o backend rodando:

1. **Painel Admin** — para gerenciar produtos, pedidos e posts
2. **Frontend** — página de produtos, checkout, blog
3. **Integração de Pagamento** — Stripe ou Mercado Pago
4. **Autenticação** — login para admin
5. **Upload de Imagens** — assets e covers
6. **Email** — confirmação de pedidos

---

## 🆘 Troubleshooting

**Porta 3000 já está em uso?**
```bash
# Mudar a porta
PORT=3001 npm start
```

**Erro ao instalar dependências?**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Banco de dados corrompido?**
```bash
rm jardim.db
npm start
```

---

**Desenvolvido com ❤️ para o Jardim do Fazer**
