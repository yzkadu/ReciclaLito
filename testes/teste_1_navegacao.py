import os, sys
# a raiz do site é a pasta acima desta
RAIZ = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
os.makedirs(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'capturas'), exist_ok=True)
CAP = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'capturas')

import http.server, socketserver, threading, functools, os, sys
from playwright.sync_api import sync_playwright

PORTA = 8901

Handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=RAIZ)
socketserver.TCPServer.allow_reuse_address = True
srv = socketserver.TCPServer(("127.0.0.1", PORTA), Handler)
threading.Thread(target=srv.serve_forever, daemon=True).start()
BASE = f"http://127.0.0.1:{PORTA}/index.html"

erros, ok = [], []
def v(cond, msg):
    (ok if cond else erros).append(msg)

with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={"width": 390, "height": 844}, device_scale_factor=2)
    pg.on("pageerror", lambda e: erros.append(f"[pageerror] {e}"))
    pg.on("console", lambda m: erros.append(f"[console.error] {m.text}") if m.type == "error" else None)
    pg.on("requestfailed", lambda r: erros.append(f"[falha] {r.url}"))

    # ---------- BUSCA ----------
    pg.goto(BASE + "#materiais", wait_until="networkidle")
    pg.screenshot(path=os.path.join(CAP,"materiais-com-busca.png"), full_page=True)

    testes = [
        ("isopor", "Isopor", "Depende"),
        ("ISOPÓR", "Isopor", None),          # acento e maiúscula
        ("fralda", "Fralda", "Rejeito"),
        ("latinha", "Latinha", "Metal"),
        ("pilha", "Pilha", "Perigoso"),
        ("caixa papelao", "Caixa de papelão", None),  # duas palavras, sem acento
        ("espelho", "Espelho", "Rejeito"),
        ("remedio", "Remédio", "Farmácia"),
    ]
    for termo, esperado, chip in testes:
        pg.fill("#q", termo); pg.wait_for_timeout(150)
        txt = pg.inner_text("#resultados")
        v(esperado.split()[0] in txt, f'busca "{termo}" acha "{esperado}"')
        if chip:
            v(chip in txt, f'busca "{termo}" mostra destino "{chip}"')

    pg.fill("#q", "isopor"); pg.wait_for_timeout(200)
    pg.screenshot(path=os.path.join(CAP,"busca-resultado.png"), full_page=True)

    pg.fill("#q", "xyzabc"); pg.wait_for_timeout(150)
    v("Nada encontrado" in pg.inner_text("#resultados"), "busca sem resultado mostra aviso")
    v(pg.locator("#grade").is_hidden(), "grade some enquanto busca")

    pg.click("#limpar"); pg.wait_for_timeout(150)
    v(pg.locator("#grade").is_visible(), "botão limpar traz a grade de volta")
    v(pg.input_value("#q") == "", "botão limpar esvazia o campo")

    # item sem ficha própria abre tela de resposta
    pg.fill("#q", "fralda"); pg.wait_for_timeout(150)
    pg.locator(".achado").first.click(); pg.wait_for_timeout(300)
    v(pg.evaluate("location.hash").startswith("#item/"), "item de rejeito abre tela própria")
    v("LIXO COMUM" in pg.inner_text("main").upper(), "tela do item mostra a resposta")
    pg.screenshot(path=os.path.join(CAP,"item-fralda.png"), full_page=True)

    # item com ficha vai direto para a ficha
    pg.goto(BASE + "#materiais", wait_until="networkidle")
    pg.fill("#q", "latinha"); pg.wait_for_timeout(150)
    pg.locator(".achado").first.click(); pg.wait_for_timeout(300)
    v(pg.evaluate("location.hash") == "#material/metal", "item com ficha vai para a ficha do material")

    # ---------- VOLTAR ----------
    pg.locator("#voltar").click(); pg.wait_for_timeout(250)
    v(pg.evaluate("location.hash") == "#materiais", "voltar da ficha vai para a lista")
    pg.locator("#voltar").click(); pg.wait_for_timeout(250)
    v(pg.evaluate("location.hash") == "#inicio", "voltar da lista vai para o início")

    # ---------- QUIZ EMBARALHADO ----------
    posicoes = set()
    for _ in range(12):
        pg.goto(BASE + "#inicio", wait_until="domcontentloaded")
        pg.goto(BASE + "#etapa/t6", wait_until="domcontentloaded")
        pg.wait_for_selector(".opcao")
        ops = pg.locator(".opcao").all_inner_texts()
        posicoes.add(ops.index("Azul"))
    v(len(posicoes) > 1, f"opções embaralham (resposta certa apareceu nas posições {sorted(posicoes)})")

    # ---------- COMPROVANTE HONESTO ----------
    pg.evaluate("localStorage.clear()")
    pg.goto(BASE + "#etapa/t6", wait_until="networkidle")
    for i in range(6):
        certa = pg.locator('.opcao').nth(0)
        # acha a opção certa de verdade pelo texto
        gabarito = ["Azul", "Descascar com alicate", "Não, vira rejeito",
                    "Arejar o lugar e recolher com luva e papelão",
                    "Em garrafa PET fechada, no ponto de coleta",
                    "Isolada longe de papel e levada ao ponto de coleta"][i]
        pg.get_by_role("button", name=gabarito, exact=True).click()
        pg.wait_for_timeout(120)
        pg.locator("section.pergunta button.acao").click()
        pg.wait_for_timeout(250)

    texto = pg.inner_text("main").upper()
    v("VERIFICAÇÃO FEITA" in texto, "comprovante NÃO mente dizendo trilha concluída")
    v("6 DE 6" in texto, "comprovante mostra o placar certo")
    v("FALTAM 5 ETAPAS" in texto, "comprovante avisa quantas etapas faltam")
    pg.screenshot(path=os.path.join(CAP,"comprovante-parcial.png"), full_page=True)

    # nome persiste
    pg.fill("#nomePessoa", "Maria da Silva"); pg.wait_for_timeout(200)
    pg.goto(BASE + "#inicio", wait_until="networkidle")
    pg.goto(BASE + "#concluido", wait_until="networkidle")
    v(pg.input_value("#nomePessoa") == "Maria da Silva", "nome do comprovante fica salvo")
    v("6 DE 6" in pg.inner_text("main").upper(), "placar sobrevive ao recarregar a página")

    # trilha completa -> comprovante completo
    pg.evaluate("localStorage.setItem('reciclalito.trilha', JSON.stringify({t1:1,t2:1,t3:1,t4:1,t5:1,t6:1,acertos:5,total:6,data:'08/09/2026',nome:'Maria da Silva'}))")
    pg.goto(BASE + "#inicio", wait_until="networkidle")
    pg.goto(BASE + "#concluido", wait_until="networkidle")
    v("TRILHA CONCLUÍDA" in pg.inner_text("main").upper(), "trilha completa mostra comprovante cheio")
    pg.screenshot(path=os.path.join(CAP,"comprovante-completo.png"), full_page=True)

    b.close()
srv.shutdown()

print("PASSOU:", len(ok))
for m in ok: print("  ok  -", m)
print("\nFALHOU:", len(erros))
for m in dict.fromkeys(erros): print("  XX  -", m)
