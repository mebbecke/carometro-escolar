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
    </div>
  )
}
