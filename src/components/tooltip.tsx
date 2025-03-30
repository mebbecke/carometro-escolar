import {
  Content as TooltipContent,
  Portal as TooltipPortal,
  Provider as TooltipProvider,
  Root as TooltipRoot,
  Trigger as TooltipTrigger,
} from "@radix-ui/react-tooltip"
import { Info } from "lucide-react"

interface TooltipProps {
  text: string
}

const Tooltip = ({ text }: TooltipProps) => (
  <TooltipProvider delayDuration={500}>
    <TooltipRoot>
      <TooltipTrigger asChild>
        <Info size={20} />
      </TooltipTrigger>
      <TooltipPortal>
        <TooltipContent
          sideOffset={10}
          className="max-w-[300px] rounded bg-white px-3 py-2 text-sm text-gray-500 shadow-md"
        >
          {text}
        </TooltipContent>
      </TooltipPortal>
    </TooltipRoot>
  </TooltipProvider>
)

export default Tooltip
