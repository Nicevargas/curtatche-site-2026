import type { CSSProperties } from "react";
import { redes } from "../data/redes";

interface Props {
  onNavegar: (id: string) => void;
  onAbrirPrivacidade: () => void;
}

export default function Rodape({ onNavegar, onAbrirPrivacidade }: Props) {
  return (
    <footer className="border-t border-white/10 py-12 bg-black text-[#c4c7c7] text-xs font-sans">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-3">
          <button
            type="button"
            onClick={() => onNavegar("hero")}
            className="flex items-center gap-2 cursor-pointer"
            aria-label="Curtatchê — ir para o início"
          >
            <img
              src="/portfolio/logosite.webp"
              alt="Curtatchê"
              width={425}
              height={240}
              loading="lazy"
              decoding="async"
              className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 hover:scale-105"
            />
          </button>
          <p className="text-xs text-[#a3a3a3] max-w-sm">
            Elevando o padrão digital através de design consciente e tecnologia
            de ponta.
          </p>
        </div>

        <div className="flex flex-col items-center gap-3">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#a3a3a3] font-bold">
            Conecte-se conosco
          </span>
          <div className="flex flex-wrap justify-center gap-3">
            {redes.map((rede) => (
              <a
                key={rede.titulo}
                href={rede.href}
                target="_blank"
                rel="noopener noreferrer"
                title={rede.titulo}
                aria-label={`Curtatchê no ${rede.titulo}`}
                style={{ "--cor-rede": rede.cor } as CSSProperties}
                className="rede-social w-11 h-11 rounded-full bg-white/5 flex items-center justify-center transition-all duration-300 border border-white/5 group"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="w-4 h-4 fill-current group-hover:scale-110 transition-transform duration-300"
                >
                  {rede.paths.map((d) => (
                    <path key={d} d={d} />
                  ))}
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/*
          O container tinha whitespace-nowrap, o que forçava 426px de largura e
          empurrava o documento para 478px numa tela de 375px — era a causa da
          rolagem horizontal no celular. Agora a linha de links pode quebrar.
        */}
        <div className="flex flex-col items-center md:items-end gap-3 text-[11px] font-mono">
          <div className="flex flex-wrap justify-center gap-4 uppercase tracking-widest text-[#a3a3a3]">
            <a href="#hero" className="hover:text-white transition-all">
              Home
            </a>
            <a href="#sobre" className="hover:text-white transition-all">
              Sobre
            </a>
            <a href="#projetos" className="hover:text-white transition-all">
              Projetos
            </a>
            <button
              type="button"
              id="footer-privacy-btn"
              onClick={onAbrirPrivacidade}
              className="hover:text-white transition-all cursor-pointer text-left"
            >
              Privacidade
            </button>
            <a
              href="#contato"
              className="hover:text-white transition-all text-brand-blue"
            >
              Solicitar Orçamento
            </a>
          </div>
          <span>© {new Date().getFullYear()} Curtatchê</span>
        </div>
      </div>
    </footer>
  );
}
