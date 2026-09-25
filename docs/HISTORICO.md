# Histórico

Registro do que mudou e por quê. Serve para quem pega o projeto depois não refazer
decisão já tomada nem desfazer correção sem saber o que ela corrigia.

---

## Estado inicial

O app chegou funcionando: três módulos, seis materiais, seis riscos, trilha de seis
etapas com verificação, service worker registrando, instalação no celular. Sem erro
de console. A base era sólida e o visual não foi mexido.

O que se fez a partir daí foi teste em navegador de verdade, correção do que apareceu
e acréscimo do que faltava.

---

## Correções

### O comprovante afirmava algo falso

`app.js`, `telaConcluido()`. Quem entrasse direto em `#etapa/t6` e respondesse a
verificação via **"Trilha concluída"** com 1 de 6 etapas feitas. Passou a ler o
progresso real: se faltar etapa, mostra "Verificação feita", diz quantas faltam e
oferece o caminho de volta.

### A resposta certa era sempre a segunda opção

`conteudo.js` tem `certa: 1` nas seis perguntas. Dava para passar na verificação
batendo no meio sem ler nada. As opções passaram a ser embaralhadas na hora de
exibir. **O `conteudo.js` não mudou** — quem edita conteúdo continua escrevendo
`certa: 1` normalmente.

### O placar da verificação sumia ao recarregar

`qAcertos` era variável em memória. Acertos, data e nome passaram a ser gravados no
aparelho junto com o progresso da trilha.

### O botão Voltar podia sair do app

Usava `history.back()`. Quem abrisse por link compartilhado saía do app no primeiro
toque. Passou a ter mapa de tela-pai explícito.

### A barra "Instalar" ignorava o atributo `hidden`

`estilo.css`. A regra `.instalar{display:flex}` vencia o `[hidden]` padrão do
navegador, e faltava `.instalar[hidden]{display:none}` — que existia para `.voltar`
e foi esquecida aqui.

Consequência prática: **em todo iPhone a barra ficava presa na tela**, tapando o
rodapé, com um botão "Instalar" que não fazia nada, porque o Safari nunca dispara
`beforeinstallprompt`. Estava em todas as capturas de tela desde o começo e passou
por normal até um teste automatizado não conseguir clicar no botão que ela cobria.

### O app travava com sinal fraco — a correção mais importante

`sw.js`. A estratégia era rede-primeiro: só usava o cache quando a rede **falhava**.

Sinal fraco não falha. Ele pendura. Medido em navegador:

| Cenário | Antes | Depois |
|---|---|---|
| Modo avião (sem rede nenhuma) | 0,1s | 0,1s |
| Sinal fraco (conecta e não responde) | **mais de 25s** | 0,0s |

Um teste de modo avião passaria limpo e o problema seguiria escondido. E sinal fraco
é a condição normal de uso: galpão e rua, não avião.

Passou a ser cache-primeiro, com atualização por trás. O comentário dentro do `sw.js`
explica o motivo para quem for tentado a reverter.

Efeito colateral aceito: editando só o `conteudo.js`, a mudança aparece no **segundo**
acesso de quem já tem o app. Trocando a `VERSAO`, aparece já no primeiro.

### A verificação final tinha o id `'t6'` escrito direto no `app.js`

`telaEtapa()` decidia mostrar a verificação com `if (id === 't6')`, e `responder()`
gravava o progresso em `p.t6`. Funcionava enquanto a trilha tivesse exatamente seis
etapas e a última se chamasse `t6` — mas o `LEIA-ME.md` promete que dá para
acrescentar etapa só editando `conteudo.js`, sem tocar em código. Ao acrescentar a
sétima e oitava etapa (ver "Trilha maior", abaixo) isso ficou explícito: a
verificação parou de abrir.

Os dois pontos agora usam a última posição de `C.trilha` em vez do id fixo:
`if (id === C.trilha[C.trilha.length - 1].id)`. A verificação continua sendo,
por convenção, a última etapa da lista — só deixou de depender de quantas etapas
existem antes dela.

---

## Acréscimos

### Busca por item do dia a dia

O módulo 1 oferecia seis quadrados. O uso real é "estou com um isopor na mão e não
sei o que é isso". Campo de busca sobre um bloco `itens` novo com 43 objetos comuns.
Ignora acento e maiúscula, aceita mais de uma palavra. Item com ficha leva à ficha;
rejeito, orgânico, farmácia e afins abrem uma tela curta de resposta.

Depois foi promovido também para a tela inicial, porque custava dois toques.

> A lista é ponto de partida técnico e **não foi validada com catadores**. Isopor,
> canudo, papel alumínio e caixa longa vida são os que mais variam por cooperativa.

### O óleo saiu do marrom

