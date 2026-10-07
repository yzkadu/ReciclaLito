/* ============================================================
   ReciclaLito — CONTEÚDO
   ------------------------------------------------------------
   Este é o único arquivo que você precisa editar para mudar
   textos, materiais, riscos ou a trilha. Não mexa em app.js.

   Regras simples:
   - Todo texto fica entre aspas.
   - Cada item termina com vírgula.
   - Para adicionar um material, copie um bloco inteiro
     { ... } e cole logo abaixo, mudando o conteúdo.
   ============================================================ */

const CONTEUDO = {

  /* ----------------------------------------------------------
     MÓDULO 1 — ONDE DESCARTO?
     'cor' usa o código de cores da coleta seletiva (CONAMA 275).
     'texto' é a cor da letra: 'claro' ou 'escuro'.
     ---------------------------------------------------------- */
  materiais: [
    {
      id: 'papel',
      nome: 'Papel e papelão',
      cor: '#0B5FA5', texto: 'claro', simbolo: 'papel',
      separar: 'Guarde seco e limpo. Desmonte as caixas para ocupar menos espaço. Tire fitas adesivas e grampos grandes.',
      entregar: 'Vai na coleta seletiva comum. Papelão limpo tem bom preço na cooperativa.',
      valor: 'baixo',
      rende: 'Preço baixo por quilo, mas é o material que mais aparece. O ganho vem do volume e de manter tudo seco.',
      atencao: 'Não serve se estiver molhado ou engordurado. Papel higiênico, guardanapo sujo, papel plastificado e fotografia não são recicláveis.'
    },
    {
      id: 'plastico',
      nome: 'Plástico',
      cor: '#C8332B', texto: 'claro', simbolo: 'plastico',
      separar: 'Enxágue por dentro para tirar restos de comida. Amasse garrafas e feche com a tampa para ocupar menos espaço.',
      entregar: 'Coleta seletiva comum. Garrafa PET e embalagem de produto de limpeza têm boa saída.',
      valor: 'medio',
      rende: 'PET e embalagem de limpeza têm saída certa. Lavado e amassado cabe mais no fardo e rende mais por viagem.',
      atencao: 'Embalagem engordurada sem lavar contamina o lote inteiro. Fralda, absorvente e embalagem de comida com resto não entram.'
    },
    {
      id: 'vidro',
      nome: 'Vidro',
      cor: '#1F7A44', texto: 'claro', simbolo: 'vidro',
      separar: 'Mantenha inteiro sempre que der. Enxágue potes e garrafas.',
      entregar: 'Coleta seletiva comum, separado dos demais materiais.',
      valor: 'baixo',
      rende: 'Preço baixo e peso alto. Compensa quando já vai separado por cor e sem quebrar.',
      atencao: 'Caco corta luva fina. Embrulhe em papelão grosso e escreva "vidro" por fora. Espelho, lâmpada, cerâmica e vidro de box não são reciclados junto.'
    },
    {
      id: 'metal',
      nome: 'Metal',
      cor: '#E0A711', texto: 'escuro', simbolo: 'metal',
      separar: 'Enxágue latas de alimento. Guarde as tampas junto. Amasse latinhas de bebida.',
      entregar: 'Coleta seletiva comum. Alumínio é o material de maior valor por quilo.',
      valor: 'alto',
      rende: 'É o que mais rende por quilo no galpão. Latinha limpa e amassada dá o melhor retorno do dia.',
      atencao: 'A borda da lata aberta corta fácil. Dobre a tampa para dentro antes de guardar.'
    },
    {
      id: 'eletronico',
      nome: 'Eletrônicos',
      cor: '#B34A08', texto: 'claro', simbolo: 'eletronico',
      separar: 'Separe do resto. Não abra nem quebre o aparelho. Tire a bateria se sair com a mão, sem forçar.',
      entregar: 'Ponto de logística reversa: loja de eletrônicos, fabricante ou ponto autorizado pela prefeitura.',
      valor: 'medio',
      rende: 'Depende muito da peça. O valor está no cobre e nas placas, não no plástico da carcaça.',
      atencao: 'Contém chumbo, mercúrio e cádmio. Nunca vai no lixo comum e nunca é queimado. Veja o módulo Segurança antes de manusear.'
    },
    {
      id: 'oleo',
      nome: 'Óleo de cozinha',
      cor: '#F2EFE6', texto: 'escuro', simbolo: 'oleo', foraDoCodigo: true,
      separar: 'Espere esfriar. Coe e guarde numa garrafa PET bem fechada.',
      entregar: 'Ponto de coleta de óleo. Muitos supermercados e postos recebem.',
      valor: 'baixo',
      rende: 'Rende pouco por litro, mas quase ninguém entrega. Alguns pontos trocam óleo usado por sabão — pergunte no ponto da sua região.',
      atencao: 'Um litro na pia contamina milhares de litros de água e entope a tubulação. Nunca jogue na pia nem no ralo.'
    },
    {
      id: 'organico',
      nome: 'Orgânico',
      cor: '#6F4518', texto: 'claro', simbolo: 'organico',
      separar: 'Guarde à parte, num recipiente próprio, nunca dentro do mesmo saco do reciclável. Casca, resto de comida, borra de café e poda de quintal entram aqui.',
      entregar: 'Se houver coleta ou composteira na região, vai para lá. Sem isso, é lixo comum — não entra na coleta seletiva nem passa pela cooperativa.',
      valor: 'sem venda',
      rende: 'Não tem venda: a cooperativa não compra orgânico. O ganho de separar bem está em outro lugar — é o que evita perder o papel e o papelão do dia.',
      atencao: 'Contamina qualquer reciclável que encostar nele: um saco com resto de comida molha e engorda papel, papelão e tudo mais junto, e o lote inteiro vira rejeito. Separe assim que perceber que é orgânico.'
    }
  ],

  /* ----------------------------------------------------------
     BUSCA — ITENS DO DIA A DIA
     Esta lista alimenta o campo "Buscar" do módulo 1. Serve para
     quem está com o objeto na mão e não sabe em qual dos sete
     materiais ele entra.

     Cada item tem:
       nome     — como aparece na lista
       busca    — outros jeitos de escrever o mesmo (separados por
                  espaço). A busca ignora acento e maiúscula.
       vai      — para qual ficha o item leva:
                  { modulo: 'materiais', id: 'papel' } ou
                  { modulo: 'riscos', id: 'baterias' }
       resposta — use no lugar de 'vai' quando o item NÃO tem ficha
                  (rejeito, orgânico, farmácia). Texto curto.
       destino  — rótulo curto que aparece do lado do nome.
                  Só é obrigatório quando você usa 'resposta'.
       nota     — observação opcional, aparece em cinza.

     ATENÇÃO: esta lista é um ponto de partida técnico. Confira
     com os catadores e com a cooperativa da região antes de
     entregar. O que uma cooperativa aceita a outra pode recusar.
     ---------------------------------------------------------- */
  itens: [
    /* ---- papel ---- */
    { nome: 'Caixa de papelão', busca: 'caixa papelao caixote', vai: { modulo: 'materiais', id: 'papel' } },
    { nome: 'Jornal e revista', busca: 'jornal revista folheto', vai: { modulo: 'materiais', id: 'papel' } },
    { nome: 'Caderno e folha de papel', busca: 'caderno folha sulfite impressao rascunho', vai: { modulo: 'materiais', id: 'papel' } },
    { nome: 'Caixa de leite ou suco', busca: 'longa vida tetra pak leite suco caixinha', vai: { modulo: 'materiais', id: 'papel' },
      nota: 'Enxágue e amasse. Vai na seletiva, mas confirme se a cooperativa separa longa vida.' },
    { nome: 'Caixa de pizza engordurada', busca: 'pizza engordurada gordura', resposta: 'A parte suja de gordura é rejeito. Se a tampa estiver limpa, rasgue e mande só ela para o papel.', destino: 'Rejeito' },
    { nome: 'Papel higiênico e guardanapo usado', busca: 'papel higienico guardanapo lenco', resposta: 'Vai no lixo comum. Papel sujo com resto orgânico não é reciclável.', destino: 'Rejeito' },
    { nome: 'Fotografia e papel plastificado', busca: 'foto fotografia plastificado adesivo etiqueta', resposta: 'Vai no lixo comum. A camada plástica impede a reciclagem do papel.', destino: 'Rejeito' },

    /* ---- plástico ---- */
    { nome: 'Garrafa PET', busca: 'garrafa pet refrigerante agua', vai: { modulo: 'materiais', id: 'plastico' } },
    { nome: 'Sacola e saco plástico', busca: 'sacola saco plastico embalagem', vai: { modulo: 'materiais', id: 'plastico' },
      nota: 'Só se estiver limpa e seca.' },
    { nome: 'Embalagem de produto de limpeza', busca: 'detergente amaciante desinfetante limpeza galao', vai: { modulo: 'materiais', id: 'plastico' } },
    { nome: 'Pote de margarina e sorvete', busca: 'pote margarina sorvete potinho vasilha', vai: { modulo: 'materiais', id: 'plastico' } },
    { nome: 'Tampa de garrafa', busca: 'tampa tampinha rosca', vai: { modulo: 'materiais', id: 'plastico' },
      nota: 'Feche a garrafa com a tampa. Solta, a peça pequena se perde na esteira.' },
    { nome: 'Canudo e talher descartável', busca: 'canudo talher garfo colher descartavel copo', vai: { modulo: 'materiais', id: 'plastico' },
      nota: 'Peça pequena e leve. Muitas cooperativas não compensam. Pergunte antes.' },
    { nome: 'Isopor', busca: 'isopor poliestireno bandeja', resposta: 'Depende da cooperativa. É reciclável, mas ocupa muito espaço e vale pouco, então nem toda cooperativa recebe. Pergunte antes de juntar volume.', destino: 'Depende' },

    /* ---- vidro ---- */
    { nome: 'Garrafa e pote de vidro', busca: 'garrafa vidro pote conserva cerveja', vai: { modulo: 'materiais', id: 'vidro' } },
    { nome: 'Caco de vidro', busca: 'caco quebrado estilhaco', vai: { modulo: 'materiais', id: 'vidro' },
      nota: 'Embrulhe em papelão grosso e escreva "vidro" por fora.' },
    { nome: 'Espelho, louça e cerâmica', busca: 'espelho louca ceramica prato xicara azulejo vaso', resposta: 'Não vai junto com o vidro. Derrete em temperatura diferente e estraga o lote inteiro. Embrulhe e mande para o lixo comum.', destino: 'Rejeito' },
    { nome: 'Vidro de janela e de box', busca: 'janela box temperado vidraca para brisa', resposta: 'Vidro temperado e laminado não entra na reciclagem comum. Procure uma vidraçaria ou o ponto de entrega da prefeitura.', destino: 'Ponto específico' },

    /* ---- metal ---- */
    { nome: 'Latinha de bebida', busca: 'latinha lata aluminio cerveja refrigerante', vai: { modulo: 'materiais', id: 'metal' } },
    { nome: 'Lata de alimento', busca: 'lata milho sardinha conserva leite po', vai: { modulo: 'materiais', id: 'metal' } },
    { nome: 'Papel alumínio e marmitex', busca: 'papel aluminio marmitex bandeja aluminio', vai: { modulo: 'materiais', id: 'metal' },
      nota: 'Só limpo. Amasse numa bola para não se perder na triagem.' },
    { nome: 'Arame, prego e ferro velho', busca: 'arame prego parafuso ferro sucata metal', vai: { modulo: 'materiais', id: 'metal' } },
    { nome: 'Panela e frigideira', busca: 'panela frigideira caçarola tacho', vai: { modulo: 'materiais', id: 'metal' },
      nota: 'Vai para o ferro-velho, não para a coleta seletiva comum.' },

    /* ---- eletrônicos ---- */
    { nome: 'Celular e tablet', busca: 'celular smartphone tablet aparelho', vai: { modulo: 'materiais', id: 'eletronico' } },
    { nome: 'Computador e notebook', busca: 'computador notebook cpu gabinete laptop', vai: { modulo: 'materiais', id: 'eletronico' } },
    { nome: 'Fone de ouvido e caixa de som', busca: 'fone ouvido headphone caixa som radio', vai: { modulo: 'materiais', id: 'eletronico' } },
    { nome: 'Controle remoto', busca: 'controle remoto', vai: { modulo: 'materiais', id: 'eletronico' },
      nota: 'Tire as pilhas antes e entregue separado.' },
    { nome: 'Cabo, fio e carregador', busca: 'cabo fio carregador extensao cobre usb', vai: { modulo: 'riscos', id: 'cabos' } },
    { nome: 'Placa de circuito', busca: 'placa circuito mae placa-mae eletronica', vai: { modulo: 'riscos', id: 'placas' } },
    { nome: 'Monitor e televisão', busca: 'monitor tv televisao tela lcd tubo', vai: { modulo: 'riscos', id: 'telas' } },
    { nome: 'Cartucho e toner', busca: 'cartucho toner tinta impressora', vai: { modulo: 'riscos', id: 'toner' } },

    /* ---- perigosos ---- */
    { nome: 'Pilha e bateria', busca: 'pilha bateria celular carro botao', vai: { modulo: 'riscos', id: 'baterias' } },
    { nome: 'Lâmpada', busca: 'lampada fluorescente led tubular vapor', vai: { modulo: 'riscos', id: 'lampadas' } },
    { nome: 'Óleo de cozinha usado', busca: 'oleo cozinha fritura gordura', vai: { modulo: 'materiais', id: 'oleo' } },
    { nome: 'Remédio vencido', busca: 'remedio medicamento vencido comprimido farmacia', resposta: 'Leve à farmácia. A maioria tem caixa de devolução. Nunca jogue no lixo comum nem no vaso sanitário.', destino: 'Farmácia' },
    { nome: 'Seringa e agulha', busca: 'seringa agulha perfurocortante insulina', resposta: 'Guarde numa garrafa PET rígida bem fechada e leve a um posto de saúde. Nunca solta no saco de lixo.', destino: 'Posto de saúde' },
    { nome: 'Tinta, solvente e veneno', busca: 'tinta solvente thinner veneno pesticida quimico', resposta: 'Resíduo perigoso. Não misture com nada e procure o ponto de entrega da prefeitura ou a loja onde comprou.', destino: 'Ponto específico' },
    { nome: 'Pneu', busca: 'pneu borracha camara', resposta: 'Logística reversa. Borracharias e revendedoras são obrigadas a receber pneu usado de volta.', destino: 'Logística reversa' },

    /* ---- não recicláveis e orgânicos ---- */
    { nome: 'Fralda e absorvente', busca: 'fralda absorvente descartavel', resposta: 'Vai no lixo comum. Não é reciclável e contamina o material que estiver junto.', destino: 'Rejeito' },
    { nome: 'Bituca de cigarro', busca: 'bituca cigarro guimba filtro', vai: { modulo: 'materiais', id: 'bitucas' } },
    { nome: 'Esponja e escova de dente', busca: 'esponja bucha escova dente', resposta: 'Vai no lixo comum. Material misturado, sem separação possível.', destino: 'Rejeito' },
    { nome: 'Resto de comida e casca', busca: 'comida resto casca fruta legume borra cafe organico', vai: { modulo: 'materiais', id: 'organico' } },
    { nome: 'Poda de quintal e folha seca', busca: 'poda galho folha grama jardim quintal', vai: { modulo: 'materiais', id: 'organico' } },
    { nome: 'Roupa e calçado velho', busca: 'roupa calcado sapato tecido pano', resposta: 'Não entra na coleta seletiva. Se estiver em bom estado, doe. Se estiver rasgado, procure um ponto de coleta de tecido.', destino: 'Doação' }
  ],

  /* ----------------------------------------------------------
     MÓDULO 2 — SEGURANÇA DO CATADOR
     ---------------------------------------------------------- */
  riscos: [
    {
      id: 'baterias',
      nome: 'Pilhas e baterias',
      oQueTem: 'Chumbo, cádmio, mercúrio e lítio.',
      manusear: 'Use luva resistente a corte. Não perfure, não amasse e não queime. Guarde separado dos outros materiais, num recipiente que não seja de metal.',
      alerta: 'Bateria inchada, quente ou vazando pode pegar fogo. Isole longe de papel e plástico, proteja os polos com fita e avise o responsável.',
      entregar: 'Ponto de logística reversa. Fabricantes e importadores são obrigados a receber de volta.'
    },
    {
      id: 'lampadas',
      nome: 'Lâmpadas fluorescentes',
      oQueTem: 'Vapor de mercúrio dentro do tubo.',
      manusear: 'Transporte inteira e embalada, de pé. Nunca junte no saco com outros materiais que possam quebrá-la.',
      alerta: 'Se quebrar: saia do lugar e deixe arejar por uns 15 minutos. Não varra e não aspire, porque isso espalha o pó. Recolha com papelão rígido usando luva, feche num saco e leve ao ponto de coleta.',
      entregar: 'Ponto de logística reversa de lâmpadas.'
    },
    {
      id: 'cabos',
      nome: 'Cabos e fios',
      oQueTem: 'Cobre por dentro, plástico e retardante de chama por fora.',
      manusear: 'Descasque com alicate ou descascador. É mais seguro e o cobre limpo vale mais.',
      alerta: 'Nunca queime fio para tirar o cobre. A fumaça solta dioxina, que causa dano ao pulmão e é cancerígena. O cobre queimado ainda perde valor na venda.',
      entregar: 'Cobre limpo vai direto para o ferro-velho ou a cooperativa.'
    },
    {
      id: 'placas',
      nome: 'Placas de circuito',
      oQueTem: 'Chumbo na solda, além de bordas e pinos cortantes.',
      manusear: 'Use luva e manuseie pelas laterais. Guarde em caixa, não solto no saco.',
      alerta: 'Não leve a mão à boca enquanto estiver manuseando. Lave bem as mãos antes de comer, beber ou fumar.',
      entregar: 'Ponto de logística reversa de eletrônicos ou empresa de reciclagem especializada.'
    },
    {
      id: 'telas',
      nome: 'Telas e monitores',
      oQueTem: 'Chumbo no vidro dos monitores antigos e mercúrio nas lâmpadas de telas de LCD mais velhas.',
      manusear: 'Carregue com as duas mãos, apoiando pela base. Não empilhe.',
      alerta: 'Monitor antigo de tubo pode estourar para dentro se quebrar e jogar caco a distância. Não tente abrir.',
      entregar: 'Ponto de logística reversa de eletrônicos.'
    },
    {
      id: 'toner',
      nome: 'Cartuchos e toner',
      oQueTem: 'Pó muito fino que fica suspenso no ar.',
      manusear: 'Mantenha fechado. Use máscara PFF2 se precisar mexer.',
      alerta: 'Não sopre para limpar. O pó vai direto para o pulmão e é difícil de tirar da roupa.',
      entregar: 'Muitas lojas de informática recebem cartucho vazio de volta.'
    }
  ],

  /* ----------------------------------------------------------
     DEU ERRADO — PRIMEIROS SOCORROS
     Aparece como um botão vermelho no fim do módulo 2.

     ATENÇÃO: este bloco foi escrito a partir de orientação geral
     de primeiros socorros. ANTES DE ENTREGAR, peça para alguém da
     área da saúde revisar — de preferência a enfermagem do posto
     que atende a cooperativa. Não publique sem essa revisão.

     'agora'  — o que fazer no minuto seguinte
     'procure' — quando parar e ir atrás de atendimento
     'nunca'  — o erro comum que piora a situação
     ---------------------------------------------------------- */
  emergencia: [
    {
      id: 'corte',
      nome: 'Corte com vidro, lata ou placa',
      agora: 'Lave o corte em água corrente com sabão. Pressione com um pano limpo até parar de sangrar. Cubra com curativo.',
      procure: 'Procure atendimento se o corte for fundo, se não parar de sangrar em uns 10 minutos, se o material estava enferrujado ou sujo, ou se a vacina antitetânica não estiver em dia.',
      nunca: 'Não use pó de café, borra, terra nem pano sujo para estancar.'
    },
    {
      id: 'agulha',
      nome: 'Espetou agulha ou seringa achada no lixo',
      agora: 'Lave com água corrente e sabão. Deixe sangrar sozinho, sem espremer e sem apertar em volta.',
      procure: 'Vá a um serviço de saúde no MESMO DIA. Existe remédio preventivo, mas ele só funciona se começar nas primeiras horas. Se der, leve o material dentro de garrafa fechada.',
      nunca: 'Não passe álcool nem água sanitária dentro do furo. E não espere para ver no que dá.'
    },
    {
      id: 'bateria',
      nome: 'Bateria esquentando, inchada ou vazando',
      agora: 'Não pegue com a mão nua. Afaste papel, plástico e pano de perto. Se der para mover com segurança, use luva e leve para um lugar aberto e arejado, longe das pessoas. Avise o responsável.',
      procure: 'Se o líquido encostar na pele ou no olho, lave em água corrente por 15 minutos e procure atendimento. Se pegar fogo, afaste todo mundo e chame os bombeiros no 193.',
      nunca: 'Não fure, não amasse e não jogue água em bateria de lítio pegando fogo.'
    },
    {
      id: 'olho',
      nome: 'Poeira ou produto químico no olho',
      agora: 'Lave em água corrente por 15 minutos, mantendo o olho aberto. Incline a cabeça para o lado do olho atingido, para a água não escorrer para o outro.',
      procure: 'Procure atendimento se continuar ardendo depois da lavagem, se a vista embaçar ou se foi produto químico.',
      nunca: 'Não esfregue. Não pingue colírio nem qualquer outra coisa por conta própria.'
    },
    {
      id: 'toner',
      nome: 'Respirou pó de toner',
      agora: 'Saia do lugar e respire ar limpo. Lave o rosto e as mãos com água fria. Água quente gruda o pó na pele.',
      procure: 'Procure atendimento se a tosse não passar ou se sentir falta de ar.',
      nunca: 'Não sopre e não sacuda a roupa perto das outras pessoas. Lave separado, em água fria.'
    },
    {
      id: 'lampada',
      nome: 'Quebrou lâmpada fluorescente',
      ver: { modulo: 'riscos', id: 'lampadas' },
      agora: 'Saia e deixe arejar uns 15 minutos antes de voltar. Recolha com papelão rígido e luva.',
      procure: 'Procure atendimento se sentir dor de cabeça, enjoo ou gosto de metal na boca depois.',
      nunca: 'Não varra e não aspire: isso levanta o pó de mercúrio e espalha pelo galpão.'
    }
  ],

  /* Equipamento de proteção — aparece no fim do módulo 2 */
  protecao: [
    'Luva resistente a corte, não a luva fina de látex',
    'Calçado fechado e calça comprida',
    'Máscara PFF2 quando houver poeira',
    'Óculos de proteção ao mexer com vidro ou placas',
    'Lave as mãos antes de comer, beber ou fumar',
    'Não coma no lugar onde faz a triagem'
  ],

  /* ----------------------------------------------------------
     MÓDULO 3 — INTEGRAÇÃO DA EQUIPE
     Trilha para quem está começando. Cada etapa aponta para
     um conteúdo que já existe nos módulos 1 e 2.

     Para acrescentar uma etapa, copie um bloco { id, titulo, texto }
     inteiro, cole antes da etapa "Verificação final" e mude o
     conteúdo. O 'id' precisa ser diferente dos que já existem.
     'ver' é opcional: aponta para a ficha de um material ou risco
     (mesmo formato usado em 'itens'). A quantidade de etapas é
     livre — o app conta sozinho, não precisa mexer em mais nada.

     Depois de acrescentar uma etapa, considere acrescentar também
     uma pergunta correspondente em 'perguntas' logo abaixo, para
     que a verificação final cubra o assunto novo.
     ---------------------------------------------------------- */
  trilha: [
  {
    "id": "t1",
    "titulo": "Seu papel na cadeia da reciclagem",
    "resumo": "Entenda quem recebe o material depois de você.",
    "imagem": "papel",
    "texto": "A separação começa em quem gera o resíduo e continua com quem coleta, transporta e faz a triagem. Um material bem separado facilita o trabalho e ajuda a proteger as pessoas em cada etapa.",
    "passos": [
      "Observe o que você está descartando antes de escolher o recipiente.",
      "Separe os recicláveis de restos de alimentos e resíduos que exigem coleta própria.",
      "Pense em quem vai abrir o recipiente: ninguém deve encontrar cacos ou pontas escondidos."
    ],
    "exemplo": "Uma caixa limpa misturada com restos de comida pode perder a condição de reciclagem. Separar na origem evita esse problema.",
    "pratica": "Observe um descarte comum no seu setor e identifique quem recebe esse material na próxima etapa.",
    "ver": {
      "modulo": "materiais",
      "id": "papel"
    }
  },
  {
    "id": "t2",
    "titulo": "Leia a cor e a identificação",
    "resumo": "Reconheça os materiais e as exceções.",
    "imagem": "plastico",
    "texto": "As cores ajudam a reconhecer os recipientes: azul para papel, vermelho para plástico, verde para vidro, amarelo para metal, marrom para orgânico, laranja para resíduos perigosos e cinza para rejeitos. Confira também o rótulo e as orientações do ponto de coleta.",
    "passos": [
      "Identifique o material e consulte a aba Onde descarto? quando houver dúvida.",
      "Não escolha só pela aparência: espelho e lâmpada não entram junto com garrafas de vidro.",
      "Óleo de cozinha não tem cor própria nesse código. Use um ponto específico. Bitucas também têm coletores exclusivos na Papelito."
    ],
    "exemplo": "Uma embalagem com restos de alimento não está pronta só porque a lixeira tem a cor certa. Primeiro, confira como separar aquele material.",
    "pratica": "Encontre um recipiente identificado no seu setor e confira quais itens ele recebe.",
    "ver": {
      "modulo": "materiais",
      "id": "plastico"
    }
  },
  {
    "id": "t3",
    "titulo": "Papel e papelão bem separados",
    "resumo": "Mantenha o material seco e organize o volume.",
    "imagem": "papel",
    "texto": "Papel e papelão precisam chegar secos e separados de sujeira e gordura. Caixas desmontadas ocupam menos espaço e deixam a área de coleta mais organizada.",
    "passos": [
      "Esvazie as caixas e separe plásticos e outros materiais que vieram dentro.",
      "Desmonte sem se expor a grampos ou partes cortantes. Não compacte com os pés.",
      "Guarde em local seco e consulte a ficha antes de misturar papéis revestidos ou sujos."
    ],
    "exemplo": "Caixa de entrega limpa: papelão. Guardanapo usado e papel engordurado: não entram no mesmo recipiente.",
    "pratica": "Confira se o papelão do seu setor está seco, vazio e separado de outros resíduos.",
    "ver": {
      "modulo": "materiais",
      "id": "papel"
    }
  },
  {
    "id": "t4",
    "titulo": "Vidro e metal sem surpresas",
    "resumo": "Evite cortes em quem coleta e faz a triagem.",
    "imagem": "vidro",
    "texto": "Embalagens de vidro e metal podem ser recicláveis, mas bordas e partes quebradas exigem atenção. A forma de entregar importa tanto quanto escolher o destino.",
    "passos": [
      "Retire os restos de conteúdo e mantenha o vidro inteiro sempre que possível.",
      "Não deixe cacos ou tampas cortantes soltos em sacos. Confirme com a equipe a proteção e a identificação adequadas.",
      "Separe espelhos, cerâmicas e lâmpadas do vidro de embalagem. Consulte a ficha de cada item."
    ],
    "exemplo": "Uma garrafa e uma lâmpada são transparentes, mas têm destinos diferentes. Misturá-las cria risco para a triagem.",
    "pratica": "Confira se há vidro ou metal com pontas expostas e comunique à equipe antes do manuseio.",
    "ver": {
      "modulo": "materiais",
      "id": "vidro"
    }
  },
  {
    "id": "t5",
    "titulo": "Eletrônicos: entregar sem desmontar",
    "resumo": "Reconheça equipamentos que pedem coleta própria.",
    "imagem": "eletronico",
    "texto": "Aparelhos contêm diferentes componentes e materiais. Para descartar, mantenha o equipamento inteiro e consulte o destino adequado; não tente retirar peças para aproveitar o metal.",
    "passos": [
      "Separe o aparelho dos recicláveis comuns e mantenha-o desligado.",
      "Não abra, quebre ou force a retirada de baterias e componentes.",
      "Na Papelito, Financeiro e Marketing recebem pequenos eletrônicos. Para telas, itens grandes ou danificados, confirme a orientação antes de levar."
    ],
    "exemplo": "Um pequeno aparelho fora de uso pode seguir para um ponto interno após a conferência. Um monitor quebrado exige uma orientação específica.",
    "pratica": "Identifique um eletrônico sem uso e consulte a ficha para planejar a entrega.",
    "ver": {
      "modulo": "materiais",
      "id": "eletronico"
    }
  },
  {
    "id": "t6",
    "titulo": "Cabos e fios: nunca queimar",
    "resumo": "Encaminhe sem improvisar a separação.",
    "imagem": "cabos",
    "texto": "O metal dentro de fios e cabos tem valor, mas isso não justifica expor pessoas à fumaça ou a cortes. A equipe que faz a destinação precisa receber o material de forma organizada.",
    "passos": [
      "Separe apenas cabos fora de uso e desconectados. Não mexa em instalações elétricas.",
      "Não queime o revestimento nem improvise a retirada do metal.",
      "Agrupe os cabos sem deixar pontas expostas e confirme se o ponto de entrega recebe esse tipo de material."
    ],
    "exemplo": "Encontrou fios encapados? Guarde separados e confirme o destino. Queimar o plástico não é uma etapa de reciclagem segura.",
    "pratica": "Confira se cabos separados para descarte estão desconectados e não atrapalham a passagem.",
    "ver": {
      "modulo": "riscos",
      "id": "cabos"
    }
  },
  {
    "id": "t7",
    "titulo": "Resíduos que pedem cuidado extra",
    "resumo": "Pilhas, lâmpadas e óleo têm destinos próprios.",
    "imagem": "baterias",
    "texto": "Esses resíduos não devem ser misturados aos recicláveis comuns. Consulte a ficha do item e observe seu estado antes de manusear ou transportar.",
    "passos": [
      "Pilhas e baterias: não perfure nem amasse. Se houver calor, inchaço ou vazamento, afaste-se e avise a equipe; não coloque no coletor comum do ponto.",
      "Lâmpadas: evite quebras e mantenha protegidas. Se uma fluorescente quebrar, afaste as pessoas e solicite orientação para a limpeza.",
      "Óleo de cozinha: espere esfriar e acondicione em garrafa bem fechada para um ponto de coleta próprio. Não despeje na pia."
    ],
    "exemplo": "A coleta interna de pequenos eletrônicos não significa que o mesmo recipiente aceite lâmpadas ou óleo. Cada fluxo precisa ser confirmado.",
    "pratica": "Consulte a ficha de um desses materiais e identifique o cuidado que deve acontecer antes da entrega.",
    "ver": {
      "modulo": "riscos",
      "id": "baterias"
    }
  },
  {
    "id": "t9",
    "titulo": "Conheça os pontos da Papelito",
    "resumo": "Financeiro e Marketing fazem parte da rotina.",
    "imagem": "eletronico",
    "texto": "Há dois pontos internos informados para pilhas, baterias e pequenos eletrônicos: Financeiro e Marketing. A equipe orienta o recebimento e o encaminhamento ao coletivo parceiro.",
    "passos": [
      "Confira o tipo, o tamanho e o estado do item antes de levá-lo.",
      "Separe os resíduos de embalagens, líquidos e restos de alimento.",
      "Se o recipiente estiver cheio ou o material estiver danificado, avise a equipe e combine a entrega. Não deixe no chão ao lado."
    ],
    "exemplo": "Você tem pilhas usadas e uma tela quebrada. As pilhas seguem a orientação do ponto interno; a tela precisa ter sua entrega combinada antes.",
    "pratica": "Localize os pontos do Financeiro e do Marketing e tire dúvidas sobre os itens recebidos.",
    "ver": {
      "modulo": "materiais",
      "id": "eletronico"
    }
  },
  {
    "id": "t10",
    "titulo": "Bitucas têm um caminho próprio",
    "resumo": "Use os coletores distribuídos pela empresa.",
    "imagem": "bitucas",
    "texto": "A Papelito tem pontos de descarte de bitucas espalhados pela empresa. A parceria com a Poiato Recicla encaminha esse resíduo para reciclagem especializada.",
    "passos": [
      "Apague completamente a bituca antes do descarte.",
      "Use somente o coletor específico. Não misture bitucas ao papel, ao orgânico ou aos demais recicláveis.",
      "Não coloque embalagens no coletor de bitucas. Se precisar localizar o mais próximo, peça orientação à equipe."
    ],
    "exemplo": "Bituca apagada e embalagem vazia não vão juntas: a bituca tem coletor exclusivo e a embalagem segue a orientação do seu material.",
    "pratica": "Identifique o coletor de bitucas mais próximo do seu setor.",
    "ver": {
      "modulo": "materiais",
      "id": "bitucas"
    }
  },
  {
    "id": "t11",
    "titulo": "Feche o ciclo no seu setor",
    "resumo": "Faça uma conferência antes da retirada.",
    "imagem": "papel",
    "texto": "A integração vira rotina quando a equipe repete os mesmos cuidados. Antes da coleta, uma conferência simples ajuda a evitar mistura de resíduos e problemas para quem transporta.",
    "passos": [
      "Confira se os materiais estão separados e os recipientes identificados.",
      "Mantenha os caminhos livres; comunique recipientes cheios, itens danificados ou misturados.",
      "Oriente quem estiver chegando: mostre os pontos e use o ReciclaLito para consultar dúvidas."
    ],
    "exemplo": "Um recipiente cheio é um sinal para avisar a equipe responsável, não para começar uma pilha de resíduos no corredor.",
    "pratica": "Converse com alguém do setor e revisem juntos um descarte frequente.",
    "ver": {
      "modulo": "materiais",
      "id": "papel"
    }
  },
  {
    "id": "t8",
    "titulo": "Verificação final",
    "resumo": "Revise as decisões da rotina e veja seu resultado.",
    "texto": "Responda às situações e leia a explicação de cada resposta."
  }
],

  /* Perguntas da verificação final do módulo 3 */
  perguntas: [
  {
    "p": "Qual cor é usada para papel na coleta seletiva?",
    "opcoes": [
      "Verde",
      "Azul",
      "Vermelho"
    ],
    "certa": 1,
    "explicacao": "O azul identifica papel. O material também precisa estar seco e separado de sujeira."
  },
  {
    "p": "O que fazer com fio de cobre encapado?",
    "opcoes": [
      "Queimar para tirar o plástico",
      "Separar sem queimar e confirmar o destino",
      "Jogar no lixo comum"
    ],
    "certa": 1,
    "explicacao": "Mantenha o cabo separado e confirme o recebimento. Não improvise a retirada do revestimento."
  },
  {
    "p": "Papelão manchado de óleo pode ir junto com o papelão limpo?",
    "opcoes": [
      "Sim, normalmente",
      "Não, deve ficar separado"
    ],
    "certa": 1,
    "explicacao": "Gordura contamina o material. Consulte a orientação de descarte e mantenha separado do papel limpo."
  },
  {
    "p": "Uma lâmpada fluorescente quebrou. Qual é o primeiro cuidado?",
    "opcoes": [
      "Varrer rápido",
      "Afastar as pessoas e pedir orientação à equipe",
      "Aspirar o pó"
    ],
    "certa": 1,
    "explicacao": "Evite contato com o material e não improvise a limpeza. Consulte a orientação para esse resíduo."
  },
  {
    "p": "Onde entra o óleo de cozinha usado e frio?",
    "opcoes": [
      "Na pia com bastante água",
      "Em garrafa fechada, no ponto de coleta próprio"
    ],
    "certa": 1,
    "explicacao": "Espere esfriar e use um recipiente bem fechado. O óleo não vai na pia nem no coletor de orgânicos."
  },
  {
    "p": "Você percebe uma bateria inchada ou quente. O que faz?",
    "opcoes": [
      "Fura para esvaziar",
      "Afasta-se e avisa a equipe antes de manusear",
      "Coloca no coletor com as outras pilhas"
    ],
    "certa": 1,
    "explicacao": "O estado da bateria muda a forma de recebimento. Não perfure nem coloque um item danificado junto dos demais."
  },
  {
    "p": "Um espelho quebrado pode ir junto com garrafas de vidro?",
    "opcoes": [
      "Sim, é o mesmo material",
      "Não, precisa de orientação de descarte separada"
    ],
    "certa": 1,
    "explicacao": "Espelhos não seguem a mesma coleta das embalagens de vidro. Confira a ficha antes de entregar."
  },
  {
    "p": "Por que não se deve queimar fio para tirar o cobre?",
    "opcoes": [
      "Demora mais",
      "A fumaça faz mal e a prática coloca pessoas em risco",
      "Não faz diferença"
    ],
    "certa": 1,
    "explicacao": "Recuperar um material não pode colocar em risco quem trabalha ou está por perto."
  },
  {
    "p": "Quais são os pontos internos para pilhas e pequenos eletrônicos?",
    "opcoes": [
      "Financeiro e Marketing",
      "Qualquer lixeira do escritório",
      "Somente os coletores de bitucas"
    ],
    "certa": 0,
    "explicacao": "Financeiro e Marketing são os dois pontos informados. Confirme o recebimento de itens maiores ou danificados."
  },
  {
    "p": "Onde descartar uma bituca completamente apagada?",
    "opcoes": [
      "No coletor de papel",
      "Nos coletores específicos distribuídos pela empresa",
      "Junto com os restos de comida"
    ],
    "certa": 1,
    "explicacao": "As bitucas têm fluxo próprio, ligado à parceria com a Poiato Recicla. Embalagens ficam fora desse coletor."
  },
  {
    "p": "O recipiente está cheio. Como agir?",
    "opcoes": [
      "Deixar o material no corredor",
      "Misturar em outro coletor",
      "Avisar a equipe e combinar a entrega"
    ],
    "certa": 2,
    "explicacao": "Manter a passagem livre e comunicar a situação faz parte da rotina de descarte seguro."
  }
],

  /* ----------------------------------------------------------
     TEXTOS DA INTERFACE
     ---------------------------------------------------------- */
  textos: {
    subtitulo: 'Descarte certo e trabalho seguro',
    modulo1: 'Onde descarto?',
    modulo1desc: 'Busque o item ou toque no material',
    buscaRotulo: 'O que você precisa descartar?',
    buscaDica: 'Busque um item: papel, pilha, bituca…',
    buscaVazia: 'Nada encontrado com esse nome. Limpe a busca para consultar os materiais ou pergunte à equipe responsável.',
    modulo2: 'Segurança do catador',
    modulo2desc: 'Riscos do eletrônico e proteção no manuseio',
    modulo3: 'Integração da equipe',
    modulo3desc: 'Trilha para quem está começando',
    emergencia: 'Deu errado. E agora?',
    emergenciaAviso: 'Isto não substitui atendimento. Em caso grave, SAMU 192 ou Bombeiros 193.',
    valorRotulo: 'Quanto rende',
    valorAviso: 'Preço muda toda semana e varia de cooperativa para cooperativa. Confirme na sua antes de fechar negócio.',
    foraDoCodigo: 'Fora do código de cores',
    rodape: 'Projeto de extensão universitária — Universidade Católica de Brasília, em parceria com a Papelito Brasil.',
    verParceria: 'Ver o compromisso de sustentabilidade da parceria',
    parceriaTitulo: 'Sobre a parceria',
    parceriaIntro: 'A Papelito Brasil, que apoia este projeto, também declara compromissos próprios com reciclagem e meio ambiente — no mesmo formato que a empresa usa na própria página de sustentabilidade dela:',
    parceriaStatTitulo: 'Reflorestamento em números',
    parceriaStatLegenda: 'árvores plantadas, segundo a empresa',
    parceriaImpactoTitulo: 'Reciclar mais do que produz',
    parceriaImpactoTexto: 'Desde 2021 a empresa paga cooperativas de catadores para reciclar o dobro do resíduo que ela mesma produz por mês. A primeira parceira foi a ACOBRAZ, cooperativa de catadores de Brazlândia (DF) — a mesma linha de trabalho de quem usa este aplicativo.',
    parceriaSelosTitulo: 'Selos e compromissos declarados',
    parceriaEnergiaTitulo: 'Energia solar',
    parceriaEnergiaTexto: 'A empresa afirma que toda a sua produção é abastecida por energia solar.'
  },

  /* ----------------------------------------------------------
     SOBRE A PARCERIA — o que a Papelito (apoiadora do projeto)
     declara fazer em sustentabilidade, no mesmo formato usado na
     página de sustentabilidade oficial dela (número de árvores em
     destaque, depois selos). São afirmações da própria empresa (ver
     fonte de cada item), não uma auditoria independente feita pelo
     ReciclaLito — por isso o texto usa "a empresa diz/afirma".
     Os dois números abaixo (arvoresPlantadas/arvoresMeta) são só
     números: para atualizar, troque os dois valores.
     ---------------------------------------------------------- */
  parceriaStat: {
    arvoresPlantadas: 52274,
    arvoresMeta: 100000,
    metaTexto: 'Meta declarada: 100 mil árvores plantadas até 2027.'
  },
  parceria: [
    {
      id: 'carbono',
      titulo: 'Carbono Zerado',
      texto: 'A empresa afirma compensar as emissões de carbono da sua produção desde 2021, já aplicado a mais de 40 milhões de produtos.',
      icone: 'carbonoNeutro'
    },
    {
      id: 'reflorestamento',
      titulo: '100 mil árvores',
      texto: 'Meta declarada de plantio de 100 mil árvores até 2027 (ver número atualizado acima).',
      icone: 'arvore'
    },
    {
      id: 'industria',
      titulo: 'Indústria brasileira',
      texto: 'A empresa destaca a produção nacional como parte do seu compromisso declarado.',
      icone: 'industria'
    }
  ]
};


