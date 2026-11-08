import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || 'https://sfatiraphgyizliyioor.supabase.co';
const SUPABASE_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_IE4_oACG-RtlwKrWbF5rWA_-SN77O0R';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
