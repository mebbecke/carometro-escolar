import { zodResolver } from "@hookform/resolvers/zod"
import * as Dialog from "@radix-ui/react-dialog"
import html2pdf from "html2pdf.js"
import { Plus, X } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "./button"
import Card from "./card"
import Tooltip from "./tooltip"

const formSchema = z.object({
  image: z.instanceof(FileList), // HTML file input returns a FileList array with File/Blob objects
  name: z
    .string()
    .min(3, "O nome deve ter no mínimo 3 caracteres")
    .max(30, "O nome deve ter no máximo 30 caracteres"),
})

type Student = {
  imageUrl: string
  name: string
}

type FormSchema = z.infer<typeof formSchema>

const CarometroEdit = () => {
  const [students, setStudents] = useState<Student[]>([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [classroomName, setClassroomName] = useState("")

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
  const nameLengthLimit = 30

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
      margin: [10, 10, 10, 10],
      filename: `Carômetro - ${classroomName || "Turma sem nome"}.pdf`,
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

  const changeClassroomName = () => {
    const name = document.getElementById("class") as HTMLInputElement
    if (!name.value) setClassroomName("")
    setClassroomName(name.value)
  }

  const clearClassroomName = () => {
    const name = document.getElementById("class") as HTMLInputElement
    name.value = ""
    setClassroomName("")
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-col">
        <h2 className="text-2xl font-semibold">Qual o nome da turma?</h2>
        <label htmlFor="class" className="text-sm font-semibold">
          Nome da turma (opcional)
        </label>
        <div className="flex flex-col gap-2">
          <input
            id="class"
            type="text"
            className="rounded-lg border border-gray-300 p-2"
          />
          <div className="flex w-full gap-2">
            <Button
              type="button"
              variant="secondary"
              size="full"
              onClick={() => clearClassroomName()}
            >
              Limpar turma
            </Button>
            <Button
              type="button"
              onClick={() => changeClassroomName()}
              size="full"
            >
              Definir turma
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center gap-2">
        <h2 className="text-2xl font-semibold">Adicione os alunos</h2>
        <Tooltip text="Não se preocupe com a distribuição dos alunos nessa página. No PDF, os alunos serão organizados em fileiras de 5, com 25 alunos por página." />
      </div>

      {/* Student Cards - This div will be exported in PDF */}
      <div
        id="carometro"
        className={`flex flex-col items-center gap-2 ${!isExporting && "border border-solid"}`}
      >
        {/* Class name */}
        <h3 className="mb-6 text-xl font-semibold">
          Carômetro{classroomName && ": " + classroomName}
        </h3>

        <div className="flex flex-row flex-wrap items-center justify-center gap-3">
          {isStudentArrayEmpty ? (
            <p className="mb-4 text-center text-sm text-[#B0B0B0]">
              Nenhum aluno adicionado.
            </p>
          ) : (
            /* Students display before pagination */

            // students.map((student, index) => (
            //   <div key={index} className="flex flex-col items-center gap-1">
            //     <Card
            //       imageUrl={student.imageUrl}
            //       name={student.name}
            //       onDelete={() => deleteStudent(index)}
            //       isExporting={isExporting}
            //     />
            //   </div>
            // ))

            /* Display students into pages of 25 */
            students
              .reduce((acc, student, index) => {
                const pageIndex = Math.floor(index / 25)
                if (!acc[pageIndex]) acc[pageIndex] = []
                acc[pageIndex].push(student)
                return acc
              }, [] as Student[][])
              .map((group, groupIndex) => (
                <div
                  key={groupIndex}
                  className={`mb-8 flex flex-col gap-12 text-center ${!isExporting && "border-b"}`}
                >
                  <div className="flex flex-row flex-wrap items-center justify-center gap-3">
                    {group.map((student, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-center gap-1"
                      >
                        <Card
                          imageUrl={student.imageUrl}
                          name={student.name}
                          onDelete={() =>
                            deleteStudent(index + groupIndex * 25)
                          }
                          isExporting={isExporting}
                        />
                      </div>
                    ))}
                  </div>
                  <h3 className="text-xs">Página {groupIndex + 1}</h3>
                </div>
              ))
          )}
        </div>
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
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 flex w-[90%] -translate-x-1/2 -translate-y-1/2 flex-col gap-3 rounded-lg bg-[#f5f5f5] px-3 py-2 lg:w-[600px]">
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
                  // capture="environment"
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
                  placeholder="Exemplo: Enzo Gabriel da Silva"
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

export default CarometroEdit
