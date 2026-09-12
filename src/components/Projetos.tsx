import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Laptop, Smartphone, Sparkles, Tablet } from "lucide-react";
import { categorias, projetos, type Projeto } from "../data/projetos";

type Filtro = "Todos" | Projeto["category"];

const FILTROS: Filtro[] = ["Todos", ...categorias];

const ICONE_MOCKUP = {
  laptop: { Icone: Laptop, rotulo: "Laptop" },
  tablet: { Icone: Tablet, rotulo: "Tablet" },
  phone: { Icone: Smartphone, rotulo: "Mobile" },
  desktop: { Icone: Laptop, rotulo: "Desktop" },
} as const;

export default function Projetos() {
  const [filtro, setFiltro] = useState<Filtro>("Todos");
  const visiveis = projetos.filter(
    (p) => filtro === "Todos" || p.category === filtro,
  );

  return (
    <section
      id="projetos"
      className="border-t border-white/5 py-24 sm:py-32 relative"
    >
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/4 w-96 max-w-full h-96 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-1/3 right-1/4 w-96 max-w-full h-96 bg-brand-purple/5 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="text-left">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-brand-blue font-bold flex items-center gap-2">
              <Sparkles size={12} className="text-brand-purple animate-pulse" />
              Estudos de Caso Exclusivos
            </span>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-white uppercase mt-2 tracking-tight">
              Projetos Selecionados
            </h2>
            <p className="text-xs text-stone-400 mt-2 max-w-md leading-relaxed">
              Explore alguns dos nossos projetos e as suas interfaces de alto
              impacto desenvolvidas sob medida.
            </p>
          </div>

          <div
            role="group"
            aria-label="Filtrar projetos por categoria"
            className="flex flex-wrap gap-1.5 bg-black/40 p-1.5 rounded-full border border-white/5 self-start md:self-auto"
          >
            {FILTROS.map((f) => {
              const total =
                f === "Todos"
                  ? projetos.length
                  : projetos.filter((p) => p.category === f).length;
              const ativo = filtro === f;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFiltro(f)}
                  aria-pressed={ativo}
                  className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-300 flex items-center gap-1.5 uppercase tracking-wide cursor-pointer ${
                    ativo
                      ? "bg-gradient-to-r from-brand-blue to-brand-purple text-black font-extrabold shadow-sm"
                      : "text-stone-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {f}
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded-full font-sans font-bold ${
                      ativo
                        ? "bg-black/20 text-black"
                        : "bg-white/10 text-stone-400"
                    }`}
                  >
                    {total}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <AnimatePresence mode="popLayout">
            {visiveis.map((p) => {
              const { Icone, rotulo } = ICONE_MOCKUP[p.mockupType];
              return (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex flex-col h-full bg-gradient-to-b from-stone-900/40 to-stone-900/10 border border-white/10 rounded-2xl hover:border-brand-blue/30 transition-all duration-500 relative overflow-hidden backdrop-blur-sm shadow-xl"
                >
                  {/* Barra de janela decorativa */}
                  <div className="px-4 py-3 bg-stone-900/80 border-b border-white/10 flex items-center justify-between select-none">
                    <div
                      aria-hidden="true"
                      className="flex gap-1.5 items-center"
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/70 block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70 block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500/70 block" />
                    </div>
                    <div className="flex items-center gap-1 text-[9px] font-mono text-brand-purple uppercase">
                      <Icone size={10} /> {rotulo}
                    </div>
                  </div>

                  <a
                    href={p.directLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative aspect-[16/10] overflow-hidden bg-black/90 border-b border-white/5 flex items-start justify-center cursor-pointer group"
                  >
                    <img
                      src={p.imagem.src}
                      alt={`Interface do projeto ${p.title}`}
                      width={p.imagem.largura}
                      height={p.imagem.altura}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-neutral-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center backdrop-blur-[2px] gap-3">
                      <span className="px-5 py-2.5 bg-white text-black text-xs font-bold font-mono tracking-widest uppercase rounded-lg shadow-2xl scale-95 group-hover:scale-100 transition-all duration-300">
                        Acessar Projeto ↗
                      </span>
                      <p className="text-[10px] text-stone-300 font-mono">
                        Abrir em nova aba
                      </p>
                    </div>
                  </a>

                  <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        <span className="text-[9px] font-mono uppercase tracking-wider text-brand-blue font-semibold bg-brand-blue/10 px-2 py-0.5 rounded border border-brand-blue/20">
                          {p.category}
                        </span>
                        {p.tools.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="text-[9px] font-mono text-stone-400 bg-white/5 px-2 py-0.5 rounded"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      <h3 className="font-display text-2xl font-bold text-white mb-2 uppercase tracking-wide group-hover:text-brand-blue transition-colors duration-300">
                        {p.title}
                      </h3>
                      <p className="text-xs text-stone-400 leading-relaxed max-w-md h-12 overflow-hidden text-ellipsis mb-6">
                        {p.description}
                      </p>

                      <div className="space-y-1.5 mb-6">
                        <p className="text-[9px] font-mono uppercase tracking-wider text-stone-500 font-semibold">
                          Destaques do Projeto:
                        </p>
                        {p.features.slice(0, 2).map((f) => (
                          <div
                            key={f}
                            className="flex items-center gap-2 text-xs text-stone-300 font-sans"
                          >
                            <span
                              aria-hidden="true"
                              className="text-brand-blue text-xs font-bold font-mono"
                            >
                              •
                            </span>
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-5 border-t border-white/5 mt-auto">
                      <a
                        href={p.directLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 bg-gradient-to-r from-brand-blue/20 to-brand-purple/20 hover:from-brand-blue/30 hover:to-brand-purple/30 text-brand-blue hover:text-white border border-brand-blue/30 rounded-lg text-xs font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 hover:border-brand-blue/50"
                      >
                        Acessar {p.title} ↗
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