A etapa 2 da trilha ensina que marrom é orgânico. Duas telas depois, o módulo 1
mostrava um quadrado marrom escrito "Óleo de cozinha". A regra e a exceção se
contradiziam dentro do mesmo app.

O óleo não é orgânico e não tem cor na CONAMA 275. Passou a aparecer com fundo claro
e borda tracejada, com a etiqueta "fora do código de cores". A etapa 2 ganhou o cinza
(rejeito) e a explicação da exceção.

### O sétimo material: orgânico

O módulo 1 tinha seis materiais e nenhum deles era o orgânico — apesar de "marrom é
orgânico" já estar na etapa 2 da trilha desde o começo, e do item "Resto de comida e
casca" já existir na busca, sem ficha própria, só com uma resposta curta.

Orgânico ganhou ficha igual às dos outros seis: cor marrom (a que já estava reservada
para ele na CONAMA 275), ícone de folha novo em `app.js`, e os mesmos quatro campos —
como separar, onde entregar, quanto rende, atenção. A diferença é o campo `valor`:
em vez de `'baixo'`, `'medio'` ou `'alto'`, veio `'sem venda'`, porque não é isso —
a cooperativa não compra orgânico, então as três barrinhas de "quanto rende" ficam
vazias de propósito. A atenção da ficha é a mesma coisa que a etapa 1 da trilha já
ensinava: orgânico contamina reciclável que encostar nele.

O item "Resto de comida e casca" passou a apontar para a ficha nova em vez de uma
resposta solta, e ganhou um vizinho, "Poda de quintal e folha seca", cobrindo o outro
caso comum de resíduo orgânico fora da cozinha.

Textos que diziam "seis materiais" (`conteudo.js` e `LEIA-ME.md`) viraram "sete".

### "Deu errado. E agora?"

O módulo 2 ensinava a evitar acidente e parava aí. Não dizia o que fazer depois de
cortar a mão, espetar agulha ou ver a bateria esquentar.

Bloco `emergencia` com seis situações, cada uma com **Agora** / **Procure
atendimento** / **Nunca**, mais SAMU e Bombeiros em botões que discam.

> **Não revisado por profissional de saúde.** Ver `CLAUDE.md`.

### Quanto rende

O conteúdo dizia três vezes que separar bem "vale mais" e nunca dizia quanto. Renda é
o motivo pelo qual a pessoa está ali. Cada material ganhou `valor` (baixo, médio,
alto) e `rende`, um texto curto.

Sem preço em reais de propósito: muda toda semana, varia por cooperativa, e número
desatualizado dentro do app vira discussão no balcão.

### Pontos de entrega

O app dizia "ponto de logística reversa" e deixava o **onde** no ar, que é justamente
o que a pessoa com a lâmpada na mão precisa. Bloco `pontos`, com botão que abre o
mapa e botão de ligar.

> Vêm **dois exemplos com endereço inventado**, marcados com tarja laranja. Apagar.

### `vercel.json`

Impede a Vercel de guardar o `sw.js` em cache. Sem isso o servidor entrega o service
worker antigo por horas e trocar a `VERSAO` não adianta: publica-se a correção e
ninguém recebe.

### Trilha maior, com verificação mais completa

O módulo 3 tinha seis etapas curtas. A pedido, os textos das cinco etapas de
conteúdo ficaram mais completos (o texto de cada uma passou a puxar mais detalhe
do que já existe nos módulos de materiais e riscos, sem inventar informação nova),
e entraram duas etapas que faltavam:

- **Vidro e metal na prática** — cuidado com caco, o que não entra junto com vidro
  comum, e por que metal é o material que mais rende por quilo.
- **Cabos e fios: nunca queimar** — por que descascar com alicate em vez de queimar,
  e o porquê (a fumaça solta dioxina e o cobre queimado ainda vale menos).

A verificação final ganhou uma pergunta para cada etapa nova, foi de 6 para 8
perguntas. O comentário no topo do bloco `trilha`, em `conteudo.js`, agora explica
como acrescentar etapa: copiar um bloco `{ id, titulo, texto }`, colar antes da
"Verificação final" e usar um `id` novo. Não precisa mexer em mais nada — o
`app.js` conta as etapas sozinho (ver a correção do `t6` fixo, acima).

**O que ficou de fora, por ora: jogo entre departamentos.** Foi cogitado um modo de
disputa entre equipes/departamentos, além do quiz de verificação que já existe.
Duas coisas pesam contra:

1. O projeto já tinha decidido contra isso — ver "Pontos, medalhas e ranking", em
   *O que não foi feito, e por quê*, abaixo: gamificar treinamento de trabalhador
   adulto tende a soar como deboche.
