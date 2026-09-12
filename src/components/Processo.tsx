const ETAPAS = [
  {
    titulo: "Planejamento",
    descricao:
      "Definição de objetivos claros, profunda análise de parceiros e estratégia arquitetural.",
  },
  {
    titulo: "Design",
    descricao:
      "Criação visual refinada, focada em interações fluidas e consolidação da identidade de marca.",
  },
  {
    titulo: "Desenvolvimento",
    descricao:
      "Engenharia de ponta, código rigorosamente limpo, otimizado e estruturado para estabilidade.",
  },
  {
    titulo: "Testes",
    descricao:
      "Garantia absoluta de qualidade através de avaliações em múltiplos navegadores e dispositivos físicos.",
  },
  {
    titulo: "Publicação",
    descricao:
      "Lançamento de alta performance sincronizado, monitoramento contínuo e acompanhamento de métricas.",
  },
];

export default function Processo() {
  return (
    <section
      id="processo"
      className="border-t border-white/5 py-24 sm:py-32 bg-stone-950/20"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="text-center mb-16">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-brand-blue font-bold">
            Como trabalhamos
          </span>
          <h2 className="font-display font-extrabold text-4xl text-white uppercase mt-2 tracking-tight">
            Nosso Processo
          </h2>
        </div>

        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {ETAPAS.map(({ titulo, descricao }, i) => (
            <li
              key={titulo}
              className="p-6 bg-white/5 border border-white/5 rounded flex flex-col justify-between"
            >
              <span className="text-brand-blue text-xs font-mono font-bold block mb-4">
                {String(i + 1).padStart(2, "0")} / Etapa
              </span>
              <div>
                <h3 className="font-display text-base font-bold text-white uppercase mb-1">
                  {titulo}
                </h3>
                <p className="text-xs text-[#c4c7c7] leading-relaxed">
                  {descricao}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
