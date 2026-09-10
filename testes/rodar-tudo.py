"""Roda as cinco baterias de teste e resume o resultado.

    cd testes && python3 rodar-tudo.py

Sai com código 1 se qualquer teste falhar, para dar para usar em CI.
"""
import subprocess, sys, os, glob, re

AQUI = os.path.dirname(os.path.abspath(__file__))
arquivos = sorted(glob.glob(os.path.join(AQUI, 'teste_*.py')))

total_ok, total_erro, quebrados = 0, 0, []

for caminho in arquivos:
    nome = os.path.basename(caminho)
    print('=' * 60)
    print(nome)
    print('=' * 60)
    r = subprocess.run([sys.executable, caminho], capture_output=True, text=True, cwd=AQUI)
    saida = r.stdout + r.stderr
    # o servidor de teste registra cada requisição; não interessa aqui
    saida = '\n'.join(l for l in saida.splitlines() if '127.0.0.1 - -' not in l)
    print(saida.strip())
    print()

    m = re.search(r'^PASSOU:\s*(\d+)', saida, re.M)
    n = re.search(r'^FALHOU:\s*(\d+)', saida, re.M)
    if m: total_ok += int(m.group(1))
    if n: total_erro += int(n.group(1))
    if r.returncode != 0:
        quebrados.append(nome)

print('=' * 60)
print(f'RESUMO: {total_ok} verificações passaram, {total_erro} falharam')
if quebrados:
    print('scripts que quebraram:', ', '.join(quebrados))
print('=' * 60)

sys.exit(1 if (total_erro or quebrados) else 0)
