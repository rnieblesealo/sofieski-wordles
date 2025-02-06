import clsx from "clsx"
import { insert } from "../scripts/SupabaseTest"

const ctrFlex = clsx(
  "flex items-center justify-center",
)

const anim = clsx(
  "transition-color duration-[0.3s]"
)

function Button() {
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
    <button onClick={insert}>
      <div className={bgStyle}>
        <h1 className={textStyle}>Upload to Supabase!</h1>
      </div>
    </button>
  )
}

export default function Home() {
  const containerStyle = clsx(
    "w-screen h-screen",
    ctrFlex,
  )
  return (
    <div className={containerStyle}>
      <Button />
    </div>
  )
}
