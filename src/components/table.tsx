// import { useState } from "react"
import { Plus, X } from "lucide-react"
import * as Dialog from "@radix-ui/react-dialog"
import { Button } from "./button"

const Table = () => {
  // const [rows, setRows] = useState<TableRow[]>([])

  return (
    <div className="flex w-full flex-col gap-3">
      <table className="min-w-full table-auto divide-gray-200 border">
        <thead>
          <tr>
            <th>Foto do aluno</th>
            <th>Nome</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>

      {/* Dialog */}
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <Button size="full" aria-label="Adicionar aluno">
            <Plus />
          </Button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-40 bg-black opacity-30" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 flex w-[90%] -translate-x-1/2 -translate-y-1/2 flex-col gap-3 rounded-lg bg-[#f5f5f5] px-3 py-2">
            <div className="flex flex-row items-center justify-between">
              <Dialog.Title className="text-nowrap text-xl font-bold">
                Adicionar aluno
              </Dialog.Title>
              <Dialog.Close className="flex w-full justify-end">
                <X />
              </Dialog.Close>
            </div>

            <Dialog.Description>
              Adicione a foto e o nome do aluno e clique em adicionar quando
              terminar.
            </Dialog.Description>

            <form className="flex flex-col gap-3">
              <div>
                <label htmlFor="image" className="font-semibold">
                  Foto do aluno
                </label>
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  className="rounded-lg border border-gray-300 p-2"
                />
              </div>

              <div>
                <label htmlFor="name" className="font-semibold">
                  Nome do aluno
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enzo Gabriel dos Santos"
                  className="rounded-lg border border-gray-300 p-2"
                />
              </div>
              <Button size="full">Adicionar aluno</Button>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}

export default Table
