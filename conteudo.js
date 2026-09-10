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
    }
  ],

  /* ----------------------------------------------------------
     BUSCA — ITENS DO DIA A DIA
     Esta lista alimenta o campo "Buscar" do módulo 1. Serve para
     quem está com o objeto na mão e não sabe em qual dos seis
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
    { nome: 'Bituca de cigarro', busca: 'bituca cigarro guimba filtro', resposta: 'Vai no lixo comum. O filtro é plástico, mas não tem como reciclar.', destino: 'Rejeito' },
    { nome: 'Esponja e escova de dente', busca: 'esponja bucha escova dente', resposta: 'Vai no lixo comum. Material misturado, sem separação possível.', destino: 'Rejeito' },
    { nome: 'Resto de comida e casca', busca: 'comida resto casca fruta legume borra cafe organico', resposta: 'É orgânico. Se houver compostagem, vai para a leira. Se não houver, lixo comum. Nunca junto com o reciclável, porque molha e contamina tudo.', destino: 'Orgânico' },
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
     PONTOS DE ENTREGA DA REGIÃO
     O app hoje diz "ponto de logística reversa" e deixa o ONDE no
     ar — que é justamente o que a pessoa com a lâmpada na mão
     precisa saber. Preencha aqui e o endereço passa a aparecer
     dentro da ficha de cada material.

     'recebe' usa os mesmos id dos blocos materiais e riscos.
     'exemplo: true' faz aparecer um aviso laranja na tela.
     APAGUE os dois exemplos abaixo assim que puser os de verdade.
     ---------------------------------------------------------- */
  pontos: [
    {
      nome: 'EXEMPLO — trocar por um ponto de verdade',
      endereco: 'SCS Quadra 1, Brasília, DF',
      horario: 'Segunda a sexta, 8h às 17h',
      telefone: '',
      recebe: ['eletronico', 'baterias', 'lampadas', 'placas', 'telas', 'toner'],
      exemplo: true
    },
    {
      nome: 'EXEMPLO — trocar por um ponto de verdade',
      endereco: 'Feira do Guará, Brasília, DF',
      horario: 'Todo dia, 7h às 18h',
      telefone: '',
      recebe: ['oleo'],
      exemplo: true
    }
  ],

  /* ----------------------------------------------------------
     MÓDULO 3 — INTEGRAÇÃO DA EQUIPE
     Trilha para quem está começando. Cada etapa aponta para
     um conteúdo que já existe nos módulos 1 e 2.
     ---------------------------------------------------------- */
  trilha: [
    { id: 't1', titulo: 'Por que separar resíduo',
      texto: 'Material separado na origem chega limpo na cooperativa e vale mais. Material misturado se contamina: um papelão molhado de óleo deixa de ser reciclável e vira rejeito. Separar bem é o que transforma resíduo em renda para quem trabalha com ele.' },
    { id: 't2', titulo: 'As cores da coleta seletiva',
      texto: 'O código de cores é nacional e está na Resolução CONAMA 275. Azul é papel, vermelho é plástico, verde é vidro, amarelo é metal, laranja é resíduo perigoso, marrom é orgânico e cinza é rejeito. Quem conhece as cores acha o lugar certo sem precisar perguntar. Uma coisa importante: o óleo de cozinha não tem cor no código. Ele não é orgânico, não vai em lixeira nenhuma e só entra em ponto de coleta próprio. No app ele aparece de fundo claro justamente para não ser confundido com o marrom.' },
    { id: 't3', titulo: 'Papel e papelão na prática', ver: { modulo: 'materiais', id: 'papel' },
      texto: 'É o material de maior volume no dia a dia. Seco e desmontado ocupa menos espaço e rende mais por viagem.' },
    { id: 't4', titulo: 'Eletrônicos: riscos e cuidados', ver: { modulo: 'riscos', id: 'placas' },
      texto: 'Eletrônico não é lixo comum. Tem metal pesado dentro e exige luva, cuidado no transporte e ponto de entrega específico.' },
    { id: 't5', titulo: 'Pilhas, lâmpadas e óleo', ver: { modulo: 'riscos', id: 'lampadas' },
      texto: 'São os três casos em que o descarte errado causa dano imediato: bateria que pega fogo, lâmpada que solta mercúrio e óleo que contamina a água.' },
    { id: 't6', titulo: 'Verificação final',
      texto: 'Seis perguntas rápidas para confirmar o que você viu.' }
  ],

  /* Perguntas da verificação final do módulo 3 */
  perguntas: [
    { p: 'Qual cor é usada para papel na coleta seletiva?',
      opcoes: ['Verde', 'Azul', 'Vermelho'], certa: 1 },
    { p: 'O que fazer com fio de cobre encapado?',
      opcoes: ['Queimar para tirar o plástico', 'Descascar com alicate', 'Jogar no lixo comum'], certa: 1 },
    { p: 'Papelão manchado de óleo pode ser reciclado?',
      opcoes: ['Sim, normalmente', 'Não, vira rejeito'], certa: 1 },
    { p: 'Uma lâmpada fluorescente quebrou no galpão. E agora?',
      opcoes: ['Varrer rápido antes de espalhar', 'Arejar o lugar e recolher com luva e papelão', 'Aspirar'], certa: 1 },
    { p: 'Onde entra o óleo de cozinha usado?',
      opcoes: ['Na pia com bastante água', 'Em garrafa PET fechada, no ponto de coleta'], certa: 1 },
    { p: 'Bateria de celular inchada deve ser:',
      opcoes: ['Furada para esvaziar', 'Isolada longe de papel e levada ao ponto de coleta', 'Jogada no lixo comum'], certa: 1 }
  ],

  /* ----------------------------------------------------------
     TEXTOS DA INTERFACE
     ---------------------------------------------------------- */
  textos: {
    subtitulo: 'Descarte certo e trabalho seguro',
    modulo1: 'Onde descarto?',
    modulo1desc: 'Busque o item ou toque no material',
    buscaRotulo: 'Buscar item',
    buscaDica: 'Ex.: isopor, fralda, latinha, pilha',
    buscaVazia: 'Nada encontrado com esse nome. Toque num dos seis materiais abaixo ou pergunte na cooperativa.',
    modulo2: 'Segurança do catador',
    modulo2desc: 'Riscos do eletrônico e proteção no manuseio',
    modulo3: 'Integração da equipe',
    modulo3desc: 'Trilha para quem está começando',
    emergencia: 'Deu errado. E agora?',
    emergenciaAviso: 'Isto não substitui atendimento. Em caso grave, SAMU 192 ou Bombeiros 193.',
    valorRotulo: 'Quanto rende',
    valorAviso: 'Preço muda toda semana e varia de cooperativa para cooperativa. Confirme na sua antes de fechar negócio.',
    pontosRotulo: 'Onde entregar perto de você',
    pontosVazio: 'Os pontos da região ainda não foram cadastrados. Pergunte na cooperativa ou na administração regional.',
    foraDoCodigo: 'Fora do código de cores',
    rodape: 'Projeto de extensão universitária — Universidade Católica de Brasília, em parceria com a Papelito Brasil.'
  }
};
