import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://erambkaataknfjwwgtkp.supabase.co';
const supabaseKey = 'sb_publishable_hNfHmd0sjRXeDbQqQQCuWg_SH_eH0cj';

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
)