2. Tecnicamente exigiria saber **quem** é de qual equipe e **onde** guardar o placar
   de cada uma — ou seja, cadastro e um lugar central para os dados, o que fura a
   decisão "sem cadastro, sem coleta de dado pessoal" que hoje mantém o app fora da
   LGPD (ver `CLAUDE.md`).

Não foi implementado. Se a coordenação decidir que quer mesmo assim, é decisão de
projeto — não de quem só está editando `conteudo.js` — e vale revisitar com calma
os dois pontos acima antes de começar.

---

### Mais visual, menos parede de texto

A pedido, uma passada em `app.js` e `estilo.css` para o app depender menos de
parágrafo puro. Nada de conteúdo mudou — só a apresentação:

- **Ícone em todo bloco de ficha.** As fichas de material e de risco (`Como
  separar`, `Onde entregar`, `Atenção`, `Como manusear`) e o bloco de pontos de
  entrega ganharam um ícone ao lado do título. A função `campo()` em `app.js`
  passou a aceitar um quarto parâmetro (`iconeNome`) opcional — quem chama sem
  ele continua funcionando exatamente como antes.
- **Ícone em cada risco do módulo 2**, na lista e na ficha (bateria, lâmpada,
  cabo, placa, tela, toner) — o módulo era só texto e seta.
- **Ícone em cada etapa da trilha**, incluindo a tela de leitura da etapa e a
  tela de verificação. A função nova `iconeEtapa(e)` decide o ícone pelo mesmo
  material/risco que a etapa já referencia (`e.ver`), com um ícone genérico para
  as duas etapas sem `ver` e um ícone próprio para a verificação final — nada
  fixo por posição ou por `id`, para não repetir o erro do `t6` (ver acima).
- **Transição leve entre telas.** `pinta()` agora reaplica a classe `entra` a
  cada navegação, disparando um fade+leve subida em CSS
  (`@keyframes entrada`). É puramente decorativo: `prefers-reduced-motion`
  já zera tudo isso pela regra global que já existia em `estilo.css`.
- **Resposta certa/errada na verificação ganhou uma pequena animação** (um
  "pulo" na opção certa, um tremor na errada) — mesmo `data-estado` que já
  existia, só ganhou `@keyframes` no CSS.
- **Comprovante de trilha concluída ganhou troféu e confete.** Só aparece
  quando as 8 etapas estão de fato concluídas (`completo === true`), é
  `aria-hidden` (decorativo, não muda o que leitor de tela anuncia) e é uma
  comemoração **individual** — não é placar nem comparação entre pessoas ou
  equipes, e por isso não esbarra na decisão registrada em "Pontos, medalhas e
  ranking" (*O que não foi feito, e por quê*, abaixo) nem no motivo 1 do
  "jogo entre departamentos" logo acima.

Rodada a bateria inteira de testes (73 verificações) antes e depois de cada
grupo de mudança; nada quebrou, porque nenhum texto visível mudou e os ícones
são elementos novos (`<svg>`), não substituem nó de texto que algum teste
procurasse.

---

### Segurança e materiais mais visuais, com cartões no lugar de lista

Continuação da passada anterior, a pedido: a lista do módulo 2 (riscos) e as
fichas de material e risco ganharam mais peso visual, sem entrar em foto real
(decisão registrada abaixo).

- **Módulo de riscos virou grade de cartões.** Em vez da lista fina de texto +
  seta, cada risco agora é um cartão com um selo circular colorido em volta do
  ícone, nome e uma seta discreta no canto — mesmo padrão visual da grade de
  materiais do módulo 1.
- **Selo circular no ícone da ficha**, tanto de material quanto de risco (a
  faixa colorida no topo da ficha). O círculo se adapta ao texto claro/escuro
  que o material já declara em `conteudo.js`, então continua legível em fundo
  claro (ex.: óleo, metal) e em fundo escuro.
- **"Deu errado? E agora?" ganhou um ícone por situação** (corte, agulha,
  bateria, olho, toner, lâmpada) — ficou de fora da primeira passada de
  ícones e agora entrou. Um id sem ícone mapeado cai no ícone genérico de
  atenção, então uma situação nova que a Papelito acrescentar em `conteudo.js`
  não quebra nada.
- **"Sempre que for trabalhar" (EPI)** trocou o "✓" por um ícone (o mesmo de
  "Como manusear"), e "Quanto rende" ganhou um ícone de moeda no título.
- **Sobre pedir fotos reais** (do material, do EPI, da situação de risco): não
  entrou nesta passada. O app roda sem internet e sem build, e a forma mais
  simples de trazer imagem de verdade sem violar direito de uso é a própria
  Papelito fornecer as fotos (do galpão, dos próprios EPIs, etc.) para eu
  encaixar — puxar imagem qualquer da internet para um app comercial tem risco
  de direito autoral que não cabe decidir sozinho aqui.