/* EVOLUÇÃO PAPELITO — dados operacionais fornecidos no briefing.
   Somente locais confirmados são exibidos. Revisar estes dados quando a rotina mudar. */
CONTEUDO.guia = {
  chamada: 'Sustentabilidade na prática',
  apoio: 'Separe com cuidado. Descarte no lugar certo. Faça parte dessa mudança.',
  foto: 'fotos/reciclagem.jpg', fotoAlt: 'Materiais separados para reciclagem',
  fotoLegenda: 'CADA MATERIAL TEM SEU CAMINHO.',
  assinatura: 'Uma iniciativa Papelito',
  atalhoTitulo: 'No dia a dia',
  atalhos: [
    { nome: 'Pilhas e baterias', destino: '#risco/baterias' },
    { nome: 'Eletrônicos', destino: '#material/eletronico' },
    { nome: 'Bitucas', destino: '#material/bitucas' }
  ],
  pontosTitulo: 'Pontos de descarte na Papelito',
  pontosIntro: 'Perto de você, dentro da empresa.',
  localRotulo: 'Ponto de coleta', aceitaRotulo: 'Recebe',
  pontosAcao: 'Ver orientações', naPapelito: 'Na Papelito',
  naoComum: 'Não jogue no lixo comum',
  destino: 'A destinação é feita pelo coletivo parceiro responsável pela coleta.',
  conferir: 'Para outros itens ou materiais danificados, confirme o procedimento com a equipe antes de entregar.',
  bitucasTitulo: 'Bitucas de cigarro',
  descarteRotulo: 'Descarte aqui', podeRotulo: 'Pode descartar', naoRotulo: 'Não descarte',
  depoisRotulo: 'E depois?', parceriaRotulo: 'Parceria',
  selosTitulo: 'Certificações & compromissos',
  selosIntro: 'Conheça os compromissos declarados pela Papelito.',
  mais: 'Saiba mais',
  impactoTitulo: 'Sustentabilidade que chega à rotina.',
  impactoIntro: 'Compromissos declarados pela Papelito e registrados neste projeto.',
  impactoNota: 'Indicadores institucionais, não uma medição em tempo real.',
  rodapeTitulo: 'ReciclaLito',
  offline: 'Depois do primeiro acesso, funciona sem internet.'
};
CONTEUDO.pontosInternos = [
  { id: 'financeiro', tipo: 'eletronicos', local: 'Financeiro', aceita: ['Pilhas', 'Baterias', 'Pequenos eletrônicos'], referencia: null, parceiro: null },
  { id: 'marketing', tipo: 'eletronicos', local: 'Marketing', aceita: ['Pilhas', 'Baterias', 'Pequenos eletrônicos'], referencia: null, parceiro: null }
];
// TODO PAPELITO: confirmar limites dos itens aceitos e nome do coletivo parceiro.
CONTEUDO.bitucas = {
  coletores: [], // TODO PAPELITO: confirmar locais e referências dos coletores.
  orientacao: 'A Papelito tem pontos de descarte de bitucas distribuídos pela empresa. Use os coletores específicos, sempre com a bituca completamente apagada. Se precisar encontrar o mais próximo, peça orientação à equipe.',
  podeDescartar: ['Bitucas completamente apagadas'],
  naoPodeDescartar: ['Bitucas acesas', 'Embalagens e outros resíduos'],
  depoisDaColeta: 'As bitucas seguem para reciclagem especializada pela parceria com a Poiato Recicla.',
  parceria: { nome: 'Poiato Recicla', descricao: 'Parceria de destinação e reciclagem de bitucas informada pela Papelito.' }
};
CONTEUDO.certificacoes = [
  // TODO PAPELITO: conteúdo FSC aprovado, escopo, licença, link e imagem oficial.
  { nome: 'FSC', tipo: 'Certificação', descricao: null, imagem: null, link: null, aprovado: false },
  { nome: 'Carbono Zerado', tipo: 'Compromisso', descricao: 'A empresa declara compensar as emissões de carbono da sua produção desde 2021.', aprovado: true },
  { nome: 'Poiato Recicla', tipo: 'Parceria', descricao: 'Destinação de bitucas para reciclagem especializada.', aprovado: true, destino: '#material/bitucas' }
];
CONTEUDO.impacto = [
  { numero: '100%', titulo: 'Energia solar', texto: 'A empresa afirma que toda a produção é abastecida por energia solar.' },
  { numero: '2×', titulo: 'Mais reciclagem', texto: 'A empresa declara financiar a reciclagem do dobro do resíduo que produz por mês, desde 2021.' },
  { numero: '100 mil', titulo: 'Árvores até 2027', texto: 'Meta de plantio declarada pela Papelito.' }
];
CONTEUDO.materiais.push({
  id: 'bitucas', nome: 'Bitucas de cigarro', cor: '#231F20', texto: 'claro', simbolo: 'separar',
  separar: 'Apague completamente antes de descartar. Separe de embalagens e demais resíduos.',
  entregar: 'Coletores específicos de bitucas distribuídos pela empresa. Peça à equipe orientação sobre o mais próximo.',
  atencao: 'Não misture aos recicláveis comuns. Nunca coloque uma bituca acesa no coletor.'
});

