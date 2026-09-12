#!/usr/bin/env python3
"""Converte os prints de portfolio para WebP na largura em que sao exibidos.

Os originais sao prints de pagina inteira (ate 1920x11160). A altura e intencional:
as molduras de notebook/celular animam a rolagem da imagem. Por isso aqui se
redimensiona pela largura e se recomprime, sem recortar.

Uso:  python scripts/optimize-images.py
Entrada:  assets/portfolio-originais/   (fora do git, ver .gitignore)
Saida:    public/portfolio/*.webp
"""
from pathlib import Path
from PIL import Image

Image.MAX_IMAGE_PIXELS = None          # prints longos passam do limite padrao
WEBP_MAX_DIM = 16383                   # limite do formato

RAIZ = Path(__file__).resolve().parent.parent
ORIGINAIS = RAIZ / "assets" / "portfolio-originais"
SAIDA = RAIZ / "public" / "portfolio"

# *_cel  = mock de celular, exibido com ~420px
# demais = mock de desktop, exibido com ~960px (1280 cobre telas retina)
# O logo nao entra aqui: tem transparencia e master proprio, ver scripts/otimiza-logo.py
PERFIS: dict[str, tuple[int, int]] = {}
LARGURA_DESKTOP, Q_DESKTOP = 1280, 78
LARGURA_MOBILE, Q_MOBILE = 420, 80


def perfil(nome: str) -> tuple[int, int]:
    if nome in PERFIS:
        return PERFIS[nome]
    if nome.endswith("_cel"):
        return LARGURA_MOBILE, Q_MOBILE
    return LARGURA_DESKTOP, Q_DESKTOP


def main() -> None:
    SAIDA.mkdir(parents=True, exist_ok=True)
    arquivos = sorted(
        p for p in ORIGINAIS.iterdir()
        if p.suffix.lower() in {".png", ".jpg", ".jpeg", ".webp"}
    )
    if not arquivos:
        raise SystemExit(f"Nenhum original em {ORIGINAIS}")

    antes = depois = 0
    for src in arquivos:
        largura, qualidade = perfil(src.stem)
        with Image.open(src) as img:
            img = img.convert("RGB")
            if img.width > largura:                      # nunca ampliar
                altura = round(img.height * largura / img.width)
                img = img.resize((largura, altura), Image.LANCZOS)
            if max(img.size) > WEBP_MAX_DIM:
                raise SystemExit(f"{src.name}: {img.size} passa do limite do WebP")
            dst = SAIDA / f"{src.stem}.webp"
            img.save(dst, "WEBP", quality=qualidade, method=6)
            largura_final, altura_final = img.size

        o, n = src.stat().st_size, dst.stat().st_size
        antes, depois = antes + o, depois + n
        print(f"{src.name:<22} {o/1048576:6.2f} MB -> {n/1024:7.1f} KB  "
              f"({largura_final}x{altura_final}, -{100 - n / o * 100:.1f}%)")

    print(f"\nTotal: {antes/1048576:.2f} MB -> {depois/1048576:.2f} MB "
          f"(-{100 - depois / antes * 100:.1f}%)")


if __name__ == "__main__":
    main()
