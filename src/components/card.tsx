import { Trash2 } from "lucide-react"

interface CardProps {
  imageUrl: string
  name: string
  onDelete: () => void
  isExporting: boolean
}

const Card = ({ imageUrl, name, onDelete, isExporting }: CardProps) => {
  return (
    <div className="relative flex h-[169px] w-[128px] flex-col gap-1 rounded-lg border-2 border-gray-200 p-1 text-center">
      <div className="flex flex-col items-center justify-center">
        <img
          src={imageUrl}
          alt={name}
          className="h-28 w-28 rounded-lg object-cover"
        />
        <h1 className="text-sm">{name}</h1>
      </div>

      {!isExporting && (
        <div className="absolute inset-0 flex h-full w-full flex-row justify-center gap-2">
          <button
            type="button"
            aria-label="Apagar aluno"
            onClick={onDelete}
            className="absolute -right-1 -top-1 rounded-full bg-[#F4A261] p-2 text-white hover:bg-red-600"
          >
            <Trash2 className="size-5" />
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
