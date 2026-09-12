import { AnimatePresence, motion } from "motion/react";
import {
  ArrowUpRight,
  ChevronDown,
  ChevronRight,
  ChevronUp,
} from "lucide-react";
import { projetos } from "../data/projetos";

interface Props {
  onNavegar: (id: string) => void;
  indice: number;
  direcao: 1 | -1;
  autoplay: boolean;
  onSelecionar: (indice: number) => void;
  onAnterior: () => void;
  onProximo: () => void;
  onAlternarAutoplay: () => void;
}

export default function Hero({
  onNavegar,
  indice,
  direcao,
  autoplay,
  onSelecionar,
  onAnterior,
  onProximo,
  onAlternarAutoplay,
}: Props) {
  const projeto = projetos[indice];
  // O print mobile do NalineLotus não existe; nesse caso mostra o desktop.
  const arte = projeto.imagemMobile ?? projeto.imagem;

  return (
    <header className="max-w-7xl mx-auto px-6 sm:px-8 py-12 sm:py-20 relative">
      {/* Brilho decorativo. max-w-full impede que os 500px estiquem o layout no celular. */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] max-w-full h-[500px] bg-brand-purple/5 rounded-full blur-3xl -z-10"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="space-y-6 flex flex-col items-center lg:items-start text-center lg:text-left lg:col-span-7">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-brand-blue font-bold block">
            Portfólio de Projetos
          </span>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-white leading-[1.1] tracking-tighter uppercase max-w-2xl">
            Transformamos ideias em{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-purple">
              soluções digitais
            </span>{" "}
            que geram resultados.
          </h1>
          <p className="font-sans text-base text-stone-300 leading-relaxed max-w-xl">
            Com mais de 25 anos de experiência, desenvolvemos projetos que unem
            design moderno, tecnologia e estratégia para fortalecer a presença
            online de empresas e marcas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => onNavegar("projetos")}
              className="px-8 py-4 bg-white text-black font-bold text-xs rounded hover:bg-white/95 hover:scale-[1.01] active:scale-[0.99] transition-all uppercase tracking-widest flex items-center justify-center gap-1.5 cursor-pointer"
            >
              Ver projetos
              <ChevronRight size={14} />
            </button>
            <button
              type="button"
              onClick={() => onNavegar("contato")}
              className="px-8 py-4 bg-transparent border border-white/20 text-white font-bold text-xs rounded hover:bg-white/5 active:bg-white/10 transition-all uppercase tracking-widest cursor-pointer"
            >
              Solicitar orçamento
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-row items-center justify-center gap-5 sm:gap-7 w-full">
          {/* Moldura de celular */}
          <div className="relative aspect-[9/16] w-[250px] sm:w-[290px] max-w-full bg-stone-950 border-[8px] border-stone-800 rounded-[2.6rem] shadow-[0_30px_70px_rgba(0,0,0,0.9)] overflow-hidden">
            <div
              aria-hidden="true"
              className="absolute top-2.5 left-1/2 -translate-x-1/2 w-20 h-4 bg-stone-800 rounded-full z-30 flex items-center justify-center"
            >
              <div className="w-8 h-1 bg-stone-700 rounded-full" />
            </div>

            <div className="absolute inset-0 w-full h-full bg-stone-950 rounded-[2.1rem] overflow-hidden">
              <AnimatePresence initial={false} custom={direcao}>
                <motion.div
                  key={projeto.id}
                  custom={direcao}
                  variants={{
                    initial: (d: number) => ({
                      y: d > 0 ? "100%" : "-100%",
                      opacity: 0,
                    }),
                    animate: {
                      y: 0,
                      opacity: 1,
                      transition: {
                        y: { type: "spring", stiffness: 300, damping: 28 },
                        opacity: { duration: 0.25 },
                      },
                    },
                    exit: (d: number) => ({
                      y: d > 0 ? "-100%" : "100%",
                      opacity: 0,
                      transition: {
                        y: { type: "spring", stiffness: 300, damping: 28 },
                        opacity: { duration: 0.25 },
                      },
                    }),
                  }}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="absolute inset-0 w-full h-full"
                >
                  <img
                    src={arte.src}
                    alt={`Projeto ${projeto.title} — ${projeto.subtitle}`}
                    width={arte.largura}
                    height={arte.altura}
                    fetchPriority="high"
                    decoding="async"
                    className="w-full h-full object-cover object-top select-none pointer-events-none"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/20"
                  />
                </motion.div>
              </AnimatePresence>

              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/90 pointer-events-none z-10"
              />

              <div className="absolute bottom-4 inset-x-4 bg-black/80 backdrop-blur-md rounded-2xl p-3 sm:p-3.5 border border-white/10 flex items-center justify-between gap-2 z-20">
                <div className="min-w-0 flex-1">
                  <span className="text-[8px] font-mono uppercase tracking-widest text-brand-blue font-bold block mb-0.5">
                    {projeto.category}
                  </span>
                  <h2 className="text-xs font-display font-medium text-white truncate">
                    {projeto.title}
                  </h2>
                </div>
                <a
                  href={projeto.directLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Abrir o projeto ${projeto.title} em nova aba`}
                  className="shrink-0 p-2 bg-white/10 hover:bg-brand-blue hover:text-black text-white rounded-xl transition-all cursor-pointer flex items-center justify-center"
                >
                  <ArrowUpRight size={13} />
                </a>
              </div>
            </div>
          </div>

          {/* Navegação vertical do carrossel */}
          <div className="flex flex-col items-center gap-3 select-none py-4">
            <button
              type="button"
              onClick={onAnterior}
              aria-label="Projeto anterior"
              className="w-11 h-11 rounded-full border border-white/10 bg-white/5 text-white/50 hover:text-white hover:border-white/30 hover:bg-white/10 flex items-center justify-center transition-all cursor-pointer"
            >
              <ChevronUp size={16} />
            </button>

            <div className="flex flex-col items-center gap-2 relative">
              {projetos.map((p, i) => {
                const ativo = i === indice;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => onSelecionar(i)}
                    aria-label={`Ver ${p.title}`}
                    aria-current={ativo}
                    className="group flex flex-col items-center py-1.5 px-2 relative cursor-pointer"
                  >
                    <span
                      className={`p-1.5 rounded-lg border text-[10px] font-mono font-black tracking-tighter w-8 h-8 flex items-center justify-center transition-all ${
                        ativo
                          ? "bg-gradient-to-r from-brand-blue to-brand-purple text-black border-transparent scale-110 shadow-lg"
                          : "bg-[#18181b] border-white/5 text-white/50 hover:text-white hover:border-white/20"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      aria-hidden="true"
                      className="absolute right-12 top-1/2 -translate-y-1/2 bg-black border border-white/10 text-white/90 text-[10px] px-2 py-1 rounded-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap shadow-xl z-30"
                    >
                      {p.title}
                    </span>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={onProximo}
              aria-label="Próximo projeto"
              className="w-11 h-11 rounded-full border border-white/10 bg-white/5 text-white/50 hover:text-white hover:border-white/30 hover:bg-white/10 flex items-center justify-center transition-all cursor-pointer"
            >
              <ChevronDown size={16} />
            </button>

            <button
              type="button"
              onClick={onAlternarAutoplay}
              aria-label={
                autoplay
                  ? "Pausar rotação automática"
                  : "Retomar rotação automática"
              }
              className={`text-[8px] font-mono uppercase tracking-wider px-2 py-1.5 rounded border transition-all mt-2 cursor-pointer ${
                autoplay
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                  : "bg-stone-500/10 text-stone-400 border-stone-500/20"
              }`}
            >
              {autoplay ? "● Playing" : "■ Paused"}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
