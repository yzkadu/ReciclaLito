/* ============================================================
   ReciclaLito — app.js
   Para mudar textos, materiais ou perguntas, edite conteudo.js.
   Este arquivo cuida da navegação e das telas.
   ============================================================ */
(function () {
  'use strict';

  var C = CONTEUDO;
  var main = document.getElementById('principal');
  var btVoltar = document.getElementById('voltar');
  var CHAVE = 'reciclalito.trilha';

  /* ---------- ícones dos materiais (formas simples, alto contraste) ---------- */
  var ICONES = {
    papel: '<path d="M6 3h13l5 5v22H6z" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/><path d="M19 3v6h5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/><path d="M11 15h12M11 21h12" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>',
    plastico: '<path d="M13 3h6v4l3 4v19H10V11l3-4z" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/><path d="M10 18h12" stroke="currentColor" stroke-width="2.4"/>',
    vidro: '<path d="M12 3h8v8l3 5v14H9V16l3-5z" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/>',
    metal: '<rect x="9" y="5" width="14" height="22" rx="2" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M9 10h14M9 22h14" stroke="currentColor" stroke-width="2.4"/>',
    eletronico: '<rect x="5" y="8" width="22" height="15" rx="2" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M11 27h10M16 23v4" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><path d="M13 14l-2 3h4l-2 3" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/>',
    oleo: '<path d="M16 4c5 6 8 9 8 13a8 8 0 1 1-16 0c0-4 3-7 8-13z" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/>',
    organico: '<path d="M6 27C6 15 14 6 27 6c1 13-8 21-20 21-.4 0-.7 0-1 0z" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/><path d="M9 24c4-7 9-12 15-15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>',

    /* ---- riscos (módulo 2), um ícone por id em C.riscos ---- */
    baterias: '<rect x="4" y="10" width="21" height="14" rx="2.5" fill="none" stroke="currentColor" stroke-width="2.4"/><rect x="25" y="14.5" width="4" height="5" rx="1" fill="currentColor"/><path d="M16 14l-4 5h4l-1.5 4 5-5h-4z" fill="currentColor"/>',
    lampadas: '<path d="M12 24h8M13 27h6" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><path d="M16 4a9 9 0 0 0-5.3 16.3c.8.6 1.3 1.5 1.3 2.7h8c0-1.2.5-2.1 1.3-2.7A9 9 0 0 0 16 4z" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/>',
    cabos: '<path d="M12 3v7M20 3v7M9 10h14v5a7 7 0 0 1-14 0v-5z" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/><path d="M16 22v6" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>',
    placas: '<rect x="8" y="8" width="16" height="16" rx="2.4" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M12 4v4M20 4v4M12 24v4M20 24v4M4 12h4M4 20h4M24 12h4M24 20h4" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>',
    telas: '<rect x="4" y="7" width="24" height="16" rx="2.4" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M11 28h10M16 23v5" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>',
    toner: '<rect x="7" y="10" width="18" height="14" rx="2.4" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M12 10V7h8v3" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/><path d="M11 16h10" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>',

    /* ---- cabeçalhos de seção nas fichas (fora do código de cores dos materiais) ---- */
    separar: '<path d="M5 6h22l-8 10v8l-6 3v-11z" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/>',
    entregar: '<path d="M16 28s9-9.5 9-16a9 9 0 1 0-18 0c0 6.5 9 16 9 16z" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/><circle cx="16" cy="12" r="3.2" fill="none" stroke="currentColor" stroke-width="2.4"/>',
    atencao: '<path d="M16 4 3 27h26L16 4z" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/><path d="M16 13v6.5" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><circle cx="16" cy="23.5" r="1.4" fill="currentColor"/>',
    manusear: '<path d="M16 4l11 4v8c0 7-4.7 11.3-11 12-6.3-.7-11-5-11-12V8z" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/><path d="M11 16.5l3.3 3.3 6-6.6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>',

    /* ---- trilha (módulo 3) e comprovante ---- */
    generico: '<path d="M16 8c-3-2-7-2-11-1v18c4-1 8-1 11 1 3-2 7-2 11-1V7c-4-1-8-1-11 1z" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/><path d="M16 8v18" stroke="currentColor" stroke-width="2.2"/>',
    verificacao: '<rect x="7" y="6" width="18" height="23" rx="2" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M12 6V4h8v2" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/><path d="M11 17l3.5 3.5L21 13" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>',
    trofeu: '<path d="M8 4h16v6a8 8 0 0 1-16 0V4z" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/><path d="M8 6H4v3a5 5 0 0 0 5 5M24 6h4v3a5 5 0 0 1-5 5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><path d="M16 18v5M11 27h10M12.5 23h7" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>'
  };
  function icone(nome, classe) {
    return '<svg viewBox="0 0 32 32" class="' + (classe || '') + '" aria-hidden="true">' + (ICONES[nome] || '') + '</svg>';
  }
  var SETA = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  /* tira acento e maiúscula para a busca achar "isopor" digitando "ISOPÓR" */
  function normal(s) {
    return String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  /* ---------- progresso da trilha, guardado no próprio aparelho ---------- */
  function lerProgresso() {
    try { return JSON.parse(localStorage.getItem(CHAVE)) || {}; }
    catch (e) { return {}; }
  }
  function salvarProgresso(p) {
    try { localStorage.setItem(CHAVE, JSON.stringify(p)); } catch (e) { /* modo anônimo */ }
  }

  /* ---------- telas ---------- */

  function telaInicio() {
    var t = C.textos;
    return '' +
      '<section class="abertura">' +
        '<h1>' + esc(t.subtitulo) + '</h1>' +
      '</section>' +
      campoBusca(t) +
      '<div id="resultados" role="region" aria-live="polite"></div>' +
      '<div id="grade">' +
      '<div class="aviso-offline">' +
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 13l4 4 10-10" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
        '<span>Depois do primeiro acesso, funciona sem internet.</span>' +
      '</div>' +
      '<nav class="modulos">' +
        botaoModulo('m1', '#materiais', t.modulo1, t.modulo1desc) +
        botaoModulo('m2', '#riscos', t.modulo2, t.modulo2desc) +
        botaoModulo('m3', '#trilha', t.modulo3, t.modulo3desc) +
      '</nav>' +
      '</div>' +
      '<p class="rodape">' + esc(t.rodape) + '</p>';
  }
  function botaoModulo(cls, destino, nome, desc) {
    return '<button class="modulo ' + cls + '" data-ir="' + destino + '">' +
      '<span class="nome">' + esc(nome) + '</span>' +
      '<span class="desc">' + esc(desc) + '</span></button>';
  }

  function telaMateriais() {
    var itens = C.materiais.map(function (m) {
      return '<button class="material ' + m.texto + (m.foraDoCodigo ? ' fora' : '') +
        '" style="background:' + m.cor + '" data-ir="#material/' + m.id + '">' +
        icone(m.simbolo) + '<span class="nome">' + esc(m.nome) + '</span>' +
        (m.foraDoCodigo ? '<span class="marca-fora">' + esc(C.textos.foraDoCodigo) + '</span>' : '') +
        '</button>';
    }).join('');
    var t = C.textos;
    return '<h1 class="titulo-secao">' + esc(t.modulo1) + '</h1>' +
      campoBusca(t) +
      '<div id="resultados" role="region" aria-live="polite"></div>' +
      '<div id="grade">' +
        '<p class="sub-secao">Ou toque num material para ver como separar e onde entregar.</p>' +
        '<div class="materiais">' + itens + '</div>' +
      '</div>';
  }

  /* ---------- busca ---------- */
  function campoBusca(t) {
    return '<div class="busca">' +
        '<label for="q">' + esc(t.buscaRotulo || 'Buscar item') + '</label>' +
        '<div class="campo-busca">' +
          '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M16.5 16.5 21 21" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>' +
          '<input id="q" type="search" autocomplete="off" autocapitalize="off" spellcheck="false" ' +
            'placeholder="' + esc(t.buscaDica || '') + '">' +
          '<button type="button" id="limpar" class="limpar" hidden aria-label="Limpar busca">&times;</button>' +
        '</div>' +
      '</div>';
  }

  function destinoDe(it) {
    if (it.vai && it.vai.modulo === 'materiais') {
      var m = acha(C.materiais, it.vai.id);
      if (m) return { rot: m.nome, cor: m.cor, texto: m.texto };
    }
    if (it.vai && it.vai.modulo === 'riscos') {
      return { rot: 'Perigoso', cor: '#FF6019', texto: 'claro' };
    }
    return { rot: it.destino || 'Ver', cor: '#231F20', texto: 'claro' };
  }

  function buscar(termo) {
    var palavras = normal(termo).split(/\s+/).filter(Boolean);
    if (!palavras.length) return [];
    return (C.itens || []).map(function (it, i) {
      it._i = i; return it;
    }).filter(function (it) {
      var alvo = normal(it.nome + ' ' + (it.busca || '') + ' ' + (it.destino || ''));
      return palavras.every(function (p) { return alvo.indexOf(p) !== -1; });
    });
  }

  function pintaResultados(termo) {
    var caixa = document.getElementById('resultados');
    var grade = document.getElementById('grade');
    var limpar = document.getElementById('limpar');
    if (!caixa) return;
    limpar.hidden = !termo;

    if (!termo) { caixa.innerHTML = ''; if (grade) grade.hidden = false; return; }
    if (grade) grade.hidden = true;

    var achados = buscar(termo);
    if (!achados.length) {
      caixa.innerHTML = '<p class="sem-nada">' + esc(C.textos.buscaVazia || 'Nada encontrado.') + '</p>';
      return;
    }
    caixa.innerHTML = '<ul class="achados">' + achados.map(function (it) {
      var d = destinoDe(it);
      var destino = it.vai
        ? (it.vai.modulo === 'materiais' ? '#material/' : '#risco/') + it.vai.id
        : '#item/' + it._i;
      return '<li><button class="achado" data-ir="' + destino + '">' +
        '<span class="ac-txt"><span class="ac-nome">' + esc(it.nome) + '</span>' +
        (it.nota ? '<span class="ac-nota">' + esc(it.nota) + '</span>' : '') + '</span>' +
        '<span class="chip ' + d.texto + '" style="background:' + d.cor + '">' + esc(d.rot) + '</span>' +
        '</button></li>';
    }).join('') + '</ul>';
  }

  function telaItem(n) {
    var it = (C.itens || [])[Number(n)];
    if (!it) return telaMateriais();
    var d = destinoDe(it);
    return '<div class="faixa" style="background:var(--preto)">' +
        '<h2>' + esc(it.nome) + '</h2>' +
        '<p class="oquetem"><span class="chip ' + d.texto + '" style="background:' + d.cor + '">' + esc(d.rot) + '</span></p>' +
      '</div>' +
      '<div class="blocos">' + campo('Onde vai', it.resposta || '', false, 'entregar') +
      (it.nota ? campo('Observação', it.nota, false, 'atencao') : '') + '</div>' +
      '<div class="leitura"><button class="acao" data-ir="#materiais">Buscar outro item</button></div>';
  }

  function telaMaterial(id) {
    var m = acha(C.materiais, id);
    if (!m) return telaMateriais();
    return '<div class="faixa ' + m.texto + (m.foraDoCodigo ? ' fora' : '') + '" style="background:' + m.cor + '">' +
        icone(m.simbolo) + '<h2>' + esc(m.nome) + '</h2>' +
        (m.foraDoCodigo ? '<p class="oquetem">' + esc(C.textos.foraDoCodigo) +
          '. Não é orgânico e não vai em lixeira comum.</p>' : '') + '</div>' +
      '<div class="blocos">' +
        campo('Como separar', m.separar, false, 'separar') +
        campo('Onde entregar', m.entregar, false, 'entregar') +
        blocoRende(m) +
        campo('Atenção', m.atencao, true, 'atencao') +
      '</div>' +
      blocoPontos(m.id);
  }

  /* ---------- quanto rende ---------- */
  var ESCALA = { baixo: 1, medio: 2, alto: 3 };
  function blocoRende(m) {
    if (!m.rende) return '';
    var n = ESCALA[m.valor] || 0;
    var barras = '';
    for (var i = 1; i <= 3; i++) {
      barras += '<i' + (i <= n ? ' class="cheia"' : '') + '></i>';
    }
    return '<section class="bloco rende">' +
      '<h3>' + esc(C.textos.valorRotulo) + '</h3>' +
      '<div class="medida" role="img" aria-label="Valor ' + esc(m.valor || 'não informado') + '">' +
        barras + '<span>' + esc(m.valor || '') + '</span></div>' +
      '<p>' + esc(m.rende) + '</p>' +
      '<p class="ressalva">' + esc(C.textos.valorAviso) + '</p></section>';
  }

  /* ---------- pontos de entrega da região ---------- */
  function blocoPontos(id) {
    var lista = (C.pontos || []).filter(function (p) {
      return p.recebe && p.recebe.indexOf(id) !== -1;
    });
    if (!lista.length) return '';
    return '<section class="pontos"><h3>' + icone('entregar', 'ic-bloco') + '<span>' + esc(C.textos.pontosRotulo) + '</span></h3>' +
      lista.map(function (p) {
        var mapa = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(p.endereco);
        return '<article class="ponto' + (p.exemplo ? ' exemplo' : '') + '">' +
          (p.exemplo ? '<span class="tarja">Exemplo — substituir</span>' : '') +
          '<h4>' + esc(p.nome) + '</h4>' +
          '<p>' + esc(p.endereco) + '</p>' +
          (p.horario ? '<p class="hora">' + esc(p.horario) + '</p>' : '') +
          (p.telefone ? '<a class="tel" href="tel:' + esc(p.telefone) + '">' + esc(p.telefone) + '</a>' : '') +
          '<a class="mapa" href="' + esc(mapa) + '" target="_blank" rel="noopener">Abrir no mapa</a>' +
          '</article>';
      }).join('') + '</section>';
  }

  function telaRiscos() {
    var itens = C.riscos.map(function (r) {
      return '<button class="risco" data-ir="#risco/' + r.id + '">' +
        icone(r.id, 'ic-risco') + '<span>' + esc(r.nome) + '</span>' + SETA + '</button>';
    }).join('');
    var epi = C.protecao.map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('');
    return '<h1 class="titulo-secao">' + esc(C.textos.modulo2) + '</h1>' +
      '<p class="sub-secao">O que cada material tem dentro e como manusear sem se machucar.</p>' +
      '<div class="riscos">' + itens + '</div>' +
      '<section class="protecao"><h3>Sempre que for trabalhar</h3><ul>' + epi + '</ul></section>' +
      '<div class="leitura"><button class="acao urgente" data-ir="#emergencia">' +
        esc(C.textos.emergencia) + '</button></div>';
  }

  function telaRisco(id) {
    var r = acha(C.riscos, id);
    if (!r) return telaRiscos();
    return '<div class="faixa" style="background:var(--laranja)">' +
        icone(r.id, 'ic-faixa') + '<h2>' + esc(r.nome) + '</h2>' +
        '<p class="oquetem">' + esc(r.oQueTem) + '</p></div>' +
      '<div class="blocos">' +
        campo('Como manusear', r.manusear, false, 'manusear') +
        campo('Atenção', r.alerta, true, 'atencao') +
        campo('Onde entregar', r.entregar, false, 'entregar') +
      '</div>' +
      blocoPontos(r.id);
  }

  function telaEmergencia() {
    var itens = (C.emergencia || []).map(function (e) {
      var ver = e.ver
        ? '<button class="link-ver" data-ir="' +
          ((e.ver.modulo === 'materiais' ? '#material/' : '#risco/') + e.ver.id) +
          '">Ver a ficha completa</button>'
        : '';
      return '<section class="socorro">' +
        '<h3>' + esc(e.nome) + '</h3>' +
        '<p class="agora"><b>Agora:</b> ' + esc(e.agora) + '</p>' +
        '<p class="procure"><b>Procure atendimento:</b> ' + esc(e.procure) + '</p>' +
        '<p class="nunca"><b>Nunca:</b> ' + esc(e.nunca) + '</p>' + ver +
        '</section>';
    }).join('');
    return '<h1 class="titulo-secao">' + esc(C.textos.emergencia) + '</h1>' +
      '<div class="urgencia">' +
        '<p>' + esc(C.textos.emergenciaAviso) + '</p>' +
        '<div class="fones"><a href="tel:192">SAMU 192</a><a href="tel:193">Bombeiros 193</a></div>' +
      '</div>' +
      '<div class="socorros">' + itens + '</div>';
  }

  function campo(rot, txt, perigo, iconeNome) {
    return '<section class="bloco' + (perigo ? ' perigo' : '') + '">' +
      '<h3>' + (iconeNome ? icone(iconeNome, 'ic-bloco') : '') + '<span>' + esc(rot) + '</span></h3>' +
      '<p>' + esc(txt) + '</p></section>';
  }

  /* ícone de cada etapa da trilha: usa o mesmo símbolo do material ou risco
     que ela apresenta (e.ver), a última etapa (verificação) tem ícone
     próprio, e uma etapa sem "ver" cai no ícone genérico. Nada aqui depende
     de posição fixa, então dá para reordenar etapas em conteudo.js à vontade. */
  function iconeEtapa(e) {
    if (e.id === C.trilha[C.trilha.length - 1].id) return 'verificacao';
    if (e.ver && e.ver.modulo === 'materiais') {
      var m = acha(C.materiais, e.ver.id);
      return m ? m.simbolo : 'generico';
    }
    if (e.ver && e.ver.modulo === 'riscos') return e.ver.id;
    return 'generico';
  }

  function telaTrilha() {
    var p = lerProgresso();
    var feitas = C.trilha.filter(function (e) { return p[e.id]; }).length;
    var pct = Math.round(feitas / C.trilha.length * 100);
    var itens = C.trilha.map(function (e, i) {
      var ok = p[e.id] ? '1' : '0';
      return '<button class="etapa" data-feita="' + ok + '" data-ir="#etapa/' + e.id + '">' +
        icone(iconeEtapa(e), 'ic-etapa') +
        '<span class="mk" aria-hidden="true">' + (ok === '1' ? '✓' : (i + 1)) + '</span>' +
        '<span class="tt">' + esc(e.titulo) + '</span></button>';
    }).join('');
    var fim = (feitas === C.trilha.length)
      ? '<div class="leitura"><button class="acao claro" data-ir="#concluido">Ver meu comprovante</button></div>' : '';
    return '<h1 class="titulo-secao">' + esc(C.textos.modulo3) + '</h1>' +
      '<p class="sub-secao">' + C.trilha.length + ' etapas curtas. O progresso fica salvo neste celular.</p>' +
      '<div class="barra"><i style="width:' + pct + '%"></i></div>' +
      '<p class="barra-rot">' + feitas + ' de ' + C.trilha.length + ' concluídas</p>' +
      '<div class="etapas">' + itens + '</div>' + fim;
  }

  function telaEtapa(id) {
    var e = acha(C.trilha, id);
    if (!e) return telaTrilha();
    /* a verificação é sempre a última etapa da trilha, não um id fixo:
       assim dá para acrescentar ou remover etapas em conteudo.js sem
       mexer aqui. */
    if (id === C.trilha[C.trilha.length - 1].id) return telaPerguntas();
    var ver = '';
    if (e.ver) {
      var alvo = (e.ver.modulo === 'materiais' ? '#material/' : '#risco/') + e.ver.id;
      ver = '<button class="link-ver" data-ir="' + alvo + '">Ver a ficha completa</button>';
    }
    return '<h1 class="titulo-secao com-icone">' + icone(iconeEtapa(e), 'ic-titulo') + '<span>' + esc(e.titulo) + '</span></h1>' +
      '<div class="leitura"><p>' + esc(e.texto) + '</p>' + ver +
      '<button class="acao" data-concluir="' + e.id + '">Marcar como lida</button></div>';
  }

  /* ---------- verificação final ---------- */
  var qAtual = 0, qAcertos = 0, qOrdem = [];

  function telaPerguntas(reiniciar) {
    if (reiniciar !== false) { qAtual = 0; qAcertos = 0; }
    return montaPergunta();
  }
  function montaPergunta() {
    var q = C.perguntas[qAtual];
    /* embaralha a ordem para a resposta certa não ficar sempre no mesmo lugar */
    qOrdem = q.opcoes.map(function (_, i) { return i; });
    for (var a = qOrdem.length - 1; a > 0; a--) {
      var b = Math.floor(Math.random() * (a + 1));
      var tmp = qOrdem[a]; qOrdem[a] = qOrdem[b]; qOrdem[b] = tmp;
    }
    var ops = qOrdem.map(function (real, pos) {
      return '<button class="opcao" data-resp="' + pos + '">' + esc(q.opcoes[real]) + '</button>';
    }).join('');
    return '<h1 class="titulo-secao com-icone">' + icone('verificacao', 'ic-titulo') + '<span>Verificação</span></h1>' +
      '<p class="sub-secao">Pergunta ' + (qAtual + 1) + ' de ' + C.perguntas.length + '</p>' +
      '<section class="pergunta"><h3>' + esc(q.p) + '</h3>' +
      '<div class="opcoes">' + ops + '</div><p class="retorno" id="retorno" role="status"></p></section>';
  }

  function responder(pos) {
    var q = C.perguntas[qAtual];
    var escolhida = qOrdem[pos];
    var bts = main.querySelectorAll('.opcao');
    for (var k = 0; k < bts.length; k++) {
      bts[k].disabled = true;
      if (qOrdem[k] === q.certa) bts[k].dataset.estado = 'certa';
      else if (k === pos) bts[k].dataset.estado = 'errada';
    }
    var certo = (escolhida === q.certa);
    if (certo) qAcertos++;
    var ret = document.getElementById('retorno');
    ret.textContent = certo ? 'Isso mesmo.' : 'A resposta certa está marcada em verde.';
    var b = document.createElement('button');
    b.className = 'acao';
    b.textContent = (qAtual < C.perguntas.length - 1) ? 'Próxima pergunta' : 'Ver resultado';
    b.addEventListener('click', function () {
      if (qAtual < C.perguntas.length - 1) { qAtual++; pinta(montaPergunta()); }
      else {
        var p = lerProgresso();
        p[C.trilha[C.trilha.length - 1].id] = true;
        p.acertos = qAcertos;
        p.total = C.perguntas.length;
        p.data = new Date().toLocaleDateString('pt-BR');
        salvarProgresso(p);
        irPara('#concluido');
      }
    });
    ret.parentNode.appendChild(b);
  }

  function telaConcluido() {
    var p = lerProgresso();
    var feitas = C.trilha.filter(function (e) { return p[e.id]; }).length;
    var total = C.trilha.length;
    var completo = (feitas === total);
    var acertos = (typeof p.acertos === 'number') ? p.acertos : qAcertos;
    var deQuantas = p.total || C.perguntas.length;
    var data = p.data || new Date().toLocaleDateString('pt-BR');

    var faltam = total - feitas;
    var pendencia = completo ? '' :
      '<p class="pendente">' + (faltam === 1 ? 'Falta 1 etapa da trilha.' : 'Faltam ' + faltam + ' etapas da trilha.') +
      '</p><button class="acao claro" data-ir="#trilha">Voltar para a trilha</button>';

    return '<div class="fim' + (completo ? ' com-festa' : '') + '">' +
      (completo ? confete() : '') +
      '<div class="selo' + (completo ? '' : ' parcial') + '">' +
        (completo ? icone('trofeu', 'selo-icone') : '') +
        '<h2>' + (completo ? 'Trilha concluída' : 'Verificação feita') + '</h2>' +
        '<p>' + acertos + ' de ' + deQuantas + ' na verificação</p>' +
        '<p class="selo-data">' + esc(data) + '</p>' +
        '<input id="nomePessoa" type="text" placeholder="Escreva seu nome" aria-label="Seu nome" value="' + esc(p.nome || '') + '">' +
      '</div>' +
      (completo ? '<p>Tire um print desta tela e envie ao responsável pela sua equipe.</p>' : pendencia) +
      '<button class="acao" data-ir="#inicio">Voltar ao início</button></div>';
  }

  /* confete simples: alguns quadradinhos com cor e destino aleatórios,
     só decorativo (aria-hidden) e sem repetição de nome entre pessoas —
     é uma comemoração pessoal, não um placar entre catadores ou equipes. */
  function confete() {
    var cores = ['#FF6019', '#00A99D', '#FFC629', '#5B2A86', '#0072BC'];
    var pedacos = '';
    for (var i = 0; i < 16; i++) {
      var tx = Math.round((Math.random() - 0.5) * 220) + 'px';
      var ty = Math.round(60 + Math.random() * 160) + 'px';
      var cor = cores[i % cores.length];
      var atraso = (Math.random() * 0.3).toFixed(2) + 's';
      pedacos += '<i style="--tx:' + tx + ';--ty:' + ty + ';background:' + cor +
        ';animation-delay:' + atraso + '"></i>';
    }
    return '<div class="confete" aria-hidden="true">' + pedacos + '</div>';
  }

  /* ---------- navegação ---------- */
  function acha(lista, id) {
    for (var i = 0; i < lista.length; i++) if (lista[i].id === id) return lista[i];
    return null;
  }
  function pinta(html) {
    main.innerHTML = html;
    main.focus();
    window.scrollTo(0, 0);
    /* reinicia a classe pra disparar a transição de entrada a cada troca de tela;
       @media (prefers-reduced-motion:reduce) já zera isso globalmente no CSS. */
    main.classList.remove('entra');
    void main.offsetWidth; /* força o navegador a "esquecer" o estado anterior */
    main.classList.add('entra');
  }
  function irPara(hash) {
    if (location.hash === hash) render(); else location.hash = hash;
  }

  function render() {
    var h = location.hash || '#inicio';
    var parte = h.split('/');
    var raiz = parte[0];
    var id = parte[1];

    btVoltar.hidden = (raiz === '#inicio');

    if (raiz === '#materiais') pinta(telaMateriais());
    else if (raiz === '#material') pinta(telaMaterial(id));
    else if (raiz === '#item') pinta(telaItem(id));
    else if (raiz === '#riscos') pinta(telaRiscos());
    else if (raiz === '#emergencia') pinta(telaEmergencia());
    else if (raiz === '#risco') pinta(telaRisco(id));
    else if (raiz === '#trilha') pinta(telaTrilha());
    else if (raiz === '#etapa') pinta(telaEtapa(id));
    else if (raiz === '#concluido') pinta(telaConcluido());
    else pinta(telaInicio());
  }

  document.addEventListener('click', function (ev) {
    var alvo = ev.target.closest('[data-ir]');
    if (alvo) { irPara(alvo.dataset.ir); return; }

    var conc = ev.target.closest('[data-concluir]');
    if (conc) {
      var p = lerProgresso(); p[conc.dataset.concluir] = true; salvarProgresso(p);
      irPara('#trilha'); return;
    }

    var op = ev.target.closest('.opcao');
    if (op && !op.disabled) { responder(Number(op.dataset.resp)); return; }

    if (ev.target.closest('#limpar')) {
      var q = document.getElementById('q');
      q.value = ''; pintaResultados(''); q.focus();
    }
  });

  /* busca enquanto digita e nome guardado no comprovante */
  document.addEventListener('input', function (ev) {
    if (ev.target.id === 'q') { pintaResultados(ev.target.value.trim()); return; }
    if (ev.target.id === 'nomePessoa') {
      var p = lerProgresso(); p.nome = ev.target.value.slice(0, 60); salvarProgresso(p);
    }
  });

  /* Voltar leva para a tela de cima, não para fora do app */
  var PAI = {
    '#materiais': '#inicio', '#material': '#materiais', '#item': '#materiais',
    '#riscos': '#inicio', '#risco': '#riscos', '#emergencia': '#riscos',
    '#trilha': '#inicio', '#etapa': '#trilha', '#concluido': '#trilha'
  };
  btVoltar.addEventListener('click', function () {
    var raiz = (location.hash || '#inicio').split('/')[0];
    irPara(PAI[raiz] || '#inicio');
  });
  document.getElementById('marca').addEventListener('click', function () { irPara('#inicio'); });

  window.addEventListener('hashchange', render);
  render();

  /* ---------- instalação no celular ---------- */
  var evtInstalar = null;
  var caixa = document.getElementById('instalar');
  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault(); evtInstalar = e;
    if (!localStorage.getItem('reciclalito.instalarNao')) { caixa.hidden = false; document.body.classList.add('com-convite'); }
  });
  document.getElementById('btInstalar').addEventListener('click', function () {
    caixa.hidden = true; document.body.classList.remove('com-convite');
    if (evtInstalar) { evtInstalar.prompt(); evtInstalar = null; }
  });
  document.getElementById('btInstalarNao').addEventListener('click', function () {
    caixa.hidden = true; document.body.classList.remove('com-convite');
    try { localStorage.setItem('reciclalito.instalarNao', '1'); } catch (e) {}
  });

  /* ---------- funcionamento sem internet ---------- */
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').catch(function () { /* segue sem cache */ });
    });
  }
})();
