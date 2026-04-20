#!/bin/bash

# 🔧 SETUP BACKEND - JWT + CLOUDINARY
# Execute na pasta: ~/Documents/projetos/jardim\ do\ fazer/backend

echo "🚀 INICIANDO SETUP DO BACKEND..."
echo ""

# 1. Instalar novas dependências
echo "📦 Instalando dependências (JWT + Cloudinary)..."
npm install jsonwebtoken bcryptjs dotenv cloudinary express-fileupload

# 2. Criar arquivo .env se não existir
if [ ! -f .env ]; then
    echo "📝 Criando arquivo .env..."
    cat > .env << 'EOF'
# JWT Configuration
JWT_SECRET=sua_chave_super_secreta_aleatorio_aqui_12345_MUDAR_DEPOIS
JWT_EXPIRATION=7d

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=seu_cloud_name_aqui
CLOUDINARY_API_KEY=sua_api_key_aqui
CLOUDINARY_API_SECRET=sua_api_secret_aqui

# Server Configuration
PORT=3000
NODE_ENV=development
EOF
    echo "✅ Arquivo .env criado! (EDITE COM SUAS CREDENCIAIS CLOUDINARY)"
else
    echo "✅ Arquivo .env já existe"
fi

# 3. Criar pastas que podem estar faltando
mkdir -p services middlewares uploads

echo ""
echo "✅ BACKEND SETUP COMPLETO!"
echo ""
echo "📋 PRÓXIMOS PASSOS:"
echo "1. Edite o arquivo .env com suas credenciais Cloudinary"
echo "2. Rode: npm start"
echo ""
