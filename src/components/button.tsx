import { ComponentProps, ReactNode } from "react"
import { tv, VariantProps } from "tailwind-variants"

const buttonVariants = tv({
  base: "justify-center rounded-full px-5 py-2 font-medium flex items-center gap-2",
  variants: {
    variant: {
      primary:
        "bg-[#4F8CC9] text-white hover:bg-[#3A6CA8] disabled:bg-[#B0B0B0]",
      secondary:
        "bg-white text-[#4F8CC9] hover:bg-[#4F8CC9] hover:text-white border border-2 border-[#4F8CC9]",
    },

    size: {
      default: "py-2",
      full: "w-full h-11",
    },
  },

  defaultVariants: {
    variant: "primary",
    size: "default",
  },
})

interface ButtonProps
  extends ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  children: ReactNode
}

export function Button({ children, variant, size, ...props }: ButtonProps) {
  return (
    <button {...props} className={buttonVariants({ variant, size })}>
      {children}
    </button>
  )
}