"""Regressões do guia interno, navegação, acessibilidade básica e responsividade."""
import os, functools, http.server, socketserver, threading
from playwright.sync_api import sync_playwright
RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
class Silencioso(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *args): pass
socketserver.TCPServer.allow_reuse_address = True
srv=socketserver.TCPServer(('127.0.0.1',8940),functools.partial(Silencioso,directory=RAIZ))
threading.Thread(target=srv.serve_forever,daemon=True).start()
base='http://127.0.0.1:8940/index.html'
ok, erros=[],[]
def v(c,m): (ok if c else erros).append(m)
with sync_playwright() as p:
    b=p.chromium.launch()
    ctx=b.new_context(viewport={'width':1440,'height':1000},reduced_motion='reduce')
    pg=ctx.new_page()
    pg.on('pageerror',lambda e:erros.append(str(e)))
    pg.goto(base+'#inicio',wait_until='networkidle')
    pg.evaluate("document.querySelectorAll('main img').forEach(i => i.loading = 'eager')")
    pg.wait_for_function("Array.from(document.querySelectorAll('main img')).every(i => i.complete && i.naturalWidth > 0)")
    v(True, 'todos os ativos oficiais da marca carregam localmente')
    pg.screenshot(path=os.path.join(RAIZ,'testes/capturas/novo-desktop.png'),full_page=True)
    v(pg.locator('.ponto-interno').count()==2,'dois pontos internos confirmados')
    v('FSC' not in pg.inner_text('main'),'FSC não publicado sem conteúdo aprovado')
    v(pg.locator('.abertura-foto img').evaluate('(i)=>i.complete && i.naturalWidth>0'),'foto local carregada')
    for termo,hash_esperado in [('bituca','#material/bitucas'),('pilha','#risco/baterias'),('eletrônico','#material/eletronico')]:
        pg.goto(base+'#inicio');pg.wait_for_function("document.body.dataset.tela === 'inicio'");pg.fill('#q',termo);pg.locator('.achado').first.click()
        pg.wait_for_function('(h)=>location.hash===h',arg=hash_esperado)
        v(pg.evaluate('location.hash')==hash_esperado,'busca '+termo+' abre ficha')
        if termo=='bituca':
            texto=pg.inner_text('main')
            v('Poiato Recicla' in texto and 'Financeiro' not in texto,'bitucas: parceria e nenhuma localização inventada')
        else:
            v('Financeiro' in pg.inner_text('main') and 'Marketing' in pg.inner_text('main'),'pontos internos na ficha '+termo)
    pg.goto(base+'#inicio')
    for largura in [320,360,375,390,430,580,768,1024,1280,1440,1920]:
        pg.set_viewport_size({'width':largura,'height':900})
        v(pg.evaluate('document.documentElement.scrollWidth <= innerWidth'),'início sem overflow em '+str(largura))
    pg.set_viewport_size({'width':390,'height':844})
    pg.screenshot(path=os.path.join(RAIZ,'testes/capturas/novo-mobile.png'),full_page=True)
    pg.set_viewport_size({'width':320,'height':844})
    for rota in ['#materiais','#riscos','#trilha','#material/bitucas','#material/eletronico','#risco/baterias','#etapa/t5','#emergencia']:
        pg.goto(base+rota)
        v(pg.evaluate('document.documentElement.scrollWidth <= innerWidth'),rota+' sem overflow em 320')
    pg.goto(base+'#inicio')
    pg.evaluate("document.documentElement.style.fontSize='200%'")
    v(pg.evaluate('document.documentElement.scrollWidth <= innerWidth'),'sem overflow com texto ampliado')
    pg.evaluate("document.documentElement.style.fontSize=''")
    pg.goto(base+'#inicio')
    pg.keyboard.press('Tab')
    v(pg.locator('.pular').count()==1,'link de pular conteúdo mantido')
    pg.wait_for_function('navigator.serviceWorker.controller !== null')
    ctx.set_offline(True)
    pg.goto(base+'#material/bitucas',wait_until='domcontentloaded')
    v('Poiato Recicla' in pg.inner_text('main'),'nova ficha de bitucas funciona offline')
    pg.goto(base+'#risco/baterias',wait_until='domcontentloaded')
    v('Financeiro' in pg.inner_text('main'),'pontos internos funcionam offline')
    b.close()
srv.shutdown()
print('PASSOU:',len(ok))
for m in ok: print('  ok -',m)
print('FALHOU:',len(erros))
for m in erros: print('  XX -',m)
raise SystemExit(bool(erros))
