import { useEffect } from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  CircleCheck,
  Eye,
  FileText,
  Lock,
  Shield,
  TriangleAlert,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  ATUALIZADO_EM,
  RESPONSAVEL,
  secoesPrivacidade,
  type NomeIcone,
} from "../data/privacidade";

const ICONES: Record<NomeIcone, { Componente: LucideIcon; cor: string }> = {
  eye: { Componente: Eye, cor: "text-brand-blue" },
  lock: { Componente: Lock, cor: "text-brand-purple" },
  "file-text": { Componente: FileText, cor: "text-brand-purple" },
  "circle-check": { Componente: CircleCheck, cor: "text-emerald-400" },
};

interface Props {
  onFechar: () => void;
}

export default function ModalPrivacidade({ onFechar }: Props) {
  // Fechar com Esc: o modal original só fechava por clique.
  useEffect(() => {
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "Escape") onFechar();
    };
    document.addEventListener("keydown", aoTeclar);
    return () => document.removeEventListener("keydown", aoTeclar);
  }, [onFechar]);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onFechar}
        id="privacy-policy-overlay"
        className="fixed inset-0 bg-black/80 backdrop-blur-md"
      />

      <motion.div
        initial={{ scale: 0.95, y: 15, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 15, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        id="privacy-policy-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="privacy-policy-titulo"
        className="relative bg-stone-900 border border-white/10 rounded-2xl w-full max-w-3xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl z-10 text-stone-200"
      >
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-stone-900/50 sticky top-0 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="p-2.5 bg-brand-blue/10 rounded-lg text-brand-blue border border-brand-blue/20">
              <Shield size={22} className="animate-pulse" aria-hidden="true" />
            </span>
            <div>
              <h2
                id="privacy-policy-titulo"
                className="font-display text-xl font-bold text-white uppercase tracking-wider"
              >
                Política de Privacidade &amp; LGPD
              </h2>
              <p className="text-[10px] font-mono text-stone-400 uppercase tracking-widest mt-0.5">
                Curtatchê Marketing Digital • Segurança no Supabase
              </p>
            </div>
          </div>
          <button
            type="button"
            id="close-privacy-policy-bn"
            onClick={onFechar}
            aria-label="Fechar política de privacidade"
            className="p-2.5 hover:bg-white/10 text-stone-400 hover:text-white rounded-lg transition-all cursor-pointer"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 leading-relaxed text-sm">
          <div className="p-4 bg-brand-blue/5 border border-brand-blue/20 rounded-xl flex items-start gap-3.5">
            <TriangleAlert
              className="text-brand-blue shrink-0 mt-0.5"
              size={18}
              aria-hidden="true"
            />
            <p className="text-xs text-stone-300">
              <strong className="text-white block mb-0.5">
                Compromisso com a Segurança e Privacidade
              </strong>
              Este documento assegura a integridade das interações comerciais
              nesta plataforma. Adotando a ferramenta do Supabase PostgreSQL, as
              suas informações confidenciais estão blindadas nativamente por
              regras rigorosas de segurança ao nível de registro (RLS).
            </p>
          </div>

          <div className="space-y-6">
            {secoesPrivacidade.map((secao) => {
              const { Componente, cor } = ICONES[secao.icone];
              return (
                <section
                  key={secao.titulo}
                  className="p-5 bg-white/[0.02] border border-white/5 rounded-xl hover:border-white/10 transition-colors duration-200"
                >
                  <div className="flex items-center gap-2.5 mb-3.5">
                    <span className="p-1.5 bg-white/5 rounded-md border border-white/5">
                      <Componente
                        className={cor}
                        size={20}
                        aria-hidden="true"
                      />
                    </span>
                    <h3 className="font-display font-bold text-white uppercase tracking-wider text-sm select-text">
                      {secao.titulo}
                    </h3>
                  </div>
                  <p className="text-stone-300 text-xs leading-relaxed whitespace-pre-line select-text font-sans">
                    {secao.conteudo}
                  </p>
                </section>
              );
            })}
          </div>

          <dl className="p-5 border-t border-white/10 text-xs text-stone-400 space-y-3.5 font-mono">
            <div className="flex justify-between items-center sm:items-start flex-col sm:flex-row gap-2">
              <dt>Última atualização:</dt>
              <dd className="text-white">{ATUALIZADO_EM}</dd>
            </div>
            <div className="flex justify-between items-center sm:items-start flex-col sm:flex-row gap-2">
              <dt>Responsável pelo tratamento:</dt>
              <dd className="text-white">{RESPONSAVEL}</dd>
            </div>
            <div className="flex justify-between items-center sm:items-start flex-col sm:flex-row gap-2">
              <dt>Engenharia de segurança:</dt>
              <dd className="text-[#10b981] font-semibold">
                Supabase RLS enabled
              </dd>
            </div>
          </dl>
        </div>

        <div className="p-4 bg-stone-950/60 border-t border-white/10 flex justify-end gap-3 px-6">
          <button
            type="button"
            id="privacy-policy-confirm"
            onClick={onFechar}
            className="px-5 py-2.5 bg-gradient-to-r from-brand-blue/20 to-brand-purple/20 hover:from-brand-blue/30 hover:to-brand-purple/30 text-white rounded-lg text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
          >
            Entendido &amp; Aceito
            <ArrowRight size={14} aria-hidden="true" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