CONTEUDO.itens.push({ nome: 'Eletrônicos', busca: 'eletronico eletrônicos aparelhos equipamentos', vai: { modulo: 'materiais', id: 'eletronico' } });


/* Identidade visual oficial: https://www.papelito.com/sustentabilidade
   Imagens locais consultadas em 25/09/2026; não alteram o escopo de certificações. */
CONTEUDO.guia.foto = 'fotos/marca/acao.webp';
CONTEUDO.guia.fotoAlt = 'Participantes da ação Fevereiro Verde da Papelito em uma praia';
CONTEUDO.guia.fotoLegenda = 'PAPELITO EM AÇÃO • FEVEREIRO VERDE';
CONTEUDO.guia.impactoTitulo = 'Nosso papel é cuidar.';
CONTEUDO.guia.impactoIntro = 'Da energia que move a produção ao cuidado com o destino dos resíduos.';
CONTEUDO.guia.fonteRotulo = 'Conheça as iniciativas no site da Papelito';
CONTEUDO.guia.fonteUrl = 'https://www.papelito.com/sustentabilidade';
CONTEUDO.guia.fechamentoTitulo = 'O próximo passo começa com você.';
CONTEUDO.guia.fechamentoTexto = 'Um material separado. Um descarte correto. Um cuidado que continua depois de cada consulta.';
CONTEUDO.guia.fechamentoAcao = 'Encontrar o descarte certo';
CONTEUDO.guia.fechamentoImagem = 'fotos/marca/arvore.svg';
CONTEUDO.impacto[0].imagem = 'fotos/marca/energia.webp';
CONTEUDO.impacto[0].alt = 'Painéis solares na comunicação oficial da Papelito';
CONTEUDO.impacto[1].imagem = 'fotos/marca/reciclagem.svg';
CONTEUDO.impacto[1].alt = 'Ilustração oficial Papelito de cuidado com a natureza';
CONTEUDO.impacto[2].imagem = 'fotos/marca/floresta.webp';
CONTEUDO.impacto[2].alt = 'Reflorestamento na comunicação oficial da Papelito';
CONTEUDO.certificacoes[1].imagem = 'fotos/marca/carbono.svg';
CONTEUDO.certificacoes.push({ nome: '100 mil árvores', tipo: 'Meta até 2027', descricao: 'Meta de plantio divulgada pela Papelito. Cada árvore faz parte de um compromisso de longo prazo.', imagem: 'fotos/marca/arvores-selo.svg', aprovado: true });
CONTEUDO.certificacoes.push({ nome: 'Indústria brasileira', tipo: 'Origem', descricao: 'Produção nacional e uma identidade conectada à cultura brasileira.', imagem: 'fotos/marca/brasil.svg', aprovado: true });

