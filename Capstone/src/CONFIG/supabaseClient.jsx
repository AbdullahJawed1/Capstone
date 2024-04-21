import { createClient } from "@supabase/supabase-js";

const REACT_APP_SUPABASE_URL = "https://uchbioihxahhupkqywko.supabase.co"
const REACT_APP_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVjaGJpb2loeGFoaHVwa3F5d2tvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM0NjU1NTMsImV4cCI6MjAyOTA0MTU1M30.XgqfVDXUJ6j3isYL5LqSbqfirFxPnIMEHy8l758t4YY"

const supabaseURL = REACT_APP_SUPABASE_URL
const supabaseAPI = REACT_APP_KEY

const supabase = createClient(supabaseURL,supabaseAPI)

export default supabase;