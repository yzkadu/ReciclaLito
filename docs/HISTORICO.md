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

## Pendências

- [ ] Revisão do bloco `emergencia` por profissional de saúde. **Bloqueia divulgação.**
- [ ] Apagar os dois pontos de exemplo. **Bloqueia divulgação.**
- [ ] Validar conteúdo e vocabulário com os catadores. Usar `docs/ROTEIRO-REUNIAO.md`.
- [ ] Conferir a lista `itens` com a cooperativa, começando por isopor, canudo, papel
      alumínio e longa vida.
- [ ] Levantar os pontos de entrega reais do DF.
- [ ] Testar em Android simples de verdade, incluindo modo avião pelo ícone instalado.
- [ ] Passar o repositório para a Papelito.
