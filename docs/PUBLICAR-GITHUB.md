# Publicar a atualização no GitHub Pages

Repositório original: https://github.com/yzkadu/ReciclaLito
Endereço do projeto: https://yzkadu.github.io/ReciclaLito/

Esta versão foi preparada localmente e publicada no Sites. A atualização do GitHub é uma etapa separada, a ser feita com uma conta que tenha permissão de escrita no repositório original. Não é preciso criar outro repositório.

1. Atualize o clone do repositório original antes de incorporar as mudanças e confira eventuais alterações recentes de outras pessoas.
2. Copie os arquivos públicos da raiz: `index.html`, `app.js`, `conteudo.js`, `estilo.css`, `sw.js`, `manifest.json` e as pastas completas `fotos/`, `fontes/` e `icones/`.
3. Leve também a documentação e os testes atualizados. A pasta `dist/` é uma cópia de publicação do Sites; não é necessária ao Pages configurado pela raiz. Não envie `.openai/`, credenciais, arquivos temporários nem capturas de teste.
4. Execute `cd testes && python3 rodar-tudo.py`. Confira as mudanças antes do commit, envie à branch do projeto e preserve o histórico; não use push forçado.
5. Em Settings → Pages, confirme a branch usada e a pasta `/ (root)` em Deploy from a branch. Se o projeto já usa outro fluxo de publicação, preserve-o e confira de onde ele lê os arquivos públicos.
6. Aguarde a publicação e confira o endereço exibido pelo GitHub. Teste uma ficha, a trilha, o quiz e o recarregamento offline após o primeiro acesso.

O app usa caminhos relativos e foi testado em subpasta. HTTPS é necessário ao service worker. O cache desta versão é `reciclalito-v22`; em atualizações futuras, incremente a versão e mantenha a lista de arquivos locais atualizada.

Referência: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