Ícones novos no `ICONES` (em `app.js`): `corte`, `agulha`, `olho`, `moeda`.
73 verificações continuam passando. `VERSAO` de v7 para v8.

---

### Os seis ícones de risco, ilustrados na paleta da marca

Pedido de seguir buscando foto real para os seis riscos do módulo 2 (pilha,
lâmpada, cabo, placa, tela, cartucho). Como o app é público (o link do GitHub
Pages abre pra qualquer um, mesmo sendo uso interno com a Papelito), baixar
foto qualquer da internet sem saber a licença de quem tirou continua sendo
risco de direito autoral — isso não muda com o app sendo de uso restrito.

Caminho escolhido: usei fotos reais do Wikimedia Commons só como referência
visual (a forma real de uma bateria, de um tubo fluorescente, de fio
descascado, de uma placa, de um monitor CRT por dentro, de um cartucho de
toner) e desenhei os seis ícones do zero, na paleta de cor que o app já usa
(amarelo, preto, verde, laranja, o azul do papel). Nenhuma foto entrou no
código — só a ideia de forma. Ficaram mais ilustrados que os outros ícones do
app (cor fixa, não `currentColor`), de propósito: são os únicos pensados a
partir de referência fotográfica.

Se um dia a Papelito conseguir foto de verdade do próprio galpão (do EPI que
usam, de uma bateria de verdade estufada, etc.), essa é a opção melhor — dá
pra trocar o ícone de um risco específico por uma foto sem mexer no resto,
bastando adicionar a imagem e trocar a linha correspondente no objeto
`ICONES` em `app.js`.

73 verificações continuam passando. `VERSAO` de v8 para v9.

---

### Identidade visual real da Papelito, e a decisão de não usar o mascote

A Papelito mandou o material de marca de verdade: guia de marca (PDF), logo em
SVG, fontes originais, e a prancha de adesivos do mascote "Pezito". Pedido:
deixar o site inteiro mais visual, sem tirar nenhum texto, usando esse material
como base — incluindo um efeito de rolagem tipo "revela ao descer a tela".

**Cores.** Antes de trocar qualquer coisa, conferi o guia de marca contra as
variáveis já usadas no CSS (`--amarelo`, `--preto`, `--verde`, `--laranja`): já
batiam exatamente com a cor oficial (inclusive o Pantone). Nenhuma cor precisou
mudar. Acrescentei duas cores de apoio que o app ainda não usava,
`--rosa:#FF25B7` e `--roxo:#AE69FF` — estão disponíveis em `estilo.css`, mas o
próprio guia pede moderação nelas, então não forcei uso em lugar nenhum ainda.

**Fontes.** A fonte de título oficial é "Beastly" (traço irregular, tipo
recortado à mão) e a de texto é "PP Neue Montreal". O próprio guia de marca já
documenta uma ordem de contingência para quando a fonte original não carrega —
Beastly → Ultra → Rockwell → Georgia → serif — que é exatamente a cadeia que o
app já tinha, só faltando a Beastly de verdade na frente. Converti os arquivos
originais (TTF/OTF) para `.woff2` (bem mais leve) e troquei `--display` e
`--texto` em `estilo.css`. `Ultra` e `Archivo` continuam no app como
contingência, exatamente como o guia recomenda.

**Logo, com crédito discreto.** A pedido, o ReciclaLito continua sendo a marca
principal do app — a Papelito aparece como apoiadora, num selo pequeno e em cor
neutra (não na cor forte da marca) no rodapé da tela inicial: "uma iniciativa
Papelito", com o logo oficial em SVG.

**Mascote Pezito: decisão de não usar, revendo o que combinamos antes.**
Tinha sido combinado curar só as poses "limpas" da prancha do Pezito. Ao rever
as cerca de 100 poses, o que apareceu foi diferente do esperado: o desenho de
cigarro/baseado não é um detalhe isolado em algumas poses — ele é estrutural ao
personagem, aparecendo até em poses de outra forma inocentes (lendo, andando de
bicicleta). A prancha também tem, espalhados, um palavrão explícito, um gesto
de mão que parece obsceno e imagens de parafernália. Não existe, portanto, um
subconjunto "limpo" pra extrair — é o personagem inteiro que carrega essa
linguagem adulta, que não combina com um app de treinamento de segurança no
trabalho. Decisão: o Pezito não entrou no ReciclaLito. Isso foi conversado
com a Papelito antes de qualquer coisa ser publicada.

Pelo mesmo motivo, os seis arquivos de fotografia de produto que vieram junto
(sedas, piteiras, filtros, dichavadores, tubelitos, bandejas) não têm relação
com o ReciclaLito e não foram usados.

