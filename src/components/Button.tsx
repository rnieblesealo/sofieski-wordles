import clsx from "clsx"
import { MouseEventHandler } from "react"

interface ButtonProps {
  func?: MouseEventHandler<HTMLButtonElement>
  text?: string
}

export default function Button({ func, text = "Click Me!" }: ButtonProps) {
  const ctrFlex = clsx(
    "flex items-center justify-center",
  )

  const anim = clsx(
    "transition-color duration-[0.3s]"
  )

  const bg = clsx(
    anim,
    ctrFlex,
    "cursor-pointer",
    "bg-red-500",
    "rounded-[20px]",
    "w-[200px]",
    "h-[100px]",

    "hover:bg-red-600",

    "active:bg-red-800"
  )

  const textStyles = clsx(
    "text-white",
    "font-bold"
  )

  return (
    <button onClick={func}>
      <div className={bg}>
        <h1 className={textStyles}>{text}</h1>
      </div>
    </button>
  )
}
