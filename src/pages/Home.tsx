import clsx from "clsx"
import { pollDB } from "../scripts/SupabaseHandler"
import { MouseEventHandler } from "react"

const ctrFlex = clsx(
  "flex items-center justify-center",
)

const anim = clsx(
  "transition-color duration-[0.3s]"
)

interface ButtonProps {
  func?: MouseEventHandler<HTMLButtonElement>
  text?: string
}

function Button({ func, text = "Click Me!" }: ButtonProps) {
  const bgStyle = clsx(
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

  const textStyle = clsx(
    "text-white",
    "font-bold"
  )

  return (
    <button onClick={func}>
      <div className={bgStyle}>
        <h1 className={textStyle}>{text}</h1>
      </div>
    </button>
  )
}

function logPolledDB() {
  // poll and log database
  pollDB()
    .then((result) => {
      console.log("Polled DB successfully!")
      for (const entry of result) {
        console.log(JSON.stringify(entry))
      }
    })
}

export default function Home() {
  const containerStyle = clsx(
    "w-screen h-screen",
    ctrFlex,
  )
  return (
    <div className={containerStyle}>
      <Button func={logPolledDB} text="Log database" />
    </div>
  )
}
