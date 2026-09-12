/**
 * Recebe o formulário de orçamento e envia por SMTP.
 *
 * Roda como função serverless na Vercel (qualquer arquivo em api/ vira rota).
 * Substitui o servidor Express que existia antes — o backend anterior também
 * expunha /api/clients e /api/send-contract-email sem autenticação nenhuma, e
 * essas rotas foram deliberadamente deixadas de fora: pertencem ao painel
 * administrativo, que não faz parte do site público.
 *
 * Credenciais vêm de variáveis de ambiente (ver .env.example). Nunca no código.
 */
import nodemailer from "nodemailer";

interface Lead {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  projectType?: string;
  details?: string;
}

const LIMITE_POR_JANELA = 5;
const JANELA_MS = 10 * 60 * 1000;
/**
 * Controle de abuso simples, por IP e em memória. Instâncias serverless são
 * efêmeras e independentes, então isso segura rajadas de um mesmo visitante,
 * não um ataque distribuído — para esse caso o certo é WAF ou Vercel Firewall.
 */
const acessos = new Map<string, number[]>();

function excedeuLimite(ip: string): boolean {
  const agora = Date.now();
  const recentes = (acessos.get(ip) ?? []).filter((t) => agora - t < JANELA_MS);
  recentes.push(agora);
  acessos.set(ip, recentes);
  return recentes.length > LIMITE_POR_JANELA;
}

function limpar(valor: unknown, max = 2000): string {
  return typeof valor === "string" ? valor.trim().slice(0, max) : "";
}

const EMAIL_VALIDO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default async function handler(req: Request): Promise<Response> {
  const json = (corpo: unknown, status: number) =>
    new Response(JSON.stringify(corpo), {
      status,
      headers: { "Content-Type": "application/json" },
    });

  if (req.method !== "POST") {
    return json({ error: "Método não permitido." }, 405);
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "desconhecido";
  if (excedeuLimite(ip)) {
    return json(
      { error: "Muitas tentativas. Tente novamente em alguns minutos." },
      429,
    );
  }

  let lead: Lead;
  try {
    lead = (await req.json()) as Lead;
  } catch {
    return json({ error: "Não foi possível ler os dados enviados." }, 400);
  }

  const nome = limpar(lead.name, 120);
  const email = limpar(lead.email, 160);
  const telefone = limpar(lead.phone, 40);
  const empresa = limpar(lead.company, 160);
  const tipo = limpar(lead.projectType, 80);
  const detalhes = limpar(lead.details, 4000);

  if (!nome || !email || !tipo) {
    return json(
      { error: "Nome, e-mail e tipo de projeto são obrigatórios." },
      400,
    );
  }
  if (!EMAIL_VALIDO.test(email)) {
    return json({ error: "O e-mail informado não parece válido." }, 400);
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTATO_DESTINO } =
    process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !CONTATO_DESTINO) {
    // Mensagem genérica para o visitante; o motivo real fica no log do servidor.
    console.error("SMTP não configurado: verifique as variáveis de ambiente.");
    return json(
      { error: "Não foi possível enviar agora. Tente pelo WhatsApp." },
      503,
    );
  }

  const porta = Number(SMTP_PORT ?? 587);

  try {
    const transporte = nodemailer.createTransport({
      host: SMTP_HOST,
      port: porta,
      secure: porta === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    const linhas = [
      `Nome: ${nome}`,
      `E-mail: ${email}`,
      telefone && `Telefone: ${telefone}`,
      empresa && `Empresa: ${empresa}`,
      `Tipo de projeto: ${tipo}`,
      "",
      "Requisitos:",
      detalhes || "(não informado)",
    ].filter(Boolean);

    await transporte.sendMail({
      from: `"Site Curtatchê" <${SMTP_USER}>`,
      to: CONTATO_DESTINO,
      replyTo: email,
      subject: `Orçamento pelo site — ${nome} (${tipo})`,
      text: linhas.join("\n"),
    });

    return json({ ok: true }, 200);
  } catch (erro) {
    console.error("Falha no envio SMTP:", erro);
    return json(
      { error: "Não foi possível enviar agora. Tente pelo WhatsApp." },
      502,
    );
  }
}
