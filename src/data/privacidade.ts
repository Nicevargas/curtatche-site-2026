/**
 * Conteúdo da Política de Privacidade / LGPD, exibida no modal do rodapé.
 *
 * Texto preservado do site original, com duas correções: a sigla estava escrita
 * "LGPDo" no item 3, e as linhas vinham indentadas de dentro de um template
 * literal — o que aparecia como espaço sobrando, já que o parágrafo é renderizado
 * com whitespace-pre-line.
 */

export type NomeIcone = "eye" | "lock" | "file-text" | "circle-check";

export interface SecaoPrivacidade {
  icone: NomeIcone;
  titulo: string;
  conteudo: string;
}

export const ATUALIZADO_EM = "20 de Junho de 2026";
export const RESPONSAVEL = "Curtatchê Marketing Digital";

export const secoesPrivacidade: SecaoPrivacidade[] = [
  {
    icone: "eye",
    titulo: "1. Quais dados coletamos?",
    conteudo: `Nós coletamos apenas as informações estritamente necessárias para poder desenhar, orçar e formalizar sua proposta de software comercial ou website.

• Dados de Formulários: Nome completo, endereço de correio eletrônico (e-mail), nome da empresa, número de telefone para contato profissional, e eventuais especificações técnicas descritas na solicitação de orçamento.
• Dados Contratuais: Caso prossiga para a assinatura eletrônica, coletamos CPF ou CNPJ, endereço completo de sede ou residência para qualificação civil, número de telefone e e-mail para comunicação direta e envio da cópia em formato PDF.
• Logs e Cookies de Sessão: Cookies temporários necessários para o login administrativo seguro e para manter a sessão ativa enquanto você edita ou revisa o contrato.`,
  },
  {
    icone: "lock",
    titulo: "2. Como armazenamos e protegemos seus dados?",
    conteudo: `A segurança dos seus dados é de máxima prioridade para nós. Com a transição do banco local para a nuvem de nível corporativo do Supabase (PostgreSQL), adotamos os seguintes padrões fundamentais:

• Criptografia no Tráfego: Todas as comunicações entre o site e o banco Supabase são realizadas de forma segura e encapsulada por meio de conexão segura SSL/TLS.
• Row Level Security (RLS): Implementamos políticas exclusivas ao nível de cada linha de banco de dados. Um cliente comum ou visitante público nunca conseguirá visualizar, consultar ou alterar dados de outros cadastros. Seus dados estão em um cofre fechado com o seu próprio ID exclusivo como chave.
• Chaves de Serviço Ocultas: Apenas chaves de escopo estrito e público são carregadas no navegador, enquanto as chaves de manipulação massiva (super-usuário) são preservadas ocultas nos servidores do backend.`,
  },
  {
    icone: "file-text",
    titulo: "3. Finalidade e Base Legal (LGPD)",
    conteudo: `Todo tratamento de informação pessoal na Curtatchê é pautado pela Lei Geral de Proteção de Dados (LGPD — Lei n.º 13.709/2018). As bases legais correspondentes são:

• Execução de Contrato: Processamos os seus dados pessoais (qualificação, objeto e acordos) e criamos assinaturas com o único intuito de formalizar e executar o contrato de desenvolvimento técnico estabelecido entre as partes.
• Legítimo Interesse: Utilizamos o seu e-mail ou número de contato para responder a orçamentos e emitir atualizações referentes ao progresso de suas demandas técnicas contratadas.`,
  },
  {
    icone: "circle-check",
    titulo: "4. Seus Direitos como Titular",
    conteudo: `Em conformidade com o Artigo 18 da LGPD, você possui plenos direitos sobre as suas informações, os quais podem ser exercidos enviando uma mensagem aos nossos canais oficiais:

• Confirmação e Acesso: Confirmar a existência de tratamento e solicitar acesso completo às suas informações cadastradas.
• Portabilidade e Correção: Solicitar retificação imediata de e-mails, telefones, endereços ou CPFs errados nas vias de contrato.
• Direito ao Esquecimento / Exclusão: Requerer o expurgo total de seus dados de nossa base (Supabase) após finalizado o contrato sob as hipóteses previstas em lei.`,
  },
];
