import os, sys
# a raiz do site é a pasta acima desta
RAIZ = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
os.makedirs(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'capturas'), exist_ok=True)
CAP = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'capturas')

import http.server, socketserver, threading, functools, time, socket
from playwright.sync_api import sync_playwright
import tempfile, shutil
# copia o site para dentro de uma subpasta, imitando usuario.github.io/reciclalito/
TMP = tempfile.mkdtemp()
SIM = TMP
shutil.copytree(RAIZ, os.path.join(TMP, 'reciclalito'),
                ignore=shutil.ignore_patterns('testes','ferramentas','docs','.git'))
PORTA=8931
socketserver.TCPServer.allow_reuse_address=True
srv=socketserver.TCPServer(("127.0.0.1",PORTA), functools.partial(http.server.SimpleHTTPRequestHandler, directory=SIM))
threading.Thread(target=srv.serve_forever,daemon=True).start()
# simula https://usuario.github.io/reciclalito/
BASE=f"http://127.0.0.1:{PORTA}/reciclalito/"
ok,erros=[],[]
def v(c,m): (ok if c else erros).append(m)

with sync_playwright() as p:
    b=p.chromium.launch(); ctx=b.new_context(viewport={"width":390,"height":844}); pg=ctx.new_page()
    pg.on("pageerror", lambda e: erros.append(f"[pageerror] {e}"))
    pg.on("requestfailed", lambda r: erros.append(f"[404] {r.url}"))

    pg.goto(BASE, wait_until="networkidle")
    v("ONDE DESCARTO" in pg.inner_text("main").upper(), "subpasta: tela inicial carrega")
    pg.wait_for_function("navigator.serviceWorker.controller !== null", timeout=10000)
    v(True, "subpasta: service worker registra")
    esc=pg.evaluate("navigator.serviceWorker.getRegistration().then(r=>r.scope)")
    v(esc.endswith("/reciclalito/"), f"subpasta: escopo correto ({esc})")
    pg.wait_for_function("caches.open('reciclalito-v7').then(c=>c.keys()).then(k=>k.length>=10)", timeout=10000)
    n=pg.evaluate("caches.open('reciclalito-v7').then(c=>c.keys()).then(k=>k.length)")
    v(n>=10, f"subpasta: cache guardou {n} arquivos")

    man=pg.evaluate("fetch('manifest.json').then(r=>r.json())")
    v(man["start_url"]=="./index.html", "subpasta: manifest acessível")

    # modo avião
    srv.shutdown(); srv.server_close(); time.sleep(0.4)
    ctx.set_offline(True)
    t0=time.time(); pg.reload(wait_until="domcontentloaded", timeout=15000); dt=time.time()-t0
    v("ONDE DESCARTO" in pg.inner_text("main").upper(), f"subpasta: abre offline em {dt:.1f}s")
    pg.fill("#q","fralda"); pg.wait_for_timeout(250)
    v("Fralda" in pg.inner_text("#resultados"), "subpasta: busca funciona offline")
    b.close()
print("PASSOU:",len(ok))
for m in ok: print("  ok  -",m)
if erros:
    print("FALHOU:",len(erros))
    for m in dict.fromkeys(erros): print("  XX  -",m)
