import { useState } from "react";
import { motion } from "motion/react";
import {
  CircleCheckBig,
  Mail,
  MessageSquare,
  RefreshCw,
  Send,
} from "lucide-react";
import { WHATSAPP } from "../data/redes";

type Canal = "whatsapp" | "email";

const TIPOS_PROJETO = [
  "E-commerce",
  "Website Institucional",
  "SaaS / Dashboard",
  "Aplicativo Mobile",
] as const;

const VAZIO = {
  name: "",
  email: "",
  phone: "",
  company: "",
  projectType: TIPOS_PROJETO[0] as string,
  details: "",
};

const CLASSE_CAMPO =
  "w-full bg-black/40 border border-white/10 rounded px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-brand-blue transition-colors";
const CLASSE_ROTULO =
  "text-[11px] font-mono uppercase tracking-wider text-white/50 block font-semibold";

function montarMensagem(d: typeof VAZIO): string {
  const partes = [
    "Olá! Gostaria de solicitar um orçamento exclusivo para meu projeto.",
    "",
    `*Nome:* ${d.name}`,
    `*E-mail:* ${d.email}`,
  ];
  if (d.phone) partes.push(`*Telefone:* ${d.phone}`);
  if (d.company) partes.push(`*Empresa:* ${d.company}`);
  partes.push(`*Tipo de Projeto:* ${d.projectType}`);
  if (d.details) partes.push(`*Requisitos:* ${d.details}`);
  return partes.join("\n");
}

function linkWhatsApp(d: typeof VAZIO): string {
  return `https://api.whatsapp.com/send?phone=${WHATSAPP}&text=${encodeURIComponent(montarMensagem(d))}`;
}

