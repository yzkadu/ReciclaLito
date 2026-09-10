# ReciclaLito

Aplicativo web de consulta sobre descarte correto de resíduos e segurança no manuseio
de recicláveis. Funciona no navegador do celular, instala sem loja de aplicativos e
continua funcionando sem internet depois do primeiro acesso.

Projeto de extensão universitária — Universidade Católica de Brasília, em parceria
com a Papelito Brasil.

---

## Por onde começar

| Você é | Leia |
|---|---|
| Quem vai **editar o conteúdo** (Papelito) | [`LEIA-ME.md`](LEIA-ME.md) |
| Quem vai **mexer no código** ou um agente | [`CLAUDE.md`](CLAUDE.md) |
| Quem quer **entender as decisões** | [`docs/HISTORICO.md`](docs/HISTORICO.md) |
| Quem vai **à reunião com os catadores** | [`docs/ROTEIRO-REUNIAO.md`](docs/ROTEIRO-REUNIAO.md) |

---

## Rodar na sua máquina

Não tem build nem dependência. Mas abrir o `index.html` com duplo clique **não
funciona** para testar tudo: `file://` não permite service worker, então o modo
offline não dá para conferir assim. Suba um servidor local:

```bash
python3 -m http.server 8000
```

E abra `http://localhost:8000`.

## Testar

```bash
cd testes && python3 rodar-tudo.py
```

73 verificações com Playwright: navegação, busca, verificação da trilha, comprovante,
modo avião, deploy em subpasta e propagação de atualização. Se faltar o navegador:

```bash
pip install playwright && playwright install chromium
```

Nenhum commit deve ir com teste falhando.

---

## Publicar

O app é estático, então qualquer hospedagem serve. **HTTPS é obrigatório**, senão o
service worker não registra e o app não funciona sem internet. GitHub Pages, Vercel,
Netlify e Cloudflare Pages dão HTTPS de graça.

### GitHub Pages — o recomendado para este projeto

Settings → Pages → Source: *Deploy from a branch*, branch `main`, pasta `/ (root)`.
O endereço sai em `https://SEU-USUARIO.github.io/reciclalito/`.

O app foi testado servido em subpasta (`teste_4_subpasta.py`): service worker,
escopo, cache e modo offline funcionam. Todos os caminhos do projeto são relativos.

Ressalva do Pages: ele guarda arquivos em cache por 10 minutos e não dá para
configurar. Se uma correção não aparecer, espere antes de republicar.

### Vercel — quando o projeto precisar de servidor

Import do repositório, Framework Preset **Other**, sem build command e sem output
directory. O `vercel.json` já está no repositório e impede que o `sw.js` seja
guardado em cache, o que quebraria a publicação de correções.

**Antes de escolher a Vercel, confira o plano.** O gratuito é o Hobby, que proíbe uso
comercial. Um app com a marca da Papelito servindo a operação dela é, no mínimo, área
cinzenta. O GitHub Pages não tem essa restrição. A Vercel passa a fazer sentido se um
dia houver código de servidor, que o Pages não roda.

---

## Antes de mandar o endereço para alguém

Publicar é seguro. Divulgar ainda não:

1. O bloco `emergencia` do `conteudo.js` são primeiros socorros **sem revisão de
   profissional de saúde**.
2. O bloco `pontos` do `conteudo.js` tem **dois endereços inventados**, marcados com
   tarja laranja na tela.

A lista completa de pendências está no fim do [`docs/HISTORICO.md`](docs/HISTORICO.md).
