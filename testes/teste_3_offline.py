import os, sys
# a raiz do site é a pasta acima desta
RAIZ = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
os.makedirs(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'capturas'), exist_ok=True)
CAP = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'capturas')

import http.server, socketserver, threading, functools, os
from playwright.sync_api import sync_playwright

PORTA = 8911
Handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=RAIZ)
socketserver.TCPServer.allow_reuse_address = True
srv = socketserver.TCPServer(("127.0.0.1", PORTA), Handler)
threading.Thread(target=srv.serve_forever, daemon=True).start()
BASE = f"http://127.0.0.1:{PORTA}/index.html"

ok, erros = [], []
def v(c, m): (ok if c else erros).append(m)

with sync_playwright() as p:
    b = p.chromium.launch()
    ctx = b.new_context(viewport={"width": 390, "height": 844})
    pg = ctx.new_page()

    # ---- primeiro acesso, com internet ----
    pg.goto(BASE, wait_until="networkidle")
    pg.wait_for_function("navigator.serviceWorker.controller !== null", timeout=10000)
    # espera o cache terminar de encher
    pg.wait_for_function(
        "caches.open('reciclalito-v15').then(c=>c.keys()).then(k=>k.length>=10)", timeout=10000)
    n = pg.evaluate("caches.open('reciclalito-v15').then(c=>c.keys()).then(k=>k.length)")
    v(n >= 10, f"cache guardou {n} arquivos no primeiro acesso")

    # ---- MODO AVIÃO ----
    ctx.set_offline(True)
    srv.shutdown()          # derruba o servidor de vez: nada de rede mesmo

    pg.reload(wait_until="domcontentloaded")
    pg.wait_for_timeout(800)
    txt = pg.inner_text("main").upper()
    v("ONDE DESCARTO" in txt, "OFFLINE: tela inicial abre depois de recarregar")
    v("SEGURANÇA DO CATADOR" in txt, "OFFLINE: os três módulos aparecem")
    v(pg.evaluate("document.fonts.check('16px Beastly')"), "OFFLINE: fonte da marca carrega do cache")

    pg.locator('[data-ir="#materiais"]').click(); pg.wait_for_timeout(300)
    pg.fill("#q", "fralda"); pg.wait_for_timeout(250)
    v("Fralda" in pg.inner_text("#resultados"), "OFFLINE: a busca funciona")
    pg.locator(".achado").first.click(); pg.wait_for_timeout(300)
    v("LIXO COMUM" in pg.inner_text("main").upper(), "OFFLINE: abre a resposta do item")

    pg.goto(BASE + "#risco/lampadas", wait_until="domcontentloaded"); pg.wait_for_timeout(400)
    v("MERCÚRIO" in pg.inner_text("main").upper(), "OFFLINE: ficha de risco abre por link direto")

    pg.goto(BASE + "#etapa/t1", wait_until="domcontentloaded"); pg.wait_for_timeout(400)
    pg.locator("[data-concluir]").click(); pg.wait_for_timeout(400)
    v("1 de 8" in pg.inner_text(".barra-rot"), "OFFLINE: progresso da trilha grava no aparelho")

    pg.screenshot(path=os.path.join(CAP,"offline.png"), full_page=True)
    b.close()

print("PASSOU:", len(ok))
for m in ok: print("  ok  -", m)
if erros:
    print("\nFALHOU:", len(erros))
    for m in erros: print("  XX  -", m)
