# Como hospedar na Hostinger

## Passo a passo para deploy:

### 1. Preparar os arquivos
```bash
# Instalar dependências
npm install

# Gerar build de produção
npm run build
```

### 2. Upload na Hostinger
- Acesse o **File Manager** da Hostinger
- Vá para a pasta `public_html/`
- Faça upload de **TODOS** os arquivos da pasta `dist/` (gerada após o build)
- Certifique-se que o arquivo `.htaccess` foi copiado também

### 3. Configuração do domínio
- Se estiver usando um subdomínio, aponte-o para a pasta correta
- Para domínio principal, os arquivos devem estar em `public_html/`

### 4. Teste
- Acesse seu domínio
- Teste todas as páginas (navegação deve funcionar)
- Verifique se os formulários carregam corretamente

## Arquivos importantes:
- ✅ `.htaccess` - Configuração para SPA (Single Page Application)
- ✅ Todos os arquivos da pasta `dist/`
- ✅ Supabase já configurado (funciona em qualquer hospedagem)

## Troubleshooting:
- **Página 404 ao navegar**: Verifique se o `.htaccess` foi copiado
- **CSS não carrega**: Verifique se os arquivos estão na pasta correta
- **Erro de CORS**: Supabase já está configurado para qualquer domínio

## Domínio personalizado:
1. Configure o DNS do seu domínio para apontar para a Hostinger
2. Aguarde propagação (24-48h)
3. Acesse via seu domínio personalizado