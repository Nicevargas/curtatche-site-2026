export default function Sobre() {
  return (
    <section
      id="sobre"
      className="border-t border-white/5 py-24 sm:py-32 bg-stone-950/20"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <span className="text-xs font-mono uppercase tracking-widest text-[#8b5cf6] font-semibold">
              Nossa Filosofia
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white uppercase mt-2 tracking-tight">
              Design Moderno, Tecnologia e Estratégia.
            </h2>
          </div>
          <div className="lg:col-span-7 text-[#c4c7c7] font-sans text-sm sm:text-base space-y-6 leading-relaxed max-w-xl">
            <p>
              Nosso portfólio reúne sites institucionais, lojas virtuais,
              landing pages e plataformas personalizadas, sempre com foco em
              performance, experiência do usuário e conversão.
            </p>
            <p>
              Cada projeto é desenvolvido de forma personalizada, buscando
              oferecer uma experiência única e soluções que acompanham os
              objetivos de cada cliente para impulsionar seus resultados.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
