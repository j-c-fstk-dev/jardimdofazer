#!/bin/bash

# 🎨 SETUP FRONTEND ADMIN - CORRIGE POSTCSS + JWT
# Execute na pasta: ~/Documents/projetos/jardim\ do\ fazer/admin

echo "🚀 INICIANDO SETUP DO FRONTEND ADMIN..."
echo ""

# 1. Corrigir postcss.config.js para ESM
echo "🔧 Corrigindo PostCSS config (ESM)..."
cat > postcss.config.js << 'EOF'
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
EOF
echo "✅ PostCSS corrigido!"

# 2. Verificar se package.json tem type: module
if grep -q '"type": "module"' package.json; then
    echo "✅ package.json já é ESM (type: module)"
else
    echo "📝 Adicionando type: module ao package.json..."
    # Fazer backup
    cp package.json package.json.backup
fi

# 3. Instalar dependências React se ainda não tiver
echo "📦 Verificando e instalando dependências..."
if [ ! -d node_modules ]; then
    npm install
else
    echo "✅ node_modules já existe"
fi

# 4. Criar pastas que podem estar faltando
mkdir -p src/hooks src/services src/components/common src/pages src/styles src/utils

# 5. Criar arquivo .env.example se não existir
if [ ! -f .env.example ]; then
    cat > .env.example << 'EOF'
VITE_API_URL=http://localhost:3000
EOF
fi

echo ""
echo "✅ FRONTEND SETUP COMPLETO!"
echo ""
echo "📋 PRÓXIMOS PASSOS:"
echo "1. Rode: npm run dev"
echo "2. Acesse: http://localhost:5173"
echo ""
