export type Categoria =
  "E-commerce" | "Institucional" | "SaaS / Plataforma" | "Aplicativo Web";

export type TipoMockup = "tablet" | "phone" | "desktop" | "laptop";

export interface Imagem {
  src: string;
  largura: number;
  altura: number;
}

export interface Projeto {
  id: string;
  title: string;
  subtitle: string;
  category: Categoria;
  description: string;
  /** Print da versão desktop, exibido dentro da moldura de notebook/monitor. */
  imagem: Imagem;
  /**
   * Print da versão mobile. Opcional: o NalineLotus não tem — o arquivo
   * naline_cel.png nunca existiu na origem (retornava 404). Quando ausente,
   * a moldura de celular cai para o print desktop.
   */
  imagemMobile?: Imagem;
  directLink: string;
  features: string[];
  tools: string[];
  mockupType: TipoMockup;
}

export const projetos: Projeto[] = [
  {
    id: "fecha-bene",
    title: "FechaBene",
    subtitle: "E-commerce de Alta-Costura",
    category: "E-commerce",
    description:
      "E-commerce fashion premium com design de altíssimo impacto visual, checkout acelerado em tela única e interface de compras de fluxo otimizado.",
    imagem: { src: "/portfolio/fechabene.webp", largura: 1280, altura: 3313 },
    imagemMobile: {
      src: "/portfolio/fechabene_cel.webp",
      largura: 365,
      altura: 4829,
    },
    directLink: "https://fechabene.com.br/",
    features: [
      "Navegação de coleções ultra-fluida",
      "Minicart e checkout em uma única tela",
      "Filtros inteligentes por categoria e cor",
      "Visualizadores de detalhes de alta resolução",
    ],
    tools: ["React", "Tailwind CSS", "Motion/react", "Vite"],
    mockupType: "tablet",
  },
  {
    id: "bolao-2026",
    title: "BolãoCopa2026",
    subtitle: "Aplicativo de Palpites da Copa",
    category: "Aplicativo Web",
    description:
      "Plataforma interativa para palpites de futebol da Copa do Mundo de 2026, com criação de ligas privadas, ranking dinâmico em tempo real e atualizações de placar instantâneas.",
    imagem: { src: "/portfolio/bolao2026.webp", largura: 1280, altura: 1366 },
    imagemMobile: {
      src: "/portfolio/bolao2026_cel.webp",
      largura: 365,
      altura: 2897,
    },
    directLink: "https://bolao-2026-v8.vercel.app/",
    features: [
      "Criação de ligas personalizadas para amigos",
      "Cálculo automático de classificação e pontos",
      "Atualizações ao vivo dos gols das partidas",
      "Layout responsivo projetado para mobile-first",
    ],
    tools: ["React", "Tailwind CSS", "Motion/react", "Rest API"],
    mockupType: "phone",
  },
  {
    id: "podcast-nu-blush",
    title: "Podcast Café com internet",
    subtitle: "Plataforma de Gestão de Podcasts",
    category: "SaaS / Plataforma",
    description:
      "Painel robusto e elegante de gerenciamento, distribuição de episódios e análises estatísticas integradas para criadores de conteúdo e redes digitais.",
    imagem: { src: "/portfolio/podcast.webp", largura: 1280, altura: 5046 },
    imagemMobile: {
      src: "/portfolio/podcast_cel.webp",
      largura: 365,
      altura: 9928,
    },
    directLink: "https://podcast-nu-blush.vercel.app/",
    features: [
      "Painel de controle com acompanhamento de plays",
      "Agendamento de lançamentos globais de áudio",
      "Waveform animada síncrona com reprodução",
      "Seção rica de analytics de engajamento",
    ],
    tools: ["React", "Tailwind CSS", "Recharts", "Lucide Icons"],
    mockupType: "desktop",
  },
  {
    id: "studio-essenza",
    title: "StudioEssenza",
    subtitle: "Site Institucional com Vídeo",
    category: "Institucional",
    description:
      "Web showcase corporativo de alto padrão que integra player de fundo em vídeo fluido, estudos de caso dinâmicos e sessões de fotos de alta fidelidade.",
    imagem: { src: "/portfolio/studio.webp", largura: 1280, altura: 4569 },
    imagemMobile: {
      src: "/portfolio/studio_cel.webp",
      largura: 365,
      altura: 6787,
    },
    directLink: "https://studioessenzaprime.com.br/",
    features: [
      "Integração de vídeos imersivos de fundo",
      "Portfólio com filtro dinâmico de projetos",
      "Galeria avançada com transição fluida",
      "Formulário boutique para captação estratégica",
    ],
    tools: ["React", "Tailwind CSS", "Framer Motion", "Video API"],
    mockupType: "laptop",
  },
  {
    id: "nalini-lotus",
    title: "NalineLotus",
    subtitle: "Site Institucional Básico",
    category: "Institucional",
    description:
      "Showcase web essencial focado em velocidade extrema e carregamento leve, apresentando uma estrutura limpa, informativa e perfeitamente equilibrada.",
    imagem: { src: "/portfolio/naline.webp", largura: 1280, altura: 7440 },
    directLink: "https://nalinilotus.lovable.app/",
    features: [
      "Design minimalista com alta velocidade",
      "Otimização impecável para buscadores (SEO)",
      "Seções de contato e conversão bem integradas",
      "Visualização responsiva excelente em smartphones",
    ],
    tools: ["React", "Motion/react", "Tailwind CSS", "SEO Meta"],
    mockupType: "phone",
  },
];

export const categorias: Categoria[] = [
  "E-commerce",
  "Institucional",
  "SaaS / Plataforma",
  "Aplicativo Web",
];
