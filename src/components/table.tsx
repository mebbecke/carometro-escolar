import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import html2pdf from "html2pdf.js"
import { Plus, X } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import * as Dialog from "@radix-ui/react-dialog"
import { Button } from "./button"
import Card from "./card"

const formSchema = z.object({
  image: z.instanceof(FileList), // HTML file input returns a FileList array with File/Blob objects
  name: z
    .string()
    .min(3, "O nome deve ter no mínimo 3 caracteres")
    .max(15, "O nome deve ter no máximo 15 caracteres"),
})

type Student = {
  imageUrl: string
  name: string
}

type FormSchema = z.infer<typeof formSchema>

const Table = () => {
  const [students, setStudents] = useState<Student[]>([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isExporting, setIsExporting] = useState(false)

  const isStudentArrayEmpty = students.length === 0

  const methods = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: new DataTransfer().files,
      name: "",
    },
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = methods

  /* Characters limit handling */
  const nameLength = methods.watch("name").length
  const nameLengthLimit = 15

  const onSubmit = (data: FormSchema) => {
    if (data.image.length === 0) {
      setError("image", { message: "Selecione uma imagem" })
    } else {
      const reader = new FileReader()
      reader.readAsDataURL(data.image[0]) // reads the first item of FileList array as a URL
      reader.onloadend = () => {
        /* Insert the new student at the end of the array */
        // setStudents([
        //   ...students,
        //   { imageUrl: reader.result as string, name: data.name },
        // ])

        /* Insert the new student in alphabetic order */
        const newStudent = {
          imageUrl: reader.result as string,
          name: data.name,
        }
        setStudents((prevStudents) => {
          const updatedStudents = [...prevStudents, newStudent]
          return updatedStudents.sort((a, b) => a.name.localeCompare(b.name))
        })
      }
      setIsAddDialogOpen(false)
      reset()
    }
  }

  const deleteStudent = (index: number) => {
    setStudents(students.filter((_, i) => i !== index))
  }

  const clearStudents = () => {
    setStudents([])
  }

  const generatePdf = () => {
    setIsExporting(true)
    const element = document.querySelector("#carometro")

    if (!element) {
      console.error(`Elemento com ID "carometro" não encontrado.`)
      return
    }

    const opt = {
      margin: 20,
      filename: "carometro.pdf",
      image: { type: "jpeg", quality: 5 },
    }

    html2pdf()
      .set(opt)
      .from(element)
      .save()
      .finally(() => {
        setIsExporting(false)
      })
  }

  return (
    <div className="flex w-full flex-col gap-3">
      {/* Students Table */}
      {/* <table id="carometro" className="min-w-full border border-gray-200">
        <thead className="border-b border-b-gray-200 text-sm">
          <tr>
            <th className="p-2 text-start">Foto</th>
            <th className="p-2 text-start">Nome do aluno</th>
            <th className="hidden-in-pdf p-2 text-center">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 text-start">
          {isStudentArrayEmpty ? (
            <tr>
              <td colSpan={3} className="text-center text-sm text-[#B0B0B0]">
                Nenhum aluno adicionado
              </td>
            </tr>
          ) : (
            students.map((student, index) => (
              <tr key={index}>
                <td className="w-[89px] p-1">
                  <img
                    src={student.imageUrl}
                    alt={student.name}
                    className="h-20 w-20 rounded-lg object-cover"
                  />
                </td>
                <td className="px-2">{student.name}</td>
                <td className="hidden-in-pdf text-center">
                  <button
                    type="button"
                    aria-label="Apagar aluno"
                    onClick={() => deleteStudent(index)}
                  >
                    <Trash2 className="size-5 hover:text-red-600" />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table> */}

      {/* Student Cards */}
      <div
        id="carometro"
        className="flex flex-row flex-wrap items-center justify-center gap-3"
      >
        {isStudentArrayEmpty ? (
          <p className="text-center text-sm text-[#B0B0B0]">
            Nenhum aluno adicionado
          </p>
        ) : (
          students.map((student, index) => (
            <Card
              key={index}
              imageUrl={student.imageUrl}
              name={student.name}
              onDelete={() => deleteStudent(index)}
              isExporting={isExporting}
            />
          ))
        )}
      </div>

      {/* Add student dialog */}
      <Dialog.Root open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
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

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-3"
            >
              <div className="flex flex-col">
                <label htmlFor="image" className="font-semibold">
                  Foto do aluno
                </label>
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="rounded-lg border border-gray-300 p-2"
                  {...register("image")}
                />
                {errors.image && (
                  <span className="text-sm text-red-600">
                    {errors.image.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <label htmlFor="name" className="font-semibold">
                  Nome do aluno
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Exemplo: Enzo Gabriel dos Santos"
                  className="w-full rounded-lg border border-gray-300 p-2"
                  {...register("name")}
                />
                <span
                  className={`text-sm ${nameLength > nameLengthLimit && "text-red-600"}`}
                >
                  {nameLength}/{nameLengthLimit}
                </span>
                {errors.name && (
                  <span className="text-sm text-red-600">
                    {errors.name.message}
                  </span>
                )}
              </div>
              <Button type="submit" size="full">
                Adicionar aluno
              </Button>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <div className="flex w-full flex-row gap-3">
        {/* Clear students dialog */}
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <Button
              type="button"
              variant="secondary"
              className="flex-1"
              disabled={isStudentArrayEmpty}
            >
              Limpar alunos
            </Button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-40 bg-black opacity-30" />
            <Dialog.Content className="fixed left-1/2 top-1/2 z-50 flex w-[90%] -translate-x-1/2 -translate-y-1/2 flex-col gap-3 rounded-lg bg-[#f5f5f5] px-3 py-2">
              <div className="flex flex-row items-center justify-between">
                <Dialog.Title className="text-nowrap text-xl font-bold">
                  Tem certeza?
                </Dialog.Title>
                <Dialog.Close className="flex w-full justify-end">
                  <X />
                </Dialog.Close>
              </div>
              <Dialog.Description>
                Isso apagará todos os alunos adicionados.
              </Dialog.Description>
              <Dialog.Close asChild>
                <Button variant="destructive" onClick={clearStudents}>
                  Limpar tudo
                </Button>
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>

        <Button
          type="button"
          className="flex-1"
          disabled={isStudentArrayEmpty || isExporting}
          onClick={generatePdf}
        >
          {isExporting ? "Gerando PDF..." : "Gerar Carômetro"}
        </Button>
      </div>
    </div>
  )
}

export default Table
