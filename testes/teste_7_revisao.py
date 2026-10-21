"""Regressão: voltar à aula consultada e retomar a verificação sem perder respostas."""
import os, functools, http.server, socketserver, threading
from playwright.sync_api import sync_playwright
RAIZ=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
class Silencioso(http.server.SimpleHTTPRequestHandler):
    def log_message(self,*args): pass
socketserver.TCPServer.allow_reuse_address=True
srv=socketserver.TCPServer(('127.0.0.1',8941),functools.partial(Silencioso,directory=RAIZ))
threading.Thread(target=srv.serve_forever,daemon=True).start()
base='http://127.0.0.1:8941/index.html'
ok=0
with sync_playwright() as p:
    b=p.chromium.launch()
    ctx=b.new_context(viewport={'width':390,'height':844},reduced_motion='reduce')
    pg=ctx.new_page()
    def rota(h): pg.wait_for_function('(h)=>location.hash===h',arg=h)
    pg.goto(base+'#trilha',wait_until='networkidle')
    pg.locator('[data-ir="#etapa/t5"]').click();rota('#etapa/t5')
    pg.get_by_role('button',name='Consultar a ficha do material').click();rota('#material/eletronico')
    pg.locator('#voltar').click();rota('#etapa/t5');ok+=1
    pg.locator('.etapa-navegacao [data-ir="#etapa/t6"]').first.click();rota('#etapa/t6')
    pg.locator('#voltar').click();rota('#etapa/t5');ok+=1
    pg.go_forward();rota('#etapa/t6');ok+=1
    pg.locator('#marca').click();rota('#inicio')
    pg.locator('[data-ir="#trilha"]').click();rota('#trilha')
    pg.get_by_role('button',name='Continuar de onde parei').click();rota('#etapa/t6');ok+=1
    pg.goto(base+'#etapa/t8')
    pg.locator('.opcao').filter(has_text='Azul').click()
    pg.get_by_role('button',name='Próxima pergunta').click()
    assert 'Pergunta 2 de' in pg.inner_text('main')
    pg.locator('.opcao').first.click()
    retorno=pg.locator('#retorno').inner_text()
    salvo=pg.evaluate("JSON.parse(localStorage.getItem('reciclalito.trilha')).quiz")
    pg.locator('#marca').click();rota('#inicio')
    pg.go_back();rota('#etapa/t8')
    assert 'Pergunta 2 de' in pg.inner_text('main')
    assert pg.locator('#retorno').inner_text()==retorno
    assert pg.locator('.opcao:disabled').count()==pg.locator('.opcao').count()
    assert pg.evaluate("JSON.parse(localStorage.getItem('reciclalito.trilha')).quiz")==salvo
    ok+=1
    pg.reload(wait_until='networkidle')
    assert pg.locator('#retorno').inner_text()==retorno;ok+=1
    pg.get_by_role('button',name='Próxima pergunta').click()
    assert 'Pergunta 3 de' in pg.inner_text('main');ok+=1
    pg.goto(base+'#inicio')
    pg.wait_for_function('navigator.serviceWorker.controller !== null')
    ctx.set_offline(True)
    pg.reload(wait_until='domcontentloaded')
    pg.locator('.selos-grade img[alt="FSC"]').scroll_into_view_if_needed()
    pg.wait_for_function("document.querySelector('img[alt=FSC]').naturalWidth>0");ok+=1
    ctx.set_offline(False)
    for rota_,nome in [('#inicio','revisao-inicio'),('#riscos','revisao-seguranca'),('#etapa/t5','revisao-etapa')]:
        pg.goto(base+rota_,wait_until='networkidle')
        pg.screenshot(path=os.path.join(RAIZ,'testes/capturas/'+nome+'.png'),full_page=True)
    b.close()
srv.shutdown()
print('PASSOU:',ok)
print('FALHOU: 0')
