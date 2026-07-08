import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://liktneawhkqussdzjdid.supabase.co';
const supabaseAnonKey = 'sb_publishable__cK_mjr4ZzZv87IzH2N3qA_Qw_VzZXP';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);