**Revelação ao rolar a tela.** Acrescentado um sistema leve de "aparece ao
descer a tela", parecido com o efeito usado em sites de produto: cartões de
material, de risco, de socorro, de etapa da trilha, blocos de ficha e o selo de
apoio da Papelito começam com opacidade zero e sobem 16px, e ganham a classe
`.mostrar` (com `IntersectionObserver`, em `app.js`) ao entrarem na tela — sem
JavaScript, ou em navegador sem `IntersectionObserver`, tudo aparece de uma vez,
então o conteúdo nunca depende disso pra ficar visível. Continua respeitando o
`prefers-reduced-motion` que já existia — quem pede menos movimento não vê
nenhuma dessas transições.

Nenhum texto foi retirado nesta mudança — só estilo, fonte, cor e o efeito de
entrada. 73 verificações continuam passando (uma precisou ser ajustada: o
teste de fonte offline conferia a fonte "Ultra", que virou a de contingência —
agora confere a "Beastly", que é a que o app realmente carrega e usa).
`VERSAO` de v9 para v10.

---

### Seção "Sobre a parceria", com o que a Papelito diz fazer em sustentabilidade

Pedido de olhar o site oficial (papelito.com) como inspiração e trazer mais
elementos visuais "naquele modelo" — incluindo o que a empresa fala sobre
carbono zero, reciclagem e reflorestamento.

Levantei o conteúdo direto no site da marca e no blog da Papelito. Quatro
compromissos declarados pela própria empresa entraram como novo bloco de
conteúdo em `conteudo.js` (`C.parceria`), com fonte conferida:

- **Papelito Recicla 200%** — desde 2021 a empresa paga cooperativas de
  catadores para reciclar o dobro do resíduo que produz por mês. A primeira
  parceira foi a ACOBRAZ, cooperativa de catadores de Brazlândia (DF) — achei
  esse o dado mais relevante pra este app especificamente, por conectar direto
  com quem usa o ReciclaLito.
- Carbono neutro (a empresa afirma neutralizar toda a emissão da produção).
- Reflorestamento (meta declarada: 100 mil árvores até 2027).
- Energia solar (a empresa afirma produção 100% solar).

Texto escrito como afirmação da empresa ("a empresa diz/afirma"), não como
fato auditado pelo ReciclaLito — o app não tem como confirmar essas metas de
fora, só registrar o que a Papelito declara publicamente.

Visualmente, a seção segue o mesmo "bloco institucional grande" do site da
marca: faixa cheia com título grande, seguida de cartões (ícone + título +
texto), reaproveitando o padrão de contraste do resto do app (texto sempre
escuro sobre claro; só o selo do ícone muda de cor — verde, neutro, roxo e
amarelo, dentro da paleta oficial). Entra na animação de revelação ao rolar,
igual ao resto da tela inicial.

**Sobre o tom de voz, de novo.** Foi pedido pra "não regrar tanto" o uso de
palavrão, já que é o lema da Papelito. Mantive a decisão de separar visual de
voz (registrada mais acima neste histórico): o texto desta seção e do resto do
app continua sem palavrão — o ReciclaLito carrega a chancela da UCB e é
material de segurança no trabalho, não uma peça de marketing de produto. A
"energia" pedida ficou por conta do visual (cores fortes, tipografia grande,
blocos cheios), não do vocabulário. Combinado com a Papelito antes de
publicar.

Nenhum texto existente foi tirado. 73 verificações continuam passando.
`VERSAO` de v10 para v11.

---

### v11 chegou com cache corrompido em quem acessou logo depois do push

A Papelito avisou que não via a atualização de forma nenhuma, nem essa nem a
sensação de "o site mudou". Investigando: o GitHub Pages usa uma CDN (Fastly)
que não atualiza em todos os servidores ao mesmo tempo — logo depois de um
`git push`, alguns visitantes já recebem o arquivo novo e outros ainda recebem
o antigo, por um tempo (às vezes mais de um minuto).

O problema: o `sw.js` deste app baixa todos os arquivos e guarda no cache
`VERSAO` já no primeiro acesso (`install`). Se alguém abrir o site bem na
janela em que a CDN ainda está desatualizada, o cache grava o conteúdo antigo
— só que com o nome do cache novo (`reciclalito-v11`). Como o app só busca
versão nova quando o número da `VERSAO` muda, esse acesso fica preso com
conteúdo velho para sempre, mesmo o cache "achando" que está atualizado.

Não dá pra evitar 100% esse instante de janela (é do funcionamento da CDN, não
do código deste app), mas dá pra corrigir quem foi pego nela: bastou trocar a
`VERSAO` de novo. Quem ficou com cache velho baixa tudo de novo a partir do
zero, e desta vez a CDN já estava assentada.

