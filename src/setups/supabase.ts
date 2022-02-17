import { createClient } from '@supabase/supabase-js'

const supabaseUrl = '<YOUR_PROJECT_URL>'
const supabaseKey = '<YOUR_SUPABASE_KEY>'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
