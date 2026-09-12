import { WHATSAPP } from "../data/redes";

const MENSAGEM = "Olá! Vim pelo site e gostaria de falar sobre um projeto.";

export default function BotaoWhatsApp() {
  const href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(MENSAGEM)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar pelo WhatsApp"
        className="group flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white px-4 py-3 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all"
      >
        <span aria-hidden="true" className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
        </span>
        <svg
          aria-hidden="true"
          className="w-5 h-5 fill-current"
          viewBox="0 0 24 24"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.512 5.28 3.511 8.484 0 6.662-5.415 12.078-12.077 12.078-1.995 0-3.951-.5-5.688-1.448l-5.974 1.562zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.591 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.98zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.347-.347.521-.521.174-.174.232-.298.347-.497.116-.198.058-.372-.015-.521-.074-.149-.669-1.611-.916-2.206-.199-.477-.4-.452-.546-.46-.144-.008-.309-.01-.474-.01-.165 0-.433.062-.66.31-.226.248-.863.842-.863 2.055 0 1.213.884 2.386 1.007 2.55.124.165 1.739 2.655 4.213 3.724.589.254 1.048.406 1.407.52.591.188 1.128.161 1.554.098.475-.07 1.633-.668 1.864-1.312.231-.644.231-1.196.157-1.312z" />
        </svg>
        <span className="max-w-0 overflow-hidden group-hover:max-w-[125px] transition-all duration-300 ease-out whitespace-nowrap">
          Falar pelo WhatsApp
        </span>
      </a>
    </div>
  );
}
