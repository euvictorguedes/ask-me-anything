import { useParams } from "react-router-dom";
import { ArrowRight, ArrowUp, Share2 } from "lucide-react";
import { toast } from "sonner";

export function Room() {
  const { roomId } = useParams();

  function handleShareRoom() {
    const url = window.location.href.toString();

    if (navigator.share !== undefined && navigator.canShare()) {
      navigator.share({ url });
    } else {
      navigator.clipboard.writeText(url);
      toast.info("The room url was copied to your clipboard!");
    }
  }

  return (
    <div className="mx-auto max-w-[640px] flex flex-col gap-6 py-10 px-4">
      <div className="flex items-center gap-3 px-3">
        <img src="/logo.svg" alt="Ask Me Anything" className="h-5" />

        <span className="text-sm text-zing-500 truncate">
          Código da sala: <span className="text-zinc-300">{roomId}</span>
        </span>

        <button
          type="submit"
          onClick={handleShareRoom}
          className="ml-auto bg-zinc-800 text-zinc-300 px-3 py-1.5 gap-1.5 flex items-center rounded-lg font-medium text-sm hover:bg-zinc-700 transition-colors"
        >
          Compartilhar
          <Share2 className="size-4" />
        </button>
      </div>

      <div className="h-px w-full bg-zinc-900" />

      <form className="flex items-center gap-2 bg-zinc-900 p-2 rounded-xl border border-zinc-800 ring-orange-400 ring-offset-2 ring-offset-zinc-950 focus-within:ring-1">
        <input
          type="text"
          name="theme"
          placeholder="Qual a sua pergunta?"
          autoComplete="off"
          className="flex-1 text-sm bg-transparent mx-2 outline-none placeholder:text-zinc-500 text-zinc-100"
        />

        <button
          type="submit"
          className="bg-orange-400 text-orange-950 px-3 py-1.5 gap-1.5 flex items-center rounded-lg font-medium text-sm hover:bg-orange-500 transition-colors"
        >
          Criar pergunta
          <ArrowRight className="size-4" />
        </button>
      </form>

      <ol className="list-decimal list-outside px-3 space-y-8">
        <li className="ml-4 leading-relaxed text-zinc-100">
          O que é GoLang e quais são suas principais vantagens em comparação com
          outras linguagens de programação como Python, Java ou C++?
          <button
            type="button"
            className="mt-3  flex items-center gap-2 text-zinc-400 text-sm font-medium hover:text-zinc-300"
          >
            <ArrowUp className="size-4" />
            Curtir pergunta (123)
          </button>
        </li>
        <li className="ml-4 leading-relaxed text-zinc-100">
          Como funcionam as goroutines em GoLang e por que elas são importantes
          para a concorrência e paralelismo?
          <button
            type="button"
            className="mt-3  flex items-center gap-2 text-orange-400 text-sm font-medium hover:text-orange-500"
          >
            <ArrowUp className="size-4" />
            Curtir pergunta (182)
          </button>
        </li>
        <li className="ml-4 leading-relaxed text-zinc-100">
          Quais são as melhores práticas para organizar o código em um projeto
          GoLang, incluindo pacotes, módulos e a estrutura de diretórios?
          <button
            type="button"
            className="mt-3  flex items-center gap-2 text-zinc-400 text-sm font-medium hover:text-zinc-300"
          >
            <ArrowUp className="size-4" />
            Curtir pergunta (123)
          </button>
        </li>
        <li className="ml-4 leading-relaxed text-zinc-100">
          Como fazer a depuração de programas GoLang e quais ferramentas são
          recomendadas para isso?
          <button
            type="button"
            className="mt-3  flex items-center gap-2 text-orange-400 text-sm font-medium hover:text-orange-500"
          >
            <ArrowUp className="size-4" />
            Curtir pergunta (182)
          </button>
        </li>
        <li className="ml-4 leading-relaxed text-zinc-100">
          Quais são os primeiros passos para começar a programar em GoLang,
          incluindo a instalação do ambiente de desenvolvimento, configuração e
          execução do primeiro programa?
          <button
            type="button"
            className="mt-3  flex items-center gap-2 text-orange-400 text-sm font-medium hover:text-orange-500"
          >
            <ArrowUp className="size-4" />
            Curtir pergunta (182)
          </button>
        </li>
        <li className="ml-4 leading-relaxed text-zinc-100">
          Como funciona o gerenciamento de memória em GoLang, incluindo a coleta
          de lixo (garbage collection)? Quais são as implicações de desempenho e
          como otimizar o uso de memória em programas Go? Quais são as
          diferenças entre alocação na stack e no heap, e como essas diferenças
          afetam a eficiência do programa?
          <button
            type="button"
            className="mt-3  flex items-center gap-2 text-zinc-400 text-sm font-medium hover:text-zinc-300"
          >
            <ArrowUp className="size-4" />
            Curtir pergunta (123)
          </button>
        </li>
      </ol>
    </div>
  );
}
