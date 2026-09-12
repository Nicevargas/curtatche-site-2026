#!/usr/bin/env python3
"""Gera o logo e o favicon do site a partir dos masters com transparencia.

Entradas: assets/marca/logo.png (1672x941, RGBA)
          assets/marca/favicon-master.png (a mao, 210x236, RGBA)
Saidas:   public/portfolio/logosite.webp
          public/favicon.png (96x96)
          public/apple-touch-icon.png (180x180)

Duas correcoes sao aplicadas ao master:

1. O recorte do fundo deixou o corpo do logo com alfa 252-253 em vez de 255,
   ou seja ~1% de transparencia em toda a arte. Sobre o preto do site isso
   escurece as bordas metalicas de leve. Alfa alto e normalizado para 255.
2. Ha 20px de largura e 9px de altura de margem transparente sobrando, que
   desalinhavam o logo dentro do cabecalho. A arte e recortada no seu bbox.

Uso:  python scripts/otimiza-logo.py
"""
from pathlib import Path

import numpy as np
from PIL import Image

RAIZ = Path(__file__).resolve().parent.parent
MASTER = RAIZ / "assets" / "marca" / "logo.png"
SAIDA = RAIZ / "public" / "portfolio" / "logosite.webp"
MASTER_ICONE = RAIZ / "assets" / "marca" / "favicon-master.png"
PUBLIC = RAIZ / "public"
# Icones sao quadrados; a mao e retrato, entao entra centrada num quadrado
# transparente em vez de ser esticada.
ICONES = {"favicon.png": 96, "apple-touch-icon.png": 180}

# O logo e exibido com no maximo 56px de altura (h-14 no cabecalho).
# 240px cobre telas de alta densidade com folga.
ALTURA_ALVO = 240
QUALIDADE = 90
# Acima disso o pixel e considerado opaco: cobre o alfa 250-254 do master
# sem tocar no antialias real das bordas.
LIMITE_OPACO = 245


def gerar_icones() -> None:
    with Image.open(MASTER_ICONE) as icone:
        icone = icone.convert("RGBA")
        caixa = icone.getbbox()
        if caixa:
            icone = icone.crop(caixa)

        for nome, lado in ICONES.items():
            arte = icone.copy()
            arte.thumbnail((lado, lado), Image.LANCZOS)
            quadro = Image.new("RGBA", (lado, lado), (0, 0, 0, 0))
            quadro.alpha_composite(
                arte, ((lado - arte.width) // 2, (lado - arte.height) // 2)
            )
            destino = PUBLIC / nome
            quadro.save(destino, "PNG", optimize=True)
            print(f"icone:     {nome}  {lado}x{lado}  {destino.stat().st_size / 1024:.1f} KB")


def main() -> None:
    with Image.open(MASTER) as img:
        img = img.convert("RGBA")
        original = img.size

        arr = np.array(img)
        alfa = arr[:, :, 3]
        quase_opacos = int((alfa >= LIMITE_OPACO).sum() - (alfa == 255).sum())
        arr[:, :, 3] = np.where(alfa >= LIMITE_OPACO, 255, alfa)
        img = Image.fromarray(arr, "RGBA")

        caixa = img.getbbox()
        if caixa:
            img = img.crop(caixa)
        recortado = img.size

        altura = min(ALTURA_ALVO, img.height)
        largura = round(img.width * altura / img.height)
        img = img.resize((largura, altura), Image.LANCZOS)

        SAIDA.parent.mkdir(parents=True, exist_ok=True)
        img.save(SAIDA, "WEBP", quality=QUALIDADE, method=6)

    print(f"master:    {original[0]}x{original[1]}  {MASTER.stat().st_size / 1024:.0f} KB")
    print(f"opacidade: {quase_opacos} pixels normalizados para alfa 255")
    print(f"recorte:   {recortado[0]}x{recortado[1]} (margem transparente removida)")
    print(
        f"saida:     {SAIDA.relative_to(RAIZ)}  {img.width}x{img.height}  "
        f"{SAIDA.stat().st_size / 1024:.1f} KB"
    )
    gerar_icones()


if __name__ == "__main__":
    main()
