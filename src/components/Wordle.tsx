import clsx from "clsx"
import formatDate from "../scripts/formatDate"
import getWordForDate from "../scripts/getWordForDate"

interface WordleTileProps {
  color: string
}

export function WordleTile({ color }: WordleTileProps) {
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
  number: number
  tries: number
  date: string
}

export default function Wordle({ tiles, number, tries, date }: WordleProps) {
  const container = clsx(
    "w-[200px]",
    "bg-[#101415]",
    "rounded-[30px]",
    "pt-[12.5px]",
    "pb-[15px]"
  )

  const text = clsx(
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
    "text-gray-500",
    "text-[12px]",
    "flex",
    "justify-center"
  )

  const smallText = clsx(
    "text-white",
    "text-[12px]",
    "flex",
    "justify-center"
  )

  const boldText = clsx(
    "flex",
    "justify-center",
    "text-white",
    "font-bold"
  )

  const word = getWordForDate(date)
  const formattedWord = word.charAt(0).toUpperCase() + word.slice(1)

  return (
    <div className={container}>
      <span className={text}>{number.toLocaleString()}</span>
      <div className={tileContainer}>
        {tiles}
      </div>
      <span className={boldText}>{`"${formattedWord}"`}</span>
      <span className={smallText}>{`${tries}/6`}</span>
      <span className={dimText}>{formatDate(date)}</span>
    </ div >
  )
}
