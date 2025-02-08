import clsx from "clsx"
import { pollDB } from "../scripts/SupabaseHandler"
import Wordle from "../components/Wordle"
import { WordleTile } from "../components/Wordle"
import { useState, useEffect } from "react"

export default function Home() {
  const [wordles, setWordles] = useState<React.ReactNode[]>([])

  /* NOTE: why useState and not call directly?
    * pollDB is async; DB query duration is indeterminable to us
    * we thus don't know time it'll take to get info needed to build components
    * we need to have useState assign the wordles when the time is right (.then is called)
    */

  /* NOTE: why useEffect?
    * useeffect is called once on component mount as we use it
    * if we were to call our own function with the usestate soln. above,
    * it would successfully set the state, which triggers a re-render
    * re-rendering the component calls all the code in its function again;
    * that means our function gets re-run in an infinite loop
    * yikes!
    */

  useEffect(() => {
    pollDB()
      .then((results) => {
        const generatedWordles = results.map((result) => {

          // generate tiles
          // NOTE: strings aren't inherently arrays in typescript; this is why we must split at "" to get individual chars
          // we can then use .map (there is no .map for strings)
          const tiles = result.grid.split("").map((code: string) => {
            switch (code) {
              case "w":
                return <WordleTile color="#ffffff" />
              case "y":
                return <WordleTile color="#f3a833" />
              case "g":
                return <WordleTile color="#5ab552" />
              default:
                return <WordleTile color="#000000" />
            }
          })

          // generate wordle
          return (
            <Wordle
              tiles={tiles}
              number={result.wordle_number}
              tries={result.tries}
              date={result.date ?? ""}
            />
          )

        })

        setWordles(generatedWordles)

      })
      .catch((error) => {
        console.error("Unable to generate Wordle component: ", error)
      })
  }, [])

  const mainContainer = clsx(
    "w-screen",
    "h-screen",
    "flex",
    "flex-col",
    "items-center",
  )

  const gradient = clsx(
    "bg-gradient-to-b",
    "from-[#6E2C8D]",
    "via-[#CA207F]",
    "via-[#F3554C]",
    "to-[#FBE156]"
  )

  const wordleContainer = clsx(
    "w-screen",
    "h-min-content",
    "flex",
    "flex-wrap",
    "justify-center",
    "gap-[5px]",
    "z-[1]"
  )

  const titleContainer = clsx(
    "font-cuba",
    "font-[800]",
    "text-[64px]",
    "text-white",
    "flex",
    "flex-row",
    "items-center",
  )

  const title = clsx(
    "text-center"
  )

  const profileImage = clsx(
    "transform scale-[110%]",
    "relative z-[0]",
  )

  return (
    <div className={`${mainContainer} ${gradient} text-stroke`}>
      <h1 className={titleContainer}>
        <span className={title}>sofieski's wordels</span>
        <img className={profileImage} src="public/sofieski.png" width="200px" />
      </h1>
      <div className={wordleContainer}>
        {wordles}
      </div>
    </div >
  )
}