export default function FormularioOrcamento() {
  const [canal, setCanal] = useState<Canal>("whatsapp");
  const [dados, setDados] = useState(VAZIO);
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  // Campo-armadilha: pessoa nenhuma vê, então só robô preenche.
  const [armadilha, setArmadilha] = useState("");

  const alterar = (campo: keyof typeof VAZIO, valor: string) =>
    setDados((d) => ({ ...d, [campo]: valor }));

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dados.name || !dados.email) return;
    if (armadilha) {
      setEnviado(true); // finge sucesso para o robô e não envia nada
      return;
    }

    setErro(null);

    if (canal === "whatsapp") {
      // Abre na mesma pilha de chamada do clique. A versão anterior fazia isso
      // dentro de um setTimeout de 1,2s, o que fazia o navegador tratar como
      // pop-up não solicitado e bloquear — o lead se perdia em silêncio.
      window.open(linkWhatsApp(dados), "_blank", "noopener,noreferrer");
      setEnviado(true);
      return;
    }

    setEnviando(true);
    try {
      const resposta = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });
      const corpo = await resposta.json().catch(() => ({}));
      if (!resposta.ok) throw new Error(corpo.error ?? "Falha no envio.");
      setEnviado(true);
    } catch {
      setErro(
        "Não conseguimos enviar seu e-mail agora. Tente pelo WhatsApp, que é ainda mais rápido.",
      );
    } finally {
      setEnviando(false);
    }
  };

  const recomecar = () => {
    setDados(VAZIO);
    setCanal("whatsapp");
    setEnviado(false);
    setErro(null);
  };

  return (
    <div
      id="contato"
      className="w-full max-w-2xl mx-auto glass-panel p-8 rounded-lg border border-white/10 relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-80 max-w-full h-80 bg-brand-purple/10 rounded-full blur-3xl -z-10 pointer-events-none"
      />

      {enviado ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          role="status"
          aria-live="polite"
          className="text-center py-12 flex flex-col items-center justify-center"
        >
          <div className="w-16 h-16 bg-brand-blue/10 rounded-full flex items-center justify-center mb-6 text-brand-blue border border-brand-blue/20">
            <CircleCheckBig size={32} aria-hidden="true" />
          </div>
          <h3 className="font-display text-2xl font-bold text-white mb-2 uppercase tracking-wide">
            {canal === "whatsapp"
              ? "Abriremos o WhatsApp!"
              : "E-mail enviado com sucesso!"}
          </h3>
          <p className="text-sm text-[#c4c7c7] max-w-md mx-auto mb-8">
            {canal === "whatsapp"
              ? "Obrigado pelo contato! Se o seu navegador bloqueou a janela automática, clique no botão abaixo para conversar conosco no WhatsApp agora mesmo."
              : "Seus dados foram enviados para eunice@curtatche.com.br. Retornaremos o mais breve possível."}
          </p>

          <dl className="bg-white/5 p-4 rounded border border-white/5 text-left max-w-sm w-full space-y-2 mb-8 text-xs font-mono">
            <div className="flex justify-between border-b border-white/5 pb-1">
              <dt className="opacity-50">Solicitante:</dt>
              <dd className="font-semibold">{dados.name}</dd>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-1">
              <dt className="opacity-50">Projeto:</dt>
              <dd className="font-semibold text-brand-blue">
                {dados.projectType}
              </dd>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-1">
              <dt className="opacity-50">Canal:</dt>
              <dd className="font-semibold text-stone-300">
                {canal === "email" ? "E-mail" : "WhatsApp"}
              </dd>
            </div>
          </dl>

          <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
            {canal === "whatsapp" ? (
              <a
                href={linkWhatsApp(dados)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded transition-all uppercase tracking-wider cursor-pointer"
              >
                Conversar no WhatsApp
              </a>
            ) : (
              <span className="flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600/20 text-emerald-400 border border-emerald-500/20 font-bold text-xs rounded uppercase tracking-wider">
                <CircleCheckBig size={12} aria-hidden="true" />
                Enviado
              </span>
            )}
            <button
              type="button"
              onClick={recomecar}
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/15 text-white font-semibold text-xs rounded transition-all uppercase tracking-wider cursor-pointer"
            >
              <RefreshCw size={12} aria-hidden="true" />
              Enviar outro
            </button>
          </div>
        </motion.div>
      ) : (
        <form onSubmit={enviar} className="space-y-6">
          <div className="text-center mb-8">
            <span className="text-[10px] uppercase tracking-[0.2em] text-brand-blue font-bold px-3 py-1 bg-brand-blue/10 rounded-full">
              Orçamento Sob Medida
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white mt-4 uppercase tracking-tight">
              Seu próximo projeto pode começar aqui
            </h2>
            <p className="text-sm text-stone-300 mt-3 max-w-lg mx-auto leading-relaxed">
              Criamos experiências digitais que conectam marcas, pessoas e
              oportunidades de negócio. Preencha os campos abaixo para iniciar.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="orc-nome" className={CLASSE_ROTULO}>
                Nome completo
              </label>
              <input
                id="orc-nome"
                name="name"
                type="text"
                required
                autoComplete="name"
                value={dados.name}
                onChange={(e) => alterar("name", e.target.value)}
                placeholder="Seu nome"
                className={CLASSE_CAMPO}
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="orc-email" className={CLASSE_ROTULO}>
                E-mail
              </label>
              <input
                id="orc-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={dados.email}
                onChange={(e) => alterar("email", e.target.value)}
                placeholder="exemplo@empresa.com"
                className={CLASSE_CAMPO}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="orc-telefone" className={CLASSE_ROTULO}>
                WhatsApp {canal === "whatsapp" ? "" : "(opcional)"}
              </label>
              <input
                id="orc-telefone"
                name="phone"
                type="tel"
                inputMode="tel"
                required={canal === "whatsapp"}
                autoComplete="tel"
                value={dados.phone}
                onChange={(e) => alterar("phone", e.target.value)}
                placeholder="(11) 99999-9999"
                className={CLASSE_CAMPO}
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="orc-empresa" className={CLASSE_ROTULO}>
                Nome da empresa (opcional)
              </label>
              <input
                id="orc-empresa"
                name="company"
                type="text"
                autoComplete="organization"
                value={dados.company}
                onChange={(e) => alterar("company", e.target.value)}
                placeholder="Sua marca ou negócio"
                className={CLASSE_CAMPO}
              />
            </div>
          </div>

          <fieldset className="space-y-2">
            <legend className={CLASSE_ROTULO}>Tipo do projeto</legend>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {TIPOS_PROJETO.map((tipo) => (
                <button
                  key={tipo}
                  type="button"
                  onClick={() => alterar("projectType", tipo)}
                  aria-pressed={dados.projectType === tipo}
                  className={`py-2 px-3 text-xs font-semibold rounded text-center border transition-all cursor-pointer ${
                    dados.projectType === tipo
                      ? "bg-white text-black border-white"
                      : "bg-black/30 text-white/70 border-white/10 hover:border-white/30"
                  }`}
                >
                  {tipo}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="space-y-1">
            <label htmlFor="orc-detalhes" className={CLASSE_ROTULO}>
              Descrição rápida (requisitos)
            </label>
            <textarea
              id="orc-detalhes"
              name="details"
              rows={4}
              value={dados.details}
              onChange={(e) => alterar("details", e.target.value)}
              placeholder="Descreva o que espera alcançar em termos de design, ferramentas, funcionalidades principais e escopo geral..."
              className={CLASSE_CAMPO}
            />
          </div>

          {/* Armadilha anti-robô: fora da tela e fora da ordem de tabulação. */}
          <input
            type="text"
            name="assunto_extra"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            value={armadilha}
            onChange={(e) => setArmadilha(e.target.value)}
            className="absolute -left-[9999px] w-px h-px opacity-0"
          />

          <fieldset className="space-y-2 pt-2">
            <legend className={CLASSE_ROTULO}>
              Canal de envio preferencial
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setCanal("whatsapp")}
                aria-pressed={canal === "whatsapp"}
                className={`p-3.5 rounded border text-left flex items-start gap-3 transition-all cursor-pointer ${
                  canal === "whatsapp"
                    ? "bg-emerald-500/10 border-emerald-500/50 text-white shadow-[0_0_15px_rgba(16,185,129,0.1)]"
                    : "bg-black/30 border-white/10 text-white/70 hover:border-white/30"
                }`}
              >
                <span
                  className={`p-2 rounded-md ${
                    canal === "whatsapp"
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-white/5 text-white/40"
                  }`}
                >
                  <MessageSquare size={16} aria-hidden="true" />
                </span>
                <span>
                  <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                    WhatsApp
                    <span className="text-[9px] px-1.5 py-0.5 bg-emerald-500/20 text-emerald-300 rounded font-normal lowercase">
                      rápido
                    </span>
                  </span>
                  <span className="block text-[11px] text-white/50 mt-1">
                    Ideal para resposta ágil e conversa direta no app.
                  </span>
                </span>
              </button>

              <button
                type="button"
                onClick={() => setCanal("email")}
                aria-pressed={canal === "email"}
                className={`p-3.5 rounded border text-left flex items-start gap-3 transition-all cursor-pointer ${
                  canal === "email"
                    ? "bg-emerald-500/10 border-brand-blue/50 text-white shadow-[0_0_15px_rgba(59,130,246,0.1)]"
                    : "bg-black/30 border-white/10 text-white/70 hover:border-white/30"
                }`}
              >
                <span
                  className={`p-2 rounded-md ${
                    canal === "email"
                      ? "bg-brand-blue/20 text-brand-blue"
                      : "bg-white/5 text-white/40"
                  }`}
                >
                  <Mail size={16} aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-xs font-bold uppercase tracking-wider">
                    E-mail
                  </span>
                  <span className="block text-[11px] text-white/50 mt-1">
                    Ideal para propostas formais diretamente por e-mail.
                  </span>
                </span>
              </button>
            </div>
          </fieldset>

          <div aria-live="polite">
            {erro && (
              <p className="p-3.5 bg-red-500/10 border border-red-500/30 rounded text-red-200 text-xs text-center leading-relaxed font-semibold">
                {erro}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={enviando}
            className="w-full py-3 bg-white hover:bg-white/90 text-black font-semibold text-xs rounded transition-all uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {enviando ? (
              <>
                <RefreshCw
                  size={14}
                  className="animate-spin"
                  aria-hidden="true"
                />
                Processando solicitação...
              </>
            ) : (
              <>
                <Send size={14} aria-hidden="true" />
                {canal === "whatsapp"
                  ? "Enviar via WhatsApp"
                  : "Enviar via e-mail"}
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
