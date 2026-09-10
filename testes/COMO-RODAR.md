# Como rodar os testes

```bash
cd testes
python3 rodar-tudo.py
```

Se faltar o navegador:

```bash
pip install playwright
playwright install chromium
```

Cada script também roda sozinho, por exemplo `python3 teste_3_offline.py`.
As capturas de tela caem em `testes/capturas/`, que está no `.gitignore`.

| Script | O que verifica |
|---|---|
| `teste_1_navegacao.py` | Rotas, busca, embaralhamento do gabarito, comprovante, botão voltar. |
| `teste_2_recursos.py` | Busca na tela inicial, óleo fora do código de cores, quanto rende, pontos de entrega, tela de emergência. |
| `teste_3_offline.py` | Modo avião depois do primeiro acesso. |
| `teste_4_subpasta.py` | Deploy em subpasta, como acontece no GitHub Pages. |
| `teste_5_atualizacao.py` | Se editar o conteúdo chega no celular, com e sem trocar a `VERSAO`. |

## Duas armadilhas

Já custaram tempo neste projeto:

1. **Navegar para o mesmo hash não redispara a renderização.** `pg.goto(BASE + "#x")`
   estando já em `#x` é navegação no mesmo documento: o script não roda de novo e a
   tela não muda. Passe por outra rota antes.
2. **`inner_text` devolve o texto com `text-transform` já aplicado.** Títulos com
   `uppercase` voltam em caixa alta. Compare com `.upper()` dos dois lados.

Quando um teste falhar, confira essas duas antes de concluir que o app quebrou.
