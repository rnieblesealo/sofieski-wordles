import { createClient } from "@supabase/supabase-js"

const SUPABASE_URL: string = import.meta.env.VITE_SUPABASE_URL ?? ""
const SUPABASE_KEY: string = import.meta.env.VITE_SUPABASE_ANON_KEY ?? ""

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

interface DBValue {
  id?: number
  key: string
  value: string
}

export async function insert(): Promise<void> { // NOTE: async = function may voluntarily pause execution using await 

  // Test vals, I don't think we can pass args to JSX click functions
  const key: string = "sofi"
  const value: string = "eski"

  // NOTE: await = wait for supabase to finish before continue
  const { data, error } = await supabase
    .from("key_value_store") // Select KV store table
    .insert([{ key, value } as DBValue]) // Insert row into table; 

  /* The resulting table entry would look like this
   * [  key   | value ]
   * [--------|-------]
   * [ "sofi" |   32  ]
  */

  if (error) {
    console.error(`Error inserting row: ${error.message}`)
  } else {
    console.log(`Inserted successfully! Data: ${data}`)
  }
}
