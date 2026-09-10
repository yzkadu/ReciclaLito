import base64, io, re, os

APP = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
def ler(p): return io.open(os.path.join(APP, p), encoding='utf-8').read()
def b64(p):
    with open(os.path.join(APP, p), 'rb') as f:
        return base64.b64encode(f.read()).decode()

css = ler('estilo.css')
css = css.replace('url("fontes/ultra.woff2")',   'url(data:font/woff2;base64,%s)' % b64('fontes/ultra.woff2'))
css = css.replace('url("fontes/archivo.woff2")', 'url(data:font/woff2;base64,%s)' % b64('fontes/archivo.woff2'))

conteudo = ler('conteudo.js')

app = ler('app.js')
# a prévia roda dentro de um quadro sem service worker e sem armazenamento do navegador:
# o progresso vale só enquanto a aba estiver aberta.
app = re.sub(r"\n  /\* ---------- funcionamento sem internet ---------- \*/.*?\n  }\n", "\n", app, flags=re.S)
# a barra "Instalar" não existe na prévia, então o código que a controla sai junto
app = re.sub(r"\n  /\* ---------- instalação no celular ---------- \*/.*?(?=\}\)\(\);)", "\n", app, flags=re.S)
app = re.sub(r"\blocalStorage\b", "MEMORIA", app)

shim = """
/* Prévia: guarda o progresso na memória da aba, não no aparelho.
   Na versão publicada isto é o localStorage de verdade. */
var MEMORIA = (function () {
  var d = {};
  return {
    getItem: function (k) { return Object.prototype.hasOwnProperty.call(d, k) ? d[k] : null; },
    setItem: function (k, v) { d[k] = String(v); },
    removeItem: function (k) { delete d[k]; }
  };
})();
"""

html = ler('index.html')
html = html.replace('<link rel="manifest" href="manifest.json">\n', '')
html = html.replace('<link rel="apple-touch-icon" href="icones/apple-touch-icon.png">\n', '')
html = html.replace('<link rel="stylesheet" href="estilo.css">',
                    '<style>\n' + css + '\n</style>')
html = html.replace('<script src="conteudo.js"></script>\n<script src="app.js"></script>',
                    '<script>\n' + shim + '\n' + conteudo + '\n' + app + '\n</script>')
# o convite de instalação só faz sentido no site publicado
html = re.sub(r'<div class="instalar".*?</div>\n', '', html, flags=re.S)
html = html.replace('<title>ReciclaLito</title>', '<title>ReciclaLito — prévia</title>')

saida = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'reciclalito-previa.html')
io.open(saida, 'w', encoding='utf-8').write(html)
print('gerado:', saida, round(os.path.getsize(saida) / 1024), 'KB')
