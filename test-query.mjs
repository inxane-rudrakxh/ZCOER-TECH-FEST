import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
const env = fs.readFileSync('.env', 'utf8').split('\n').reduce((acc, line) => {
  const [key, val] = line.split('=');
  if (key) acc[key.trim()] = val.trim();
  return acc;
}, {});
const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);
async function test() {
  const { data, error } = await supabase.from('registration_campaign_games').select('game_id, games(*)').limit(1);
  console.log(error, JSON.stringify(data, null, 2));
}
test();
