# Roteiro da reunião de diagnóstico

Para validar o conteúdo do ReciclaLito com os catadores antes de entregar.
Não faz parte do aplicativo — é material de campo.

**Duração:** de 45 a 60 minutos.
**Leve:** dois ou três celulares com o app já instalado e testado, e papel para anotar.
**Não leve:** slides.

---

## A regra que vale para a reunião inteira

Você não está apresentando o app. Está descobrindo onde ele está errado.

Se a reunião terminar com todo mundo elogiando, ela falhou. O objetivo é sair de lá
com uma lista de correções. Diga isso na abertura, com essas palavras: *"esse app foi
escrito por gente que não faz esse trabalho. Vim aqui achar o que está errado nele."*

Três hábitos que mudam o resultado:

- **Pergunte sobre o que já aconteceu, não sobre o que a pessoa acha.** "O que você
  faz quando acha uma lâmpada?" traz a prática. "Você acha que este texto está bom?"
  traz educação.
- **Deixe o silêncio.** Depois da pergunta, conte até cinco antes de completar a
  frase. A primeira resposta costuma ser a educada; a segunda é a verdadeira.
- **Não defenda o app.** Quando alguém disser que algo está errado, a resposta é
  "como é que é, então?" e anotar. Nunca "é que a ideia era...".

---

## 1. Abertura (5 min)

Apresente o projeto em duas frases. Diga que o app não coleta nenhum dado, não pede
cadastro e que o progresso fica só no aparelho da pessoa.

Peça autorização para anotar. Se for gravar, peça autorização à parte e aceite não.

---

## 2. Como o trabalho acontece hoje (10 min)

Antes de mostrar qualquer tela. Isso evita que as respostas sejam moldadas pelo app.

- Me conta o dia de ontem, do começo ao fim.
- Quando aparece um material que você não sabe se dá para vender, o que você faz?
- A quem você pergunta? Quanto tempo demora para ter a resposta?
- Qual material dá mais dor de cabeça na triagem?
- Já teve caso de um lote inteiro ser recusado? Por quê?

**O que você quer descobrir:** se a dúvida sobre material é um problema real e com que
frequência aparece. Se ninguém tiver dúvida nunca, o módulo 1 não é o que eles precisam
— e é melhor saber agora.

---

## 3. Celular e conexão (5 min)

- Qual celular você usa? Ele costuma ficar sem espaço?
- Tem internet no galpão? E na rua?
- Você usa o celular durante o trabalho ou só na pausa?
- Usa de luva ou tira a luva?

**O que você quer descobrir:** se a decisão de funcionar sem internet acertou o
problema certo, e se os alvos de toque estão do tamanho que precisam estar.

---

## 4. Teste com o app na mão (20 min) — a parte mais importante

Entregue o celular e **fique calado**. Não explique nada, não aponte, não diga
"agora aperta aqui". Se a pessoa travar, anote onde travou. É esse o dado.

Dê tarefas, não perguntas:

1. "Achei um isopor. Descobre aí o que eu faço com ele."
2. "Quebrou uma lâmpada aqui no chão. E agora?"
3. "Quanto rende o alumínio, comparado com o papelão?"
4. "Onde é que entrega bateria de celular?"

Para cada tarefa anote: **conseguiu? em quanto tempo? por onde tentou primeiro?**

Depois das tarefas:

- Teve alguma palavra aqui que você não usa? Como é que vocês chamam?
- Tem coisa escrita aqui que está errada?
- O que falta?

**Atenção especial ao vocabulário.** Os textos foram escritos com termos técnicos —
"logística reversa", "rejeito", "triagem". Se a equipe usa outra palavra, a palavra
deles ganha. Anote a lista de trocas.

---

## 5. Conferir a lista da busca (10 min)

Leia em voz alta e pergunte "essa cooperativa recebe?". São os quatro itens que mais
variam de lugar para lugar:

- **Isopor** — recebe ou não?
- **Canudo, tampinha e peça pequena de plástico** — compensa ou atrapalha?
- **Papel alumínio e marmitex** — vai junto com a latinha?
- **Caixa de leite (longa vida)** — vai com o papel ou é separado?

Depois, a pergunta aberta que costuma render mais que a lista:

> **"O que mais chega aqui que não está nessa lista?"**

Anote tudo. É o que vai virar item novo.

---

## 6. Segurança e primeiros socorros (10 min)

Não pergunte "você já se machucou?" na frente do grupo. Constrange e a resposta vem
falsa. Pergunte pelo galpão:

- Que tipo de acidente acontece aqui?
- Quando acontece, o que se faz?
- Tem posto de saúde perto? Tem material de curativo aqui?
- Quem é avisado?

Mostre a tela "Deu errado. E agora?" e pergunte se falta alguma situação.

**Depois da reunião, leve o texto para a enfermagem do posto.** Este é o único
conteúdo do app em que um erro machuca alguém.

---

## 7. Fechamento (5 min)

- Se esse app existisse do jeito certo, ele te ajudaria em quê?
- Tem alguma coisa que a gente devia tirar dele?
- Quem daqui toparia testar de novo daqui a duas semanas?

Combine a devolutiva: diga quando volta e volte. Reunião de diagnóstico que não tem
retorno queima a confiança para o projeto inteiro, não só para o app.

---

## Depois da reunião

- [ ] Passar a limpo as anotações no mesmo dia, enquanto está fresco.
- [ ] Trocar o vocabulário no `conteudo.js` pelas palavras que eles usam.
- [ ] Acrescentar os itens novos ao bloco `itens`.
- [ ] Corrigir o que a lista de busca errou sobre a cooperativa.
- [ ] Levar o bloco `emergencia` para revisão da saúde.
- [ ] Trocar a `VERSAO` no `sw.js` e publicar.
- [ ] Marcar a segunda rodada de teste.

---

## Um sinal de alerta para observar

Durante o teste com o celular na mão, repare se alguém pede para outra pessoa ler a
tela, demora muito num texto curto ou devolve o aparelho rápido demais dizendo que
"depois vê".

O ReciclaLito é inteiramente texto — os ícones são decorativos e não carregam
significado sozinhos. Se essa dificuldade aparecer em parte do grupo, não é um
detalhe de acessibilidade: é a premissa da ferramenta que precisa ser rediscutida.
Anote e leve para a orientação antes de escrever mais conteúdo.
