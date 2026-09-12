import {
  Globe,
  Laptop,
  Layers,
  Search,
  Settings,
  Smartphone,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Servico {
  Icone: LucideIcon;
  titulo: string;
  descricao: string;
}

const SERVICOS: Servico[] = [
  {
    Icone: Laptop,
    titulo: "Sites Institucionais",
    descricao:
      "Criação e desenvolvimento de sites sob medida, com alta performance e design premium para destacar a autoridade de sua marca.",
  },
  {
    Icone: Layers,
    titulo: "Criação de E-commerce",
    descricao:
      "Lojas virtuais completas projetadas para entregar excelente experiência do usuário e otimizar taxas de conversão de ponta a ponta.",
  },
  {
    Icone: Zap,
    titulo: "Landing Pages",
    descricao:
      "Páginas de alta conversão estruturadas estrategicamente para gerar leads qualificados e impulsionar vendas imediatas.",
  },
  {
    Icone: Smartphone,
    titulo: "Desenvolvimento de Aplicativos",
    descricao:
      "Aplicativos mobile nativos e híbridos modernos, desenvolvidos sob medida para proporcionar grande interatividade e rapidez.",
  },
  {
    Icone: Settings,
    titulo: "Sistemas Web Personalizados",
    descricao:
      "Plataformas administrativas, dashboards e softwares robustos totalmente alinhados às necessidades específicas do seu negócio.",
  },
  {
    Icone: Globe,
    titulo: "Gestão de Conteúdo",
    descricao:
      "Integração de painéis intuitivos que garantem total autonomia para gerenciar, editar e atualizar as informações do seu site de forma ágil.",
  },
  {
    Icone: Search,
    titulo: "Marketing Digital",
    descricao:
      "Estratégias avançadas de atração, gestão de tráfego pago, SEO e posicionamento estratégico com foco em crescimento contínuo de marcas.",
  },
];

export default function Servicos() {
  return (
    <section
      id="servicos"
      className="border-t border-white/5 py-24 bg-stone-950/40 relative"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="text-center mb-16">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-brand-blue font-bold">
            Soluções Digitais Efetivas
          </span>
          <h2 className="font-display font-extrabold text-4xl text-white uppercase mt-2 tracking-tight">
            Nossos Serviços
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICOS.map(({ Icone, titulo, descricao }) => (
            <div
              key={titulo}
              className="p-6 bg-gradient-to-b from-stone-900/40 to-stone-900/10 border border-white/5 rounded-xl flex gap-4 transition-all duration-300 hover:border-brand-blue/25 hover:bg-stone-900/60"
            >
              <div className="text-brand-blue shrink-0 mt-0.5">
                <Icone size={20} aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-display text-base text-white font-bold uppercase tracking-wide">
                  {titulo}
                </h3>
                <p className="text-xs text-stone-400 leading-relaxed mt-1.5">
                  {descricao}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
