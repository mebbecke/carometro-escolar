import Table from "../components/table"

const Carometro = () => {
  return (
    <div className="flex w-full flex-col items-center gap-6">
      <div className="text-center">
        <h1 className="text-3xl font-semibold">Gerador de carômetro</h1>
        <p>
          Clique em "+" para adicionar novos alunos, e quando estiver pronto,
          clique em "Gerar Carômetro".
        </p>
      </div>
      <Table />
    </div>
  )
}

export default Carometro