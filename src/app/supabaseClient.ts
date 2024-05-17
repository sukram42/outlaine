import { createClient } from "@supabase/supabase-js"
import { Database } from "./supabase"

const supabaseUrl = 'https://lsxgepyhuhidvpsdsnli.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxzeGdlcHlodWhpZHZwc2RzbmxpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE5MTA3NDIsImV4cCI6MjAyNzQ4Njc0Mn0.GQkXKqCACbYgDx8WKch_qUg9NYgEdjmoVxiL_DaEO0A"

export const supabase = createClient(supabaseUrl, supabaseKey)

// Types

export type Chapter = Database["public"]["Tables"]["chapters"]["Row"]
export type Project = Database["public"]["Tables"]["projects"]["Row"]
export type Item = Database["public"]["Tables"]["items"]["Row"]
export type Profile = Database["public"]["Tables"]["profiles"]["Row"]