/* Guia visual e segurança: atualização solicitada em setembro de 2026. */
CONTEUDO.guia.naoComum = 'Coleta de pilhas e pequenos eletrônicos';
CONTEUDO.seguranca = {
  chamada: 'CUIDAR DE QUEM RECICLA',
  titulo: 'Seu cuidado vem primeiro.',
  intro: 'Cada material pede um cuidado. Antes de separar, observe o estado do resíduo, prepare o espaço e consulte a ficha para reconhecer os riscos.',
  etapas: [
    {titulo: 'Prepare o espaço', texto: 'Mantenha a passagem livre e os recipientes identificados. Separe itens cortantes ou danificados dos demais materiais e avise a equipe.'},
    {titulo: 'Proteja-se na triagem', texto: 'Use os equipamentos de proteção indicados para a tarefa. Não coloque as mãos em sacos sem enxergar o conteúdo. Não abra, quebre ou queime componentes para retirar metais.'},
    {titulo: 'Entregue com cuidado', texto: 'Mantenha cada tipo de resíduo separado e avise quem vai receber sobre peças quebradas ou danificadas. Confirme se o destino aceita aquele material antes de transportar.'}
  ],
  materiaisTitulo: 'Reconheça o material. Confira o cuidado.',
  materiaisIntro: 'Toque em uma ficha para ver como manusear, o que evitar e onde entregar.',
  protecaoTitulo: 'Proteção faz parte do trabalho',
  encerramentoTitulo: 'Ao terminar a separação',
  encerramento: 'Guarde os materiais de forma estável, sem bloquear a circulação. Higienize as mãos antes de comer ou beber e comunique à equipe recipientes cheios, vazamentos ou situações de risco.',
  entregaTitulo: 'E dentro da Papelito?',
  entregaIntro: 'Os pontos abaixo recebem pilhas, baterias e pequenos eletrônicos. Lâmpadas, telas e outros resíduos têm orientações próprias nas fichas. Para um item danificado, combine a entrega com a equipe antes de colocá-lo no coletor.',
  bitucas: 'Bitucas têm outro destino: os coletores específicos distribuídos pela empresa, com encaminhamento pela parceria com a Poiato Recicla.',
  bitucasAcao: 'Ver descarte de bitucas',
  fotoNota: 'Imagem ilustrativa',
  fonteRotulo: 'Fonte da imagem',
  riscoAcao: 'Ver cuidados',
  referenciaRotulo: 'Referências para os cuidados no trabalho',
  referencias: [
    {nome: 'Fundacentro · proteção nas cooperativas de reciclagem', url: 'https://www.gov.br/fundacentro/pt-br/comunicacao/noticias/noticias/2022/maio/hq-traz-cipa-equipamento-de-protecao-coletiva-e-individual-nas-cooperativas-de-materiais-reciclaveis'},
    {nome: 'Green Eletron · dúvidas sobre descarte de eletrônicos', url: 'https://greeneletron.org.br/perguntas-frequentes/'}
  ]
};
CONTEUDO.riscos.forEach(function (r) {
  var resumos = {
    baterias: 'Observe o estado da bateria. Não perfure nem amasse.',
    lampadas: 'Evite quebras. Mantenha as lâmpadas protegidas.',
    cabos: 'Nunca queime fios para recuperar o metal.',
    placas: 'Bordas e componentes exigem cuidado no manuseio.',
    telas: 'Vidro e componentes internos: transporte sem desmontar.',
    toner: 'Mantenha o cartucho fechado. Evite espalhar o pó.'
  };
  r.resumo = resumos[r.id];
});

