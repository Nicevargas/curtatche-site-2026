import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence } from "motion/react";
import Cabecalho from "./components/Cabecalho";
import Hero from "./components/Hero";
import Sobre from "./components/Sobre";
import Projetos from "./components/Projetos";
import Servicos from "./components/Servicos";
import Processo from "./components/Processo";
import FormularioOrcamento from "./components/FormularioOrcamento";
import Rodape from "./components/Rodape";
import BotaoWhatsApp from "./components/BotaoWhatsApp";
import ModalPrivacidade from "./components/ModalPrivacidade";
import { projetos } from "./data/projetos";

const INTERVALO_CARROSSEL = 4500;

export default function App() {
  const [indice, setIndice] = useState(0);
  const [direcao, setDirecao] = useState<1 | -1>(1);
  const [autoplay, setAutoplay] = useState(true);
  const [privacidadeAberta, setPrivacidadeAberta] = useState(false);
  const indiceRef = useRef(indice);
  indiceRef.current = indice;

  const irPara = useCallback((novo: number) => {
    setDirecao(novo >= indiceRef.current ? 1 : -1);
    setIndice(((novo % projetos.length) + projetos.length) % projetos.length);
  }, []);

  const proximo = useCallback(() => {
    setDirecao(1);
    setIndice((i) => (i + 1) % projetos.length);
  }, []);

  const anterior = useCallback(() => {
    setDirecao(-1);
    setIndice((i) => (i - 1 + projetos.length) % projetos.length);
  }, []);

  useEffect(() => {
    if (!autoplay) return;
    const id = setInterval(proximo, INTERVALO_CARROSSEL);
    return () => clearInterval(id);
  }, [autoplay, proximo]);

  const navegar = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e5e2e1]">
      <Cabecalho onNavegar={navegar} />

      {/* Compensa a altura do cabeçalho fixo e serve de âncora para "Home". */}
      <div className="h-20" id="hero" />

      <main>
        <Hero
          onNavegar={navegar}
          indice={indice}
          direcao={direcao}
          autoplay={autoplay}
          onSelecionar={(i) => {
            setAutoplay(false);
            irPara(i);
          }}
          onAnterior={() => {
            setAutoplay(false);
            anterior();
          }}
          onProximo={() => {
            setAutoplay(false);
            proximo();
          }}
          onAlternarAutoplay={() => setAutoplay((v) => !v)}
        />

        <Sobre />
        <Projetos />
        <Servicos />
        <Processo />

        <section className="border-t border-white/5 py-16 sm:py-24 relative bg-stone-950/40">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <FormularioOrcamento />
          </div>
        </section>
      </main>

      <Rodape
        onNavegar={navegar}
        onAbrirPrivacidade={() => setPrivacidadeAberta(true)}
      />
      <BotaoWhatsApp />

      <AnimatePresence>
        {privacidadeAberta && (
          <ModalPrivacidade onFechar={() => setPrivacidadeAberta(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
