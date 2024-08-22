
import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
import { Database } from '../database.types'
export const supabase = createClient<Database>(
  process.env.EXPO_PUBLIC_SUPABASE_URL || "https://qosvfpqdrqijaoufywvu.supabase.co",
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFvc3ZmcHFkcnFpamFvdWZ5d3Z1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI4NDk5MDUsImV4cCI6MjAzODQyNTkwNX0.S901-AX-y6bGku27bVTNS4RN_TDu9wRSB_PNTKPhtAk",
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  })
        