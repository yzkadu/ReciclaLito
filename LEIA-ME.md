# ReciclaLito

Aplicativo web de consulta sobre descarte correto de resíduos e segurança no manuseio
de recicláveis. Funciona no navegador do celular, instala sem loja de aplicativos e
continua funcionando sem internet depois do primeiro acesso.

Projeto de extensão universitária — Universidade Católica de Brasília,
em parceria com a Papelito Brasil.

---

## 1. Publicar pela primeira vez

O jeito mais simples é o GitHub Pages: é gratuito, dá endereço com HTTPS (obrigatório
para o app funcionar sem internet) e depois você edita tudo pelo próprio navegador.

1. Crie uma conta em github.com, se ainda não tiver.
2. Clique em **New repository**. Nome: `reciclalito`. Marque **Public**. Crie.
3. Na tela do repositório, clique em **uploading an existing file**.
4. Arraste **todos** os arquivos e as duas pastas (`fontes` e `icones`). Confirme em
   **Commit changes**.
5. Vá em **Settings → Pages**. Em *Source*, escolha **Deploy from a branch**,
   branch `main`, pasta `/ (root)`. Salve.
6. Espere um ou dois minutos. O endereço aparece no topo dessa mesma página, no
   formato `https://SEU-USUARIO.github.io/reciclalito/`.

Esse endereço é o que você manda para a Papelito e para os participantes.

> ### Publicar na Vercel

Serve igual e é mais rápido no Brasil. Também é o caminho obrigatório se um dia o
projeto ganhar cadastro ou banco de dados, porque o GitHub Pages não roda código de
servidor.

1. Crie conta em vercel.com usando o login do GitHub.
2. **Add New → Project**, escolha o repositório `reciclalito`, **Import**.
3. Em Framework Preset deixe **Other**. Não preencha build command nem output
   directory: o app não tem etapa de build.
4. **Deploy**. O endereço sai em `https://reciclalito.vercel.app`.

Depois disso, todo `commit` no GitHub republica sozinho.

> **O arquivo `vercel.json` que está no repositório importa.** Ele diz para a Vercel
> não guardar o `sw.js` em cache. Sem isso, o servidor entrega o service worker
> antigo por horas e a troca da `VERSAO` não adianta nada — você publica a correção
> e ninguém recebe. As fontes e os ícones seguem com cache longo, que é o certo,
> porque nunca mudam.

O GitHub Pages tem o mesmo problema em menor grau: ele guarda os arquivos por
10 minutos e não dá para configurar. Na prática significa esperar um pouco mais
para a mudança chegar.

Alternativas com o mesmo resultado: Netlify Drop (netlify.com/drop), onde basta
> arrastar a pasta, ou Cloudflare Pages. Qualquer um serve. O GitHub tem a vantagem
> de guardar o histórico e de já ser o lugar de onde você entrega o código-fonte
> à instituição no fim do projeto.

---

## 2. Mudar o conteúdo

**Quase tudo que você vai querer mudar está no arquivo `conteudo.js`.**
Textos, materiais, riscos, etapas da trilha e perguntas da verificação estão lá,
com comentários explicando cada parte. Você não precisa mexer em mais nenhum arquivo.

Para editar direto no navegador:

1. Abra o repositório no GitHub.
2. Clique em `conteudo.js`.
3. Clique no ícone de lápis (**Edit this file**).
4. Faça a alteração.
5. Desça e clique em **Commit changes**.
6. Um ou dois minutos depois o site já está atualizado.

### Cuidados ao editar

- Todo texto fica entre aspas: `separar: 'Guarde seco e limpo.'`
- Se o texto tiver apóstrofo, use aspas duplas por fora: `"não pode"`.
- Cada item termina com vírgula.
- Para acrescentar um material, copie um bloco inteiro entre `{` e `}`, cole logo
  abaixo e mude o conteúdo. O `id` precisa ser diferente dos que já existem.

### A lista da busca (`itens`)

O campo **Buscar** do módulo 1 usa o bloco `itens` do `conteudo.js`. É a lista de
objetos do dia a dia — isopor, fralda, latinha, remédio vencido — para quem está com
a coisa na mão e não sabe em qual dos sete materiais ela entra.

Cada item tem, no máximo, estes campos:

| Campo | Para que serve |
|---|---|
| `nome` | Como aparece na lista de resultados. |
| `busca` | Outros jeitos de escrever o mesmo, separados por espaço. A busca ignora acento e maiúscula, então `latinha lata aluminio` já cobre bastante. |
| `vai` | Para qual ficha o item leva: `{ modulo: 'materiais', id: 'papel' }` ou `{ modulo: 'riscos', id: 'baterias' }`. |
| `resposta` | Use **no lugar de** `vai` quando o item não tem ficha (rejeito, orgânico, farmácia). Texto curto, direto. |
| `destino` | Rótulo curto que aparece ao lado do nome. Obrigatório só quando você usa `resposta`. |
| `nota` | Observação opcional, aparece em cinza embaixo do nome. |

Para acrescentar um item, copie um bloco `{ ... }` inteiro, cole logo abaixo e mude o
conteúdo. Não precisa de `id`.

> A lista que veio pronta é um **ponto de partida técnico**. O que uma cooperativa
> aceita a outra recusa — isopor e canudo são os casos mais comuns. Confira com os
> catadores antes de entregar.

### Os primeiros socorros (`emergencia`)

Bloco novo, no fim do módulo 2, atrás do botão vermelho "Deu errado. E agora?".
O módulo ensinava a evitar acidente e parava aí — não dizia o que fazer depois que
cortou a mão ou espetou uma agulha.

Cada situação tem três campos: `agora` (o que fazer no minuto seguinte),
`procure` (quando parar e ir atrás de atendimento) e `nunca` (o erro comum que
piora a situação).

> **Não publique este bloco sem revisão.** Foi escrito a partir de orientação geral
> de primeiros socorros, não por profissional de saúde. Peça para a enfermagem do
> posto que atende a cooperativa ler antes. É o único conteúdo do app em que um
> erro machuca alguém de verdade.

### A trilha de integração (`trilha` e `perguntas`)

É o módulo 3, o treinamento de quem está começando. Cada etapa é um bloco
`{ id, titulo, texto }`; a última etapa da lista é sempre a verificação final —
não precisa marcar isso de nenhum jeito especial, o app entende sozinho pela
posição.

Para acrescentar uma etapa, copie um bloco inteiro, cole antes da etapa
"Verificação final" e mude o conteúdo. O `id` precisa ser diferente dos que já
existem (`t1`, `t2`...). O campo `ver` é opcional: se a etapa fala de um material
ou risco que já tem ficha própria, `ver: { modulo: 'materiais', id: 'papel' }`
(ou `modulo: 'riscos'`) faz aparecer um botão "Ver a ficha completa". A
quantidade de etapas é livre — pode ter mais ou menos que as de hoje.

O bloco `perguntas`, logo abaixo, é a verificação final: uma pergunta por linha,
com `opcoes` e `certa` marcando qual posição da lista `opcoes` é a resposta certa
(a primeira posição é `0`). As perguntas aparecem em ordem, mas as opções de
cada uma embaralham sozinhas. Ao acrescentar uma etapa nova na trilha, vale
acrescentar também uma pergunta sobre o assunto dela aqui, para a verificação
continuar cobrindo tudo que foi ensinado — mas isso é indicado, não obrigatório.

### Quanto rende

Cada material tem `valor` (`'baixo'`, `'medio'` ou `'alto'`) e `rende`, um texto
curto. Vira três barrinhas na ficha.

Não há preço em reais de propósito: muda toda semana e varia por cooperativa, e
número desatualizado no app vira discussão no balcão. Se a cooperativa quiser
publicar preço, o caminho é acrescentar ao texto de `rende` junto com a data, e
combinar quem atualiza.

### Depois de publicar uma mudança

