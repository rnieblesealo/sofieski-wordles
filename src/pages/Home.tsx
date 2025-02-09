import clsx from "clsx"
import { supabase } from "../scripts/SupabaseHandler"
import Wordle from "../components/Wordle"
import { WordleTile } from "../components/Wordle"
import { useState, useEffect } from "react"
import { FaHeart } from "react-icons/fa";

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
    // database poll function
    const pollDB = async () => {
      // grab data from db table
      const { data, error } = await supabase.from("wordle_values").select("*")
      if (error) {
        throw error; // will abort if issue happened
      }

      // generate wordles using data
      const generatedWordles = data.map((result) => {
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

        // make component
        return (
          <Wordle
            tiles={tiles}
            number={result.wordle_number}
            tries={result.tries}
            date={result.date ?? ""}
          />
        )
      })

      // store generated components
      setWordles(generatedWordles)
    }

    // subscription (newly updated to channel) to update on database modification
    const channel = supabase
      .channel("wordle_values")
      .on("postgres_changes", { event: "*", schema: "public", table: "wordle_values" }, () => {
        pollDB();
      })
      .subscribe()

    // fetch data initially
    pollDB()

    // return function of useeffect is cleanup
    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const mainContainer = clsx(
    "w-full",
    "h-full",
    "flex",
    "flex-col",
    "items-center",
    "overflow-hidden",
    "bg-gradient-to-b",
    "from-[#6E2C8D]",
    "via-[#CA207F]",
    "via-[#F3554C]",
    "to-[#FBE156]",
  )

  const wordleContainer = clsx(
    "w-min-content",
    "h-min-content",
    "flex",
    "flex-wrap",
    "justify-center",
    "gap-[5px]",
    "z-[1]"
  )

  const titleContainer = clsx(
    "flex",
    "flex-row",
    "items-center",
  )

  const title = clsx(
    "font-cuba",
    "font-[800]",
    "text-[40px]",
    "md:text-[60px]",
    "lg:text-[80px]",
    "text-white",
    "text-center"
  )

  const profileImage = clsx(
    "transform scale-[110%]",
    "relative z-[0]",
  )

  const jumpIn = clsx(
    "animate-jump-in"
  )

  const flipUp = clsx(
    "animate-flip-up",
    "animate-once",
    "animate-ease-out",
    "animate-fill-both"
  )

  const footer = clsx(
    "w-full",
    "bg-black",
    "text-white",
    "font-funnel",
    "text-[20px]",
    "text-center",
    "font-bold",
    "flex",
    "justify-center"
  )

  const signature = clsx(
    "font-tiny5",
    "font-bold",
    "flex",
    "justify-center",
    "items-center",
    "self-end",
    "w-[100%]",
    "gap-[5px]"
  )

  return (
    <div className={mainContainer}>
      <div className={"h-full overflow-y-auto"}>
        <h1 className={titleContainer}>
          <span className={`${title} ${flipUp}`}>sofieski's wordels</span>
          <img className={`${profileImage} ${jumpIn}`} src="/sofieski.png" width="200px" />
        </h1>
        <div className={wordleContainer}>
          {wordles}
        </div>
      </div >
      <footer className={footer}>
        <span className={signature}>Built with <FaHeart color="#F90605" /> by Rafa</span>
      </footer>
    </div >
  )
}
