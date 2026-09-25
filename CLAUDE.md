# CLAUDE.md

Instruções para agentes trabalhando neste repositório.

## O que é

ReciclaLito: aplicativo web de consulta sobre descarte de resíduos e segurança no
manuseio de recicláveis. Projeto de extensão da Universidade Católica de Brasília em
parceria com a Papelito Brasil. O público são catadores de material reciclável.

Site estático, sem build, sem dependências, sem framework. HTML, CSS e JavaScript
puro (ES5, `var` e `function`, sem transpilação). Funciona sem internet depois do
primeiro acesso, via service worker.

## Tarefas pedidas

1. Inicializar o repositório git e subir para o GitHub.
2. Publicar. Ver `README.md` para a discussão de GitHub Pages versus Vercel — há um
   motivo não técnico para preferir Pages neste caso. Confirme com a pessoa antes de
   escolher.

## Regras que não devem ser quebradas

**Conteúdo só se muda no `conteudo.js`.** Textos, materiais, riscos, itens da busca,
etapas da trilha, perguntas e primeiros socorros estão todos lá,
com comentários explicando cada campo. Não mova conteúdo para dentro do `app.js`: a
Papelito edita esse arquivo pelo navegador do GitHub, sem saber programar, e é isso
que mantém o projeto vivo depois da entrega.

**Sempre troque a `VERSAO` no `sw.js` ao alterar qualquer arquivo do app.** Primeira
linha de código do arquivo. Sem isso, quem já instalou continua com a versão antiga
até o segundo acesso.

**Não troque a estratégia do service worker para rede-primeiro.** Ela já foi
rede-primeiro e travava mais de 25 segundos com sinal fraco, que é a condição normal
de uso no galpão e na rua. Está documentado num comentário dentro do próprio `sw.js`.
Se precisar mexer, rode `testes/teste_3_offline.py` antes e depois.

**Não introduza `localStorage` novo sem `try/catch`.** O app roda em WebView e em
navegador com armazenamento bloqueado. O acesso existente já está protegido.

**Não adicione dependência, bundler, framework ou etapa de build.** A ausência disso
é uma decisão de projeto: quem herda o código precisa conseguir abrir um arquivo e
entender. Ver `docs/HISTORICO.md`.

**Não adicione cadastro, login ou coleta de dado pessoal sem pedir antes.** O projeto
declara que não coleta nenhum dado, o que hoje o mantém fora das obrigações da LGPD.
Os usuários são população em trabalho majoritariamente informal. Mudar isso é decisão
da coordenação do projeto, não de implementação.

**Comentários e nomes de variáveis em português.** O código todo está assim.

## Antes de qualquer commit

```bash
cd testes && python3 rodar-tudo.py
```

São 73 verificações em cinco baterias, com Playwright. Se faltar o navegador:

```bash
pip install playwright && playwright install chromium
```

Nenhum commit deve ser feito com teste falhando. Se um teste falhar depois de uma
mudança sua, investigue se o teste está errado ou se o app está — os dois já
aconteceram neste projeto e estão registrados no histórico.

## Pendência que bloqueia a divulgação do endereço

Não é bloqueio para publicar. É bloqueio para mandar o link para alguém.

1. **`conteudo.js`, bloco `emergencia`.** Primeiros socorros escritos a partir de
   orientação geral, sem revisão de profissional de saúde. É o único conteúdo do app
   em que um erro machuca alguém. Precisa da revisão antes de circular.

Se a pessoa pedir para divulgar antes disso, avise sobre isso.

## Não existe rede de pontos de entrega

O app já teve uma seção "Onde entregar perto de você" (bloco `pontos` em
`conteudo.js`, função `blocoPontos` em `app.js`), pensada para quem precisa achar um
local físico para deixar um material. Foi removida: o fluxo real é a RCS reciclar
tudo e entregar direto aos catadores da ACOBRAZ, não uma rede pública de pontos de
coleta espalhados. Não reintroduza essa seção sem confirmar antes com a coordenação
do projeto que o fluxo mudou.

Isso é diferente do bloco `pontosInternos` (adicionado depois, ver
`docs/HISTORICO.md`): aquele é um único ponto de descarte DENTRO da própria empresa
(sala do Financeiro, para pilha e eletrônico pequeno, recolhido pela ACOBRAZ), não uma
rede pública de coleta. Confirmado com a coordenação antes de adicionar. Mesma regra
vale para ele: não adicione outro ponto interno sem confirmação.

## Mapa dos arquivos

| Caminho | O que é |
|---|---|
| `index.html`, `estilo.css`, `app.js` | Estrutura, estilo e navegação. |
| `conteudo.js` | Todo o conteúdo editável. |
| `sw.js` | Funcionamento sem internet. Contém a `VERSAO`. |
| `manifest.json` | Instalação no celular. |
| `vercel.json` | Cabeçalhos de cache. Só é lido na Vercel. |
| `LEIA-ME.md` | Manual da Papelito. Escrito para quem não programa. |
| `docs/HISTORICO.md` | O que mudou, quando e por quê. |
| `docs/ROTEIRO-REUNIAO.md` | Material de campo. Não faz parte do app. |
| `testes/` | Playwright. Rodar antes de commitar. |
| `ferramentas/montar-previa.py` | Gera um HTML de arquivo único para mandar por e-mail. |

## Ao terminar

Atualize `docs/HISTORICO.md` com o que você fez. O projeto troca de mãos várias vezes
e esse arquivo é o que evita refazer decisão já tomada.
