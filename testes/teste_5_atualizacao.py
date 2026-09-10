import os, sys
# a raiz do site é a pasta acima desta
RAIZ = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
os.makedirs(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'capturas'), exist_ok=True)
CAP = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'capturas')

import http.server, socketserver, threading, functools, io, time, re
from playwright.sync_api import sync_playwright

PORTA=8913
Handler=functools.partial(http.server.SimpleHTTPRequestHandler, directory=RAIZ)
class NoCache(Handler.func):
    def end_headers(self):
        self.send_header("Cache-Control","no-store")
        super().end_headers()
socketserver.TCPServer.allow_reuse_address=True
srv=socketserver.TCPServer(("127.0.0.1",PORTA), functools.partial(NoCache, directory=RAIZ))
threading.Thread(target=srv.serve_forever,daemon=True).start()
BASE=f"http://127.0.0.1:{PORTA}/index.html"

orig_cont=io.open(os.path.join(RAIZ,"conteudo.js"),encoding="utf-8").read()
orig_sw=io.open(os.path.join(RAIZ,"sw.js"),encoding="utf-8").read()

def texto_modulo1(pg):
    return pg.inner_text("main").upper()

try:
    with sync_playwright() as p:
        b=p.chromium.launch(); ctx=b.new_context(viewport={"width":390,"height":844}); pg=ctx.new_page()
        pg.goto(BASE, wait_until="networkidle")
        pg.wait_for_function("navigator.serviceWorker.controller !== null", timeout=10000)
        pg.wait_for_timeout(800)
        print("antes:", "ONDE DESCARTO?" in texto_modulo1(pg))

        # --- a Papelito edita conteudo.js e ESQUECE de trocar a VERSAO ---
        novo=orig_cont.replace("modulo1: 'Onde descarto?'","modulo1: 'Onde jogo isso?'")
        io.open(os.path.join(RAIZ,"conteudo.js"),"w",encoding="utf-8").write(novo)

        pg.reload(wait_until="networkidle"); pg.wait_for_timeout(900)
        print("sem trocar VERSAO, 1o acesso:", "ONDE JOGO ISSO?" in texto_modulo1(pg), "(esperado False: entrega o cache na hora)")
        pg.reload(wait_until="networkidle"); pg.wait_for_timeout(900)
        print("sem trocar VERSAO, 2o acesso:", "ONDE JOGO ISSO?" in texto_modulo1(pg), "(esperado True: atualizou por tras)")

        # --- agora troca a VERSAO, como manda o LEIA-ME ---
        # a versão atual do sw.js não importa aqui: só precisa virar OUTRA string
        versao_atual = re.search(r"VERSAO = '([^']+)'", orig_sw).group(1)
        versao_nova = versao_atual + '-teste'
        io.open(os.path.join(RAIZ,"conteudo.js"),"w",encoding="utf-8").write(
            orig_cont.replace("modulo1: 'Onde descarto?'","modulo1: 'Onde ponho isso?'"))
        io.open(os.path.join(RAIZ,"sw.js"),"w",encoding="utf-8").write(
            orig_sw.replace(f"VERSAO = '{versao_atual}'", f"VERSAO = '{versao_nova}'"))

        pg.reload(wait_until="networkidle"); pg.wait_for_timeout(1500)
        pg.reload(wait_until="networkidle"); pg.wait_for_timeout(900)
        print("trocando a VERSAO:", "ONDE PONHO ISSO?" in texto_modulo1(pg), "(esperado True)")
        caches=pg.evaluate("caches.keys()")
        print("caches antigos limpos:", caches, f"(esperado so o {versao_nova})")
        b.close()
finally:
    io.open(os.path.join(RAIZ,"conteudo.js"),"w",encoding="utf-8").write(orig_cont)
    io.open(os.path.join(RAIZ,"sw.js"),"w",encoding="utf-8").write(orig_sw)
    srv.shutdown()
    print("arquivos restaurados")
