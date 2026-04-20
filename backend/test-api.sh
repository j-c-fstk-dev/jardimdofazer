#!/bin/bash

# Script para testar a API do Jardim do Fazer

API_URL="http://localhost:3000/api"

echo "🌸 Testando API do Jardim do Fazer"
echo "=================================="

# Teste 1: Health Check
echo ""
echo "1️⃣  Health Check"
curl -s "$API_URL" | jq .
echo ""

# Teste 2: Criar um produto
echo "2️⃣  Criando um produto..."
PRODUCT=$(curl -s -X POST "$API_URL/products" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Urso de Crochê",
    "description": "Urso feito à mão com amor",
    "price": 49.90,
    "type": "fisico_encomenda",
    "stock": 10,
    "production_time": 7
  }')

echo "$PRODUCT" | jq .
PRODUCT_ID=$(echo "$PRODUCT" | jq -r '.data.id')
echo "Produto criado com ID: $PRODUCT_ID"
echo ""

# Teste 3: Listar produtos
echo "3️⃣  Listando produtos..."
curl -s "$API_URL/products" | jq .
echo ""

# Teste 4: Obter produto específico
echo "4️⃣  Obtendo produto $PRODUCT_ID..."
curl -s "$API_URL/products/$PRODUCT_ID" | jq .
echo ""

# Teste 5: Criar um pedido
echo "5️⃣  Criando um pedido..."
ORDER=$(curl -s -X POST "$API_URL/orders" \
  -H "Content-Type: application/json" \
  -d "{
    \"customer_name\": \"João Silva\",
    \"email\": \"joao@email.com\",
    \"phone\": \"11999999999\",
    \"items\": [
      {
        \"product_id\": $PRODUCT_ID,
        \"quantity\": 2,
        \"price\": 49.90
      }
    ]
  }")

echo "$ORDER" | jq .
ORDER_ID=$(echo "$ORDER" | jq -r '.data.id')
echo "Pedido criado com ID: $ORDER_ID"
echo ""

# Teste 6: Listar pedidos
echo "6️⃣  Listando pedidos..."
curl -s "$API_URL/orders" | jq .
echo ""

# Teste 7: Criar um post
echo "7️⃣  Criando um post..."
POST=$(curl -s -X POST "$API_URL/posts" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Meu Primeiro Crochê",
    "content": "Neste post vou ensinar como fazer seu primeiro crochê de forma simples e prática."
  }')

echo "$POST" | jq .
POST_ID=$(echo "$POST" | jq -r '.data.id')
echo "Post criado com ID: $POST_ID"
echo ""

# Teste 8: Listar posts
echo "8️⃣  Listando posts..."
curl -s "$API_URL/posts" | jq .
echo ""

# Teste 9: Atualizar status do pedido
echo "9️⃣  Atualizando status do pedido para 'paid'..."
curl -s -X PUT "$API_URL/orders/$ORDER_ID/status" \
  -H "Content-Type: application/json" \
  -d '{"status": "paid"}' | jq .
echo ""

echo "✅ Testes concluídos!"
