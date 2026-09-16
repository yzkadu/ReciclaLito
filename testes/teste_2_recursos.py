import os, sys
# a raiz do site é a pasta acima desta
RAIZ = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
os.makedirs(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'capturas'), exist_ok=True)
CAP = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'capturas')

import http.server, socketserver, threading, functools, os
from playwright.sync_api import sync_playwright
PORTA=8921
socketserver.TCPServer.allow_reuse_address=True
srv=socketserver.TCPServer(("127.0.0.1",PORTA), functools.partial(http.server.SimpleHTTPRequestHandler, directory=RAIZ))
threading.Thread(target=srv.serve_forever,daemon=True).start()
BASE=f"http://127.0.0.1:{PORTA}/index.html"

ok,erros=[],[]
def v(c,m): (ok if c else erros).append(m)

with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={"width":390,"height":844},device_scale_factor=2)
    pg.on("pageerror", lambda e: erros.append(f"[pageerror] {e}"))
    pg.on("console", lambda m: erros.append(f"[console] {m.text}") if m.type=="error" else None)

    # ---- 1. busca na tela inicial ----
    pg.goto(BASE, wait_until="networkidle")
    v(pg.locator("#q").is_visible(), "busca aparece já na tela inicial")
    pg.fill("#q","isopor"); pg.wait_for_timeout(250)
    v("Isopor" in pg.inner_text("#resultados"), "busca funciona na tela inicial")
    v(pg.locator("#grade").is_hidden(), "módulos somem durante a busca")
    pg.screenshot(path=os.path.join(CAP,"inicio-busca.png"), full_page=True)
    pg.click("#limpar"); pg.wait_for_timeout(200)
    v(pg.locator("#grade").is_visible(), "limpar traz os módulos de volta")
    pg.screenshot(path=os.path.join(CAP,"inicio.png"), full_page=True)
    # busca do módulo 1 continua funcionando
    pg.goto(BASE+"#materiais", wait_until="networkidle")
    pg.fill("#q","pilha"); pg.wait_for_timeout(250)
    v("Pilha" in pg.inner_text("#resultados"), "busca do módulo 1 segue funcionando")

    # ---- 2. óleo fora do código de cores ----
    pg.goto(BASE+"#materiais", wait_until="networkidle"); pg.wait_for_timeout(200)
    v(pg.locator(".material.fora").count()==1, "só o óleo é marcado fora do código")
    v("FORA DO CÓDIGO" in pg.inner_text(".material.fora").upper(), "o quadrado do óleo avisa")
    pg.goto(BASE+"#material/oleo", wait_until="networkidle"); pg.wait_for_timeout(200)
    t=pg.inner_text("main").upper()
    v("NÃO É ORGÂNICO" in t, "ficha do óleo desfaz a confusão com marrom")
    pg.screenshot(path=os.path.join(CAP,"material-oleo.png"), full_page=True)
    pg.goto(BASE+"#etapa/t2", wait_until="networkidle"); pg.wait_for_timeout(200)
    t2=pg.inner_text("main").upper()
    v("CINZA É REJEITO" in t2, "trilha t2 ensina o cinza")
    v("ÓLEO DE COZINHA NÃO TEM COR" in t2, "trilha t2 avisa da exceção do óleo")

    # ---- 3. quanto rende ----
    pg.goto(BASE+"#material/metal", wait_until="networkidle"); pg.wait_for_timeout(200)
    t=pg.inner_text("main").upper()
    v("QUANTO RENDE" in t, "ficha mostra quanto rende")
    v("ALTO" in t, "metal marcado como valor alto")
    v("PREÇO MUDA TODA SEMANA" in t, "ressalva de preço aparece")
    v(pg.locator("#principal .medida i.cheia").count()==3, "metal com 3 barras cheias")
    pg.goto(BASE+"#material/vidro", wait_until="networkidle"); pg.wait_for_timeout(200)
    v(pg.locator("#principal .medida i.cheia").count()==1, "vidro com 1 barra cheia")
    pg.screenshot(path=os.path.join(CAP,"material-metal.png"), full_page=True)

    # ---- 4. deu errado ----
    pg.goto(BASE+"#riscos", wait_until="networkidle"); pg.wait_for_timeout(200)
    v(pg.locator(".acao.urgente").is_visible(), "botão de emergência no fim do módulo 2")
    pg.locator(".acao.urgente").click(); pg.wait_for_timeout(300)
    v(pg.evaluate("location.hash")=="#emergencia", "botão leva para a emergência")
    t=pg.inner_text("main").upper()
    v("SAMU 192" in t and "BOMBEIROS 193" in t, "telefones de urgência aparecem")
    v("NÃO SUBSTITUI ATENDIMENTO" in t, "aviso de que não substitui atendimento")
    v(pg.locator(".socorro").count()==6, "seis situações de emergência")
    v("ESPETOU AGULHA" in t, "inclui acidente com agulha")
    v(pg.locator('a[href="tel:192"]').is_visible(), "o 192 é clicável")
    pg.screenshot(path=os.path.join(CAP,"emergencia.png"), full_page=True)
    pg.locator("#voltar").click(); pg.wait_for_timeout(250)
    v(pg.evaluate("location.hash")=="#riscos", "voltar da emergência vai para o módulo 2")

    b.close()
srv.shutdown()
print("PASSOU:",len(ok))
for m in ok: print("  ok  -",m)
if erros:
    print("\nFALHOU:",len(erros))
    for m in dict.fromkeys(erros): print("  XX  -",m)