CONTEUDO.fotosGuia = {
  "papel": {
    "src": "fotos/materiais/papel.webp",
    "alt": "Papelão separado e empilhado para reciclagem",
    "fonte": "https://en.wikipedia.org/wiki/File:57_Cardboard_stacked_for_recycling_pick_up_in_Kuala_Lumpur,_Malaysia_-_free_photo_with_attribution_(Creative_Commons).jpg",
    "credito": "Wikimedia Commons"
  },
  "plastico": {
    "src": "fotos/materiais/plastico.webp",
    "alt": "Garrafa plástica transparente",
    "fonte": "https://en.wikipedia.org/wiki/File:Botella_de_plástico_-_PET.jpg",
    "credito": "Wikimedia Commons"
  },
  "vidro": {
    "src": "fotos/materiais/vidro.webp",
    "alt": "Garrafas de vidro de diferentes cores",
    "fonte": "https://en.wikipedia.org/wiki/File:Beer_bottles_2018_G1.jpg",
    "credito": "Wikimedia Commons"
  },
  "metal": {
    "src": "fotos/materiais/metal.webp",
    "alt": "Fardos de latas de alumínio prensadas",
    "fonte": "https://en.wikipedia.org/wiki/File:Compressed_aluminium_cans.jpg",
    "credito": "Wikimedia Commons"
  },
  "eletronico": {
    "src": "fotos/materiais/eletronico.webp",
    "alt": "Monitores e equipamentos eletrônicos descartados",
    "fonte": "https://en.wikipedia.org/wiki/File:Ewaste-pile.jpg",
    "credito": "Wikimedia Commons"
  },
  "oleo": {
    "src": "fotos/materiais/oleo.webp",
    "alt": "Óleo de cozinha em recipiente de vidro",
    "fonte": "https://en.wikipedia.org/wiki/File:Olive_oil_from_Oneglia.jpg",
    "credito": "Wikimedia Commons"
  },
  "organico": {
    "src": "fotos/materiais/organico.webp",
    "alt": "Resíduos vegetais em compostagem",
    "fonte": "https://en.wikipedia.org/wiki/File:Compost_pile.JPG",
    "credito": "Wikimedia Commons"
  },
  "baterias": {
    "src": "fotos/materiais/baterias.webp",
    "alt": "Pilhas e baterias de diferentes formatos",
    "fonte": "https://en.wikipedia.org/wiki/File:6_most_common_battery_types-1.jpg",
    "credito": "Wikimedia Commons"
  },
  "lampadas": {
    "src": "fotos/materiais/lampadas.webp",
    "alt": "Lâmpadas fluorescentes de diferentes formatos",
    "fonte": "https://en.wikipedia.org/wiki/File:Leuchtstofflampen-chtaube050409.jpg",
    "credito": "Wikimedia Commons"
  },
  "cabos": {
    "src": "fotos/materiais/cabos.webp",
    "alt": "Detalhe de um cabo elétrico com condutores metálicos",
    "fonte": "https://en.wikipedia.org/wiki/File:Electric_guide_3×2.5_mm.jpg",
    "credito": "Wikimedia Commons"
  },
  "placas": {
    "src": "fotos/materiais/placas.webp",
    "alt": "Placa eletrônica com circuitos e componentes",
    "fonte": "https://en.wikipedia.org/wiki/File:SEG_DVD_430_-_Printed_circuit_board-4276.jpg",
    "credito": "Wikimedia Commons"
  },
  "toner": {
    "src": "fotos/materiais/toner.webp",
    "alt": "Cartucho de toner de impressora",
    "fonte": "https://en.wikipedia.org/wiki/File:Tonerkassette_Laserdrucker_HP.jpg",
    "credito": "Wikimedia Commons"
  },
  "bitucas": {
    "src": "fotos/materiais/bitucas.webp",
    "alt": "Bitucas acumuladas em um cinzeiro",
    "fonte": "https://www.bundesaerztekammer.de/themen/aerzte/public-health/suchtmedizin/tabak",
    "credito": "Bundesärztekammer"
  },
  "telas": {
    "src": "fotos/materiais/eletronico.webp",
    "alt": "Monitores e equipamentos eletrônicos descartados",
    "fonte": "https://en.wikipedia.org/wiki/File:Ewaste-pile.jpg",
    "credito": "Wikimedia Commons"
  }
};
CONTEUDO.materiais.concat(CONTEUDO.riscos).forEach(function(item) { item.foto = CONTEUDO.fotosGuia[item.id]; });

