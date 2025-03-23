export const About = () => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-center text-2xl font-semibold">Sobre o carômetro</h1>
      <p>
        Esse aplicativo "carômetro", construido junto a uma comunidade de
        professores, é uma ferramenta para facilitar o reconhecimento de alunos
        em uma sala de aula.
      </p>
      <p>
        No app você pode montar o carômetro de sua sala de aula enviando fotos
        dos alunos e seus nomes, e será gerado um arquivo pdf que você pode
        salvar no seu computador, celular ou até imprimir.
      </p>
      <p>
        Sugestões e críticas são bem-vindas, deixe suas ideias entrando em
        contato comigo{" "}
        <span className="font-semibold">
          <a href="mailto:m.ebbecke@gmail.com" target="_blank">
            através de um e-mail
          </a>
        </span>
        .
      </p>

      <h2 className="text-xl font-semibold">
        O que o gerador de carômetro faz:
      </h2>
      <ul className="list-inside list-disc">
        <li>
          Monta um carômetro com fotos adicionadas dos seus arquivos (no pc), ou
          da galeria ou câmera (no celular).
        </li>
        <li>Exporta o carômetro montado no formato PDF.</li>
      </ul>

      <h2 className="text-xl font-semibold">
        O que ele <span className="font-bold text-red-500">não</span> faz:
      </h2>
      <ul className="list-inside list-disc">
        <li>
          O carômetro não fica salvo no site, ou seja, ainda não é possível
          consultar carômetros gerados anteriormente.
        </li>
      </ul>
    </div>
  )
}