Fica de lição: depois de publicar uma mudança visual grande, esperar alguns
minutos antes de abrir o site (ou testar direto no arquivo, sem passar pelo
GitHub Pages) evita cair nessa janela.

Nenhuma mudança de conteúdo ou visual nesta passada — só a troca de versão.
73 verificações continuam passando. `VERSAO` de v11 para v12.

---

### "Sobre a parceria" refeita no formato da página oficial de sustentabilidade

Pedido de seguir de perto o padrão de `papelito.com/sustentabilidade`
especificamente (não só o site em geral). Reestruturei a seção inteira pra
espelhar a sequência real daquela página, cada bloco visualmente parecido com
o equivalente de lá:

1. **Número de árvores em destaque** — bloco cheio (verde) com número grande
   (52.274) e barra de progresso até a meta, no lugar do estilo "estatística
   gigante" que a página oficial usa pra reflorestamento.
2. **"Reciclar mais do que produz"** — o compromisso do Recicla 200%/ACOBRAZ
   virou um destaque próprio (caixa com borda lateral), não mais um cartão
   igual aos outros — é o dado mais forte pra esse público, merecia peso
   próprio.
3. **Selos** (Carbono Zerado, 100 mil árvores, Indústria brasileira) — grade
   de cartões, igual à seção "Selos" do site oficial. Trocei "Carbono neutro"
   por "Carbono Zerado" com o dado mais específico que achei na página deles
   (compensação desde 2021, mais de 40 milhões de produtos), e troquei o
   quarto cartão antigo (Energia solar) por "Indústria brasileira", que é um
   dos três selos reais da página.
4. **Energia solar sozinha** — virou bloco de fechamento próprio (faixa
   preta), igual à página oficial, que também trata esse assunto separado
   dos selos.

Título e textos de cada bloco foram escritos do zero para este projeto — não
copiei nenhuma frase de campanha da Papelito (ex.: o slogan deles pra aquela
página). Só os fatos/números são da empresa, e o texto deixa isso explícito
("a empresa afirma/diz").

`C.parceriaStat` (novo, em `conteudo.js`) guarda só os dois números —
`arvoresPlantadas` e `arvoresMeta` — pra a Papelito atualizar sem mexer em
mais nada; a barra de progresso e o número formatado são calculados em
`app.js` a partir deles.

Nenhum texto anterior do app foi retirado. 73 verificações continuam
passando. `VERSAO` de v12 para v13.

---

### Identidade visual do app inteira revista, não só a seção nova

Depois de v13, a coordenação avisou que a "identidade do site" não tinha
mudado de verdade — só uma seção nova tinha entrado, o resto do app
continuava com a cara antiga. Pedido explícito: efeito tipo "rolagem estilo
Apple", mais elementos da marca espalhados pelo app inteiro, usando o site
oficial da Papelito como referência de forma mais agressiva.

Fui direto no material de marca oficial (`assets/manual/pages/grid3.jpg`,
`grid6.jpg` — páginas extraídas do guia de marca) atrás de um recurso
gráfico de verdade, em vez de inventar um motivo qualquer. Achei dois: bloco
de cor cheia com um leve gradiente diagonal (não é cor chapada pura), e uma
letra gigante recortada da fonte de título usada como textura de fundo num
bloco de cor (visto num slide do próprio guia, "solta o 'P', brasil!"). Os
dois viraram a base desta mudança:

1. **Gradiente em vez de cor chapada.** Função nova `gradCor(hex)` em
   `app.js` (com `escurece(hex,pct)` de apoio) recebe a cor já cadastrada em
   `conteudo.js` (ex.: a cor de cada material) e gera automaticamente um
   `linear-gradient` de dois tons — sem precisar cadastrar uma segunda cor
   em lugar nenhum. Aplicado nos blocos de cor cheia que já existiam:
   `.modulo` (os três módulos da tela inicial), `.faixa` (cabeçalho da ficha
   de material e de risco), `.abertura` (agora um "herói" escuro cheio,
   texto grande, no lugar do bloco simples de antes) e `.protecao` (bloco
   de EPI da tela de riscos), além de `.faixa-parceria`, `.parceria-stat` e
   `.parceria-energia`, que ainda estavam com cor chapada da v13.
2. **Letra-marca-d'água.** Classe nova `.marca-agua`: usa a própria fonte
   Beastly (já carregada, nenhuma imagem nova) numa letra enorme, quase
   transparente, encostada na borda do bloco, absoluta e recortada pelo
   `overflow:hidden` do bloco-pai. Colocada num "R" (de ReciclaLito) na
   abertura, no primeiro módulo, no bloco de EPI e no bloco de estatística
   de árvores, e num "P" (de Papelito) nos dois blocos da seção "Sobre a
   parceria" que falam da marca. Todo bloco que ganhou isso já precisou (ou
   já tinha) `position:relative; overflow:hidden; isolation:isolate`, com
   `z-index:1` no texto de verdade por cima — sem isso a letra ficaria por
   cima do texto em vez de atrás.