Abra `sw.js` e troque o número da versão na primeira linha de código:

```
const VERSAO = 'reciclalito-v4';   →   const VERSAO = 'reciclalito-v5';
```

Isso avisa os celulares que já instalaram o app de que existe uma versão nova.

Se você esquecer de trocar, a mudança não se perde: ela aparece no **segundo**
acesso de quem já tinha o app instalado. O app abre sempre com o que está guardado
no aparelho e procura versão nova por trás. Trocar a VERSAO é o que faz a mudança
aparecer já no primeiro acesso.

---

## 3. O que é cada arquivo

| Arquivo | Para que serve |
|---|---|
| `conteudo.js` | **Todo o conteúdo.** É aqui que você edita. |
| `vercel.json` | Cabeçalhos de cache. Só é lido se você publicar na Vercel. |
| `ROTEIRO-REUNIAO.md` | Perguntas para a reunião de diagnóstico com os catadores. Não faz parte do app. |
| `index.html` | Estrutura da página. |
| `estilo.css` | Cores, tamanhos e layout. |
| `app.js` | Navegação e funcionamento das telas. |
| `sw.js` | Faz o app funcionar sem internet. |
| `manifest.json` | Permite instalar no celular. |
| `fontes/` | Fontes da marca, guardadas junto para funcionar offline. |
| `icones/` | Ícone que aparece na tela do celular. |

---

## 4. Decisões de projeto

**As cores dos materiais não são da marca.** Azul para papel, vermelho para plástico,
verde para vidro, amarelo para metal, laranja para perigosos e marrom para orgânicos
seguem a Resolução CONAMA 275. Quem trabalha com resíduo já lê essas cores. Trocá-las
pela paleta da Papelito quebraria a utilidade da ferramenta. A identidade da empresa
fica no invólucro: amarelo, preto e a tipografia.

**O óleo de cozinha não usa cor do código.** Marrom, na CONAMA 275, é orgânico.
O óleo não é orgânico e não vai em lixeira nenhuma. Deixá-lo marrom contradizia a
etapa 2 da própria trilha, que ensina o código de cores duas telas antes. Ele agora
aparece com fundo claro e borda tracejada, dizendo que está fora do código, e a
etapa 2 explica a exceção.

**Alvos de toque grandes e texto curto** porque o uso real acontece no galpão ou na
rua, com o celular na mão e às vezes de luva.

**O app abre do que está guardado no aparelho, não da internet.** Parece detalhe
técnico, mas muda o uso: com sinal fraco — que é o normal no galpão e na rua — o
celular não recebe erro, ele fica pendurado esperando resposta. Testado aqui, a
versão anterior levava mais de 25 segundos para abrir uma tela nessa situação, pior
do que estar sem sinal nenhum. Buscando primeiro no aparelho, abre na hora dos dois
jeitos.

**Sem cadastro e sem login.** O progresso da trilha fica salvo no próprio aparelho.
Nenhum dado pessoal é coletado ou enviado para lugar nenhum, o que dispensa
tratamento de dados e mantém o app funcionando offline.

---

## 5. Antes de entregar

- [ ] **Revisar o bloco `emergencia` com alguém da saúde.** Nada de publicar antes.
- [ ] Validar o conteúdo com os catadores na reunião de diagnóstico. Use o
      `ROTEIRO-REUNIAO.md`. Os textos atuais são um ponto de partida técnico e
      precisam da conferência de quem faz o trabalho.
- [ ] Conferir a lista `itens` da busca com os catadores, principalmente isopor,
      canudo, papel alumínio e longa vida, que variam de cooperativa para cooperativa.
- [ ] Testar num celular Android simples, não só no computador.
- [ ] Testar em modo avião depois do primeiro acesso, para conferir o offline.
      (Já conferido em navegador: abre em 0,1s sem rede e 0,0s com sinal fraco.
      Falta a conferência no aparelho de verdade.)
- [ ] Passar o repositório para a Papelito, cumprindo a transferência do código-fonte
      prevista no roteiro do projeto.
