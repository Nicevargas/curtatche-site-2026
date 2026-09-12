import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";

const ITENS = [
  { alvo: "hero", rotulo: "Home" },
  { alvo: "sobre", rotulo: "Sobre" },
  { alvo: "projetos", rotulo: "Projetos" },
  { alvo: "processo", rotulo: "Processo" },
] as const;

interface Props {
  onNavegar: (id: string) => void;
}

export default function Cabecalho({ onNavegar }: Props) {
  const [menuAberto, setMenuAberto] = useState(false);

  const ir = (id: string) => {
    onNavegar(id);
    setMenuAberto(false);
  };

  return (
    <nav className="fixed top-0 inset-x-0 z-40 bg-black border-b border-white/10 h-20 shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
      <div className="max-w-7xl mx-auto h-full px-6 sm:px-8 flex items-center justify-between">
        <button
          type="button"
          onClick={() => ir("hero")}
          className="flex items-center gap-3 cursor-pointer"
          aria-label="Curtatchê — ir para o início"
        >
          <img
            src="/portfolio/logosite.webp"
            alt="Curtatchê"
            width={400}
            height={223}
            className="h-12 sm:h-14 w-auto object-contain transition-transform duration-300 hover:scale-105"
          />
        </button>

        <div className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-widest font-semibold text-white/70">
          {ITENS.map(({ alvo, rotulo }) => (
            <button
              key={alvo}
              type="button"
              onClick={() => ir(alvo)}
              className="hover:text-white transition-all cursor-pointer"
            >
              {rotulo}
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button
            type="button"
            onClick={() => ir("contato")}
            className="px-5 py-2.5 bg-white text-black font-semibold text-xs rounded hover:bg-[#c9c6c5] hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-widest cursor-pointer"
          >
            Solicitar Orçamento
          </button>
        </div>

        {/* Alvo de toque de 44px, mínimo recomendado para dedo */}
        <button
          type="button"
          onClick={() => setMenuAberto((v) => !v)}
          className="md:hidden p-3 -mr-2 text-white/80 hover:text-white transition-all cursor-pointer"
          aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuAberto}
          aria-controls="menu-mobile"
        >
          {menuAberto ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/*
        O painel desliza para fora de baixo da barra, em vez de aparecer com
        fade. Animar opacity deixava o fundo translúcido durante a transição e
        o menu ficava ilegível sobre o conteúdo do hero.
      */}
      <AnimatePresence>
        {menuAberto && (
          <motion.div
            className="absolute top-20 inset-x-0 overflow-hidden md:hidden shadow-xl"
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              id="menu-mobile"
              className="bg-[#0a0a0a] border-b border-white/10 p-6 flex flex-col gap-4 text-xs font-mono uppercase tracking-widest text-[#c4c7c7]"
            >
              {ITENS.map(({ alvo, rotulo }) => (
                <button
                  key={alvo}
                  type="button"
                  onClick={() => ir(alvo)}
                  className="text-left py-3 hover:text-white cursor-pointer"
                >
                  {rotulo}
                </button>
              ))}
              <button
                type="button"
                onClick={() => ir("contato")}
                className="w-full mt-4 py-3 bg-white text-black font-bold rounded text-center transition-all uppercase cursor-pointer"
              >
                Solicitar Orçamento
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