/* Créditos das fotos; versões locais redimensionadas e convertidas em WebP. */
CONTEUDO.creditosFotos = {"papel": "Marek Ślusarczyk · CC BY 3.0", "plastico": "Feralbt · CC BY-SA 3.0", "vidro": "George Chernilevsky · domínio público", "metal": "Tycho · CC0", "eletronico": "AvWijk · domínio público", "oleo": "Lemone · CC BY-SA 4.0", "organico": "Ksd5 · CC0", "baterias": "Lead holder · CC BY-SA 3.0", "lampadas": "Christian Taube / Deglr6328 · CC BY-SA 2.0 DE", "cabos": "Petar Milošević · CC BY-SA 4.0", "placas": "Raimond Spekking · CC BY-SA 4.0", "toner": "Sir James · domínio público", "bitucas": "Bundesärztekammer"};
Object.keys(CONTEUDO.creditosFotos).forEach(function(id) { CONTEUDO.fotosGuia[id].credito = CONTEUDO.creditosFotos[id]; });

/* Integração: textos da jornada, sem cadastro ou envio de dados. */
CONTEUDO.integracao = {
  chamada: 'DA SEPARAÇÃO À ENTREGA',
  titulo: 'Um cuidado que passa de pessoa para pessoa.',
  intro: 'Conheça os materiais, os pontos da Papelito e os cuidados que fazem diferença para quem coleta. Siga no seu ritmo e coloque cada etapa em prática no seu setor.',
  tempo: 'Reserve cerca de 20–25 minutos',
  salvo: 'O progresso fica salvo neste aparelho. Você pode parar e continuar depois.',
  comecar: 'Começar a integração', continuar: 'Continuar de onde parei',
  etapasTitulo: 'Sua trilha de integração',
  antes: 'Antes de começar',
  antesTexto: 'Pense nos resíduos que aparecem no seu setor. Ao longo da trilha, procure os pontos de descarte e converse com a equipe quando surgir uma dúvida.',
  passos: 'O que fazer na prática', exemplo: 'Uma situação do dia a dia', pratica: 'Experimente no seu setor',
  lida: 'Marcar como lida', concluida: 'Etapa já lida', proxima: 'Ir para a próxima etapa',
  ficha: 'Consultar a ficha do material', voltar: 'Ver todas as etapas',
  rotulo: 'Etapa', de: 'de', pendente: 'Para ler', feito: 'Lida',
  verificar: 'Fazer a verificação', quizFeito: 'Respondida',
  resultadoNota: 'Este é um registro de leitura e participação, não uma certificação profissional. As ações no setor devem seguir a orientação da equipe.',
  repetir: 'Refazer a verificação',
  acerto: 'Isso mesmo.', erro: 'A resposta certa está marcada em verde.'
};
CONTEUDO.trilha.forEach(function(e) { if(e.imagem) e.foto = CONTEUDO.fotosGuia[e.imagem]; });
