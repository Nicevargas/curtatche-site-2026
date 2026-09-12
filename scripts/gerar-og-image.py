#!/usr/bin/env python3
"""Gera a imagem de compartilhamento (Open Graph, 1200x630).

E o que aparece quando o link de curtatche.com.br e colado no WhatsApp,
LinkedIn, Facebook ou X. Hoje o preview sai em branco porque o site nao tem
nenhuma tag og:.

Cores e tipografia seguem o site: preto, azul #3b82f6 e violeta #8b5cf6,
titulo em peso extra e caixa alta.

Uso:  python scripts/gerar-og-image.py
Saida: public/og-image.jpg
"""
from pathlib import Path
from PIL import Image, ImageChops, ImageDraw, ImageFilter, ImageFont

RAIZ = Path(__file__).resolve().parent.parent
LOGO = RAIZ / "public" / "portfolio" / "logosite.webp"
SAIDA = RAIZ / "public" / "og-image.jpg"

L, A = 1200, 630
AZUL, VIOLETA, BRANCO, CINZA = "#3b82f6", "#8b5cf6", "#ffffff", "#a3a3a3"

# Arial Black e o substituto mais proximo do Montserrat ExtraBold do site.
FONTES = {
    "titulo": "C:/Windows/Fonts/ariblk.ttf",
    "corpo": "C:/Windows/Fonts/arialbd.ttf",
}


def fonte(tipo: str, tam: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(FONTES[tipo], tam)


def brilho(base: Image.Image, centro, raio: int, cor: str, opacidade: int) -> None:
    """Mancha radial difusa, como os divs de blur do site."""
    camada = Image.new("RGBA", base.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(camada)
    x, y = centro
    d.ellipse((x - raio, y - raio, x + raio, y + raio), fill=cor + f"{opacidade:02x}")
    base.alpha_composite(camada.filter(ImageFilter.GaussianBlur(raio // 2)))


def main() -> None:
    img = Image.new("RGBA", (L, A), "#000000")
    brilho(img, (250, 180), 320, VIOLETA, 0x3C)
    brilho(img, (980, 520), 300, AZUL, 0x3C)

    d = ImageDraw.Draw(img)

    # Logo. O arquivo tem um fundo escuro chapado, entao em vez de colar o
    # retangulo em cima usa-se blend "lighten": cada pixel fica o mais claro
    # entre logo e fundo, o que faz o fundo escuro do arquivo desaparecer e
    # preserva as letras metalicas. Quando houver logo em SVG ou PNG com
    # transparencia, trocar por alpha_composite direto.
    with Image.open(LOGO) as logo:
        logo = logo.convert("RGB")
        logo.thumbnail((190, 110), Image.LANCZOS)
        pos = (72, 62)
        caixa = (*pos, pos[0] + logo.width, pos[1] + logo.height)
        fundo = img.crop(caixa).convert("RGB")
        img.paste(ImageChops.lighter(fundo, logo), pos)

    # Rotulo
    d.text((72, 210), "CRIAÇÃO DE SITES · E-COMMERCE · SISTEMAS",
           font=fonte("corpo", 21), fill=AZUL)

    # Titulo, com as duas palavras de destaque nas cores da marca
    f = fonte("titulo", 60)
    linhas = [
        [("TRANSFORMAMOS", BRANCO)],
        [("IDEIAS", BRANCO), (" EM ", BRANCO), ("SOLUÇÕES", AZUL)],
        [("DIGITAIS", VIOLETA), (" QUE GERAM", BRANCO)],
        [("RESULTADOS.", BRANCO)],
    ]
    y = 256
    for linha in linhas:
        x = 72
        for texto, cor in linha:
            d.text((x, y), texto, font=f, fill=cor)
            x += d.textlength(texto, font=f)
        y += 74

    # Rodape
    d.line((72, 566, 1128, 566), fill="#ffffff26", width=1)
    d.text((72, 584), "curtatche.com.br", font=fonte("corpo", 24), fill=BRANCO)
    rotulo = "+25 ANOS DE EXPERIÊNCIA"
    f_rod = fonte("corpo", 20)
    d.text((1128 - d.textlength(rotulo, font=f_rod), 588), rotulo, font=f_rod, fill=CINZA)

    img.convert("RGB").save(SAIDA, "JPEG", quality=88, optimize=True, progressive=True)
    print(f"{SAIDA.relative_to(RAIZ)}  {L}x{A}  {SAIDA.stat().st_size / 1024:.1f} KB")


if __name__ == "__main__":
    main()
