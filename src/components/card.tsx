import { Trash2 } from "lucide-react"

interface CardProps {
  imageUrl: string
  name: string
  onDelete: () => void
  isExporting: boolean
}

const Card = ({ imageUrl, name, onDelete, isExporting }: CardProps) => {
  return (
    <div className="relative flex w-[142px] flex-col gap-2 rounded-lg border-2 border-gray-200 p-3 text-center">
      <img
        src={imageUrl}
        alt={name}
        className="h-28 w-28 rounded-lg object-cover"
      />
      <h1>{name}</h1>

      {!isExporting && (
        <div className="flex w-full flex-row justify-center gap-2">
          <button type="button" aria-label="Apagar aluno" onClick={onDelete}>
            <Trash2 className="size-5 hover:text-red-600" />
          </button>
        </div>
      )}

      {/* <div className="absolute inset-0 z-20 flex h-full w-full justify-center rounded-lg bg-[#B0B0B070] opacity-0 transition-opacity duration-300 hover:opacity-100">
        <button type="button" aria-label="Apagar aluno" onClick={onDelete}>
          <Trash2 className="size-8 hover:text-red-600" />
        </button>
      </div> */}
    </div>
  )
}

export default Card