3. **Rolagem mais forte.** `.reveal` (efeito de "aparecer ao descer a
   tela", já existente) ganhou mais distância (16px → 28px), um leve
   `scale(.96)→1` e uma curva de easing com leve "estouro" no final
   (`cubic-bezier(.16,.8,.3,1)`), pra ficar mais parecido com o tipo de
   revelação usado em página de produto estilo Apple. Continua
   JavaScript-livre no sentido que importa: nenhum listener de scroll
   contínuo foi adicionado — a rolagem em si não roda nenhum código, só o
   `IntersectionObserver` que já existia decide quando ligar a classe
   `.mostrar`. Decisão deliberada: JS de parallax ligado a scroll é
   exatamente o tipo de coisa que pesa em celular básico com sinal fraco
   (o público declarado no topo deste arquivo e no `CLAUDE.md`), então não
   entrou, mesmo sendo um efeito comum em site "estilo Apple".
4. Duas telas que ainda não tinham `.reveal` ganharam (`.leitura` da
   trilha e `.pergunta` da verificação), pra cascata de entrada ficar
   consistente em todo o app, não só nas telas que já tinham isso.

Nenhum texto do app mudou de sentido nesta passada — foi tratamento visual
em cima do que já existia. `@media (prefers-reduced-motion:reduce)` continua
desligando toda a animação, incluindo a nova, com `.reveal{opacity:1;
transform:none}` reforçado pra cobrir o `scale` novo. 73 verificações
continuam passando (nenhum teste depende de cor de fundo ou de transform
exatos). `VERSAO` de v13 para v14.

---

## Testes

73 verificações em cinco baterias, com Playwright. `cd testes && python3 rodar-tudo.py`

| Bateria | Cobre |
|---|---|
| `teste_1_navegacao.py` | Rotas, busca, embaralhamento do gabarito, comprovante, botão voltar. |
| `teste_2_recursos.py` | Busca na tela inicial, óleo fora do código, quanto rende, pontos, emergência. |
| `teste_3_offline.py` | Modo avião depois do primeiro acesso. |
| `teste_4_subpasta.py` | Deploy em subpasta, como no GitHub Pages. |
| `teste_5_atualizacao.py` | Se editar o conteúdo chega no celular, com e sem trocar a `VERSAO`. |

Duas vezes um teste falhou e o errado era o teste, não o app: navegar para o mesmo
hash não redispara a renderização, e `inner_text` devolve o texto já com
`text-transform: uppercase` aplicado. Vale desconfiar das duas coisas antes de sair
mexendo no código.

---

## O que não foi feito, e por quê

**Leitura em voz alta.** O app é inteiramente texto e os ícones são decorativos.
Se parte do grupo tiver dificuldade de leitura, a premissa da ferramenta precisa ser
rediscutida. Ficou de fora por decisão da coordenação. O `ROTEIRO-REUNIAO.md` orienta
a observar isso durante o teste de campo.

**Cadastro e banco de usuários.** O projeto declara não coletar dado nenhum, o que
hoje o mantém fora das obrigações da LGPD. Os usuários são população em trabalho
majoritariamente informal. A necessidade real por trás do pedido — a cooperativa
saber quem fez o treinamento — dá para resolver com código de turma e envio
anônimo, sem contas nem senha.

**Reconhecimento de material por câmera.** Precisa de internet, o que mata o offline,
e errar numa bateria ou numa lâmpada é acidente, não inconveniente.

**Pontos, medalhas e ranking.** A barra de progresso basta. Gamificar treinamento de
trabalhador adulto tende a soar como deboche.

**Notificação push.** Pedir permissão de notificação num app de consulta gasta a
confiança que o "sem cadastro" comprou.

---

## Publicação

Repositório git inicializado e enviado para o GitHub (`yzkadu/ReciclaLito`), com
GitHub Pages ativado a partir da branch `main`, pasta raiz. Endereço:
`https://yzkadu.github.io/ReciclaLito/`. Conferido no ar logo após a ativação.

Escolhido GitHub Pages em vez de Vercel, conforme a ressalva do `README.md`: o
plano gratuito da Vercel (Hobby) proíbe uso comercial, e o app roda a operação da
Papelito.

---

## Pontos de entrega removidos

O app tinha uma seção "Onde entregar perto de você" (bloco `pontos` em
`conteudo.js`, função `blocoPontos` em `app.js`, mais o CSS `.pontos`/`.ponto`),
pensada para quem precisa achar um local físico para deixar um material — com
busca por endereço, horário, telefone e botão de mapa. Vinha com dois endereços de
exemplo marcados com tarja laranja, aguardando os pontos reais serem levantados.

Não existe essa rede de pontos. O fluxo real do projeto é a RCS reciclar tudo e
entregar direto aos catadores da ACOBRAZ — não uma rede pública de pontos de coleta
espalhados pela cidade. Manter a seção mantendo endereços inventados ficaria incoerente
com o funcionamento real, então a seção inteira foi removida em vez de preenchida:
bloco `pontos`, textos `pontosRotulo`/`pontosVazio`, função `blocoPontos` e o CSS
correspondente. O teste que cobria a seção (`teste_2_recursos.py`, item 4) também
foi removido. Documentação atualizada: `CLAUDE.md`, `README.md`, `LEIA-ME.md` e
`docs/ROTEIRO-REUNIAO.md` não mencionam mais o bloco `pontos`.

---

## Papelito mais presente + primeiros blocos de "na empresa" (v19)

Pedido: transformar o ReciclaLito no guia prático de sustentabilidade da Papelito,
sem virar site institucional nem perder a identidade do app. Fase 1, feita sem
inventar nenhum dado novo:

- Assinatura "uma iniciativa Papelito" no herói da tela inicial (`.assinatura-papelito`),
  além do selo que já existia no rodapé (`LOGO_PAPELITO`).
- Bloco novo "Na Papelito" (`campoPapelito()` em `app.js`, campo `naPapelito` em
  `conteudo.js`, classe `.bloco.na-papelito` + selo `.selo-papelito`): aparece na
  ficha de um material ou risco só quando existe uma prática específica da empresa
  para aquele item. Só renderiza se o campo existir — nunca mostra bloco vazio.
- `pontosInternos` (novo, em `conteudo.js`): um único ponto de descarte dentro da
  empresa — sala do Financeiro, para pilha, bateria e eletrônico pequeno — recolhido
  pela ACOBRAZ. Confirmado com a coordenação antes de adicionar (ver nota em
  `CLAUDE.md`: isto **não** é a mesma coisa que a antiga seção "pontos de entrega"
  pública que foi removida — aqui é um ponto interno só, não uma rede pública).
  Usado agora nos itens "Eletrônicos" (`materiais`) e "Pilhas e baterias" (`riscos`).
- Etapa "Pilhas, lâmpadas e óleo" da trilha (`t7`) ganhou uma frase sobre esse ponto
  interno.
- Estruturas criadas em `conteudo.js`, mas **sem conteúdo e sem renderização** — só
  a arquitetura, esperando dado aprovado pela Papelito (ver Pendências):
  - `certificacoes` (vazio) — para a seção de certificações/selos pedida, começando
    pela FSC. Nada foi inventado (número, escopo, data, status): a lista fica vazia
    até a Papelito aprovar o texto.
  - `parcerias` — já tem a Poiato Recicla cadastrada com `pendente:true` e
    `descricao:null`, esperando a descrição aprovada da parceria.
  - `bitucas` — confirmado que existe programa de coleta de bituca com a Poiato
    Recicla, mas sem os dados operacionais ainda (onde ficam os coletores, o que
    pode/não pode descartar, o que acontece depois). `pendente:true`. Enquanto isso,
    o item "Bituca de cigarro" na busca continua respondendo "vai no lixo comum",
    que é a orientação geral válida até a ficha específica da Papelito entrar no ar.

O restante do pedido (redesenho visual completo da home, trilha de integração
reestruturada, tira de certificações, "Na prática", etc.) fica para as próximas
fases, á medida que o conteúdo aprovado for chegando — ver Pendências.

`sw.js`: `VERSAO` de `v18` para `v19`. Nenhum arquivo novo em `ARQUIVOS` (não houve
imagem nova nesta fase).

---

## Pendências

- [ ] Revisão do bloco `emergencia` por profissional de saúde. **Bloqueia divulgação.**
- [ ] Validar conteúdo e vocabulário com os catadores. Usar `docs/ROTEIRO-REUNIAO.md`.
- [ ] Conferir a lista `itens` com a cooperativa, começando por isopor, canudo, papel
      alumínio e longa vida.
- [ ] Testar em Android simples de verdade, incluindo modo avião pelo ícone instalado.
- [ ] Passar o repositório para a Papelito.
- [ ] Conteúdo aprovado da certificação FSC (escopo, número de licença, data, status)
      para preencher `certificacoes` em `conteudo.js`.
- [ ] Descrição aprovada da parceria Poiato Recicla, para preencher `parcerias`.
- [ ] Dados operacionais da coleta de bituca (local dos coletores, o que pode/não pode
      descartar, o que acontece depois da coleta), para preencher `bitucas` e tirar
      `pendente:true`.
