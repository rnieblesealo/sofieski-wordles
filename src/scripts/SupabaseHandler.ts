import { createClient } from "@supabase/supabase-js"

const SUPABASE_URL: string = import.meta.env.VITE_SUPABASE_URL ?? ""
const SUPABASE_KEY: string = import.meta.env.VITE_SUPABASE_KEY ?? ""

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// WARN: rls is OFF for this to work, and there ain't no way that's ok for business

export interface WordleInfo {
  id?: number;
  date: string;
  wordle_number: number;
  tries: number;
  grid: string;
}

export async function pollDB(): Promise<WordleInfo[]> {
  // NOTE: auto promise bc. async
  // throw error instead of doing reject
  // return what's promised directly instead of doing resolve 

  const { data, error } = await supabase
    .from("wordle_values")
    .select("*")
    .returns<WordleInfo[]>();

  if (error) {
    throw new Error(error.message)
  }

  // empty array returned if data nonexistent
  return data || []
}
