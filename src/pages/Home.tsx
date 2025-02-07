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

interface WordleTileProps {
  color: string
}

function WordleTile({ color }: WordleTileProps) {
  const styles = clsx(
    "w-[20%]",
    "h-[15%]",
    "aspect-[1/1]",
    "rounded-[4px]",
    "scale-[90%]"
  )

  return (
    <div className={styles} style={{ backgroundColor: color }}>
    </div >
  )
}

interface WordleProps {
  tiles?: React.ReactNode // use reactnode for child
}

export function Wordle({ tiles }: WordleProps) {
  const container = clsx(
    "w-[200px]",
    "bg-black",
    "rounded-[30px]",
    "pt-[12.5px]",
    "pb-[15px]"
  )

  const text = clsx(
    "font-bold",
    "text-white",
    "flex",
    "justify-center"
  )

  const tileContainer = clsx(
    "flex",
    "flex-row",
    "flex-wrap",
    "m-[5%]",
    "justify-left",
    "items-center"
  )

  const dimText = clsx(
    "font-bold",
    "text-gray-500",
    "text-[12px]",
    "flex",
    "justify-center"
  )

  return (
    <div className={container}>
      <span className={text}>13,200</span>
      <div className={tileContainer}>
        {tiles}
      </div>
      <span className={text}>4/6</span>
      <span className={dimText}>12/12/2024</span>
    </ div >
  )
}

export default function Home() {
  const container = clsx(
    "w-screen h-screen",
    ctrFlex,
  )

  const tiles = (
    <>
      <WordleTile color="#00ff00" />
      <WordleTile color="#00ff00" />
      <WordleTile color="#00ff00" />
      <WordleTile color="#00ff00" />
      <WordleTile color="#00ff00" />
      <WordleTile color="#00ff00" />
      <WordleTile color="#00ff00" />
      <WordleTile color="#00ff00" />
      <WordleTile color="#00ff00" />
      <WordleTile color="#00ff00" />
      <WordleTile color="#00ff00" />
    </>
  )

  return (
    <div className={container}>
      <Button func={logPolledDB} />
      <Wordle tiles={tiles} />
    </div>
  )
}
