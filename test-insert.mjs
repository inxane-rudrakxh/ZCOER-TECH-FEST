import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const env = fs.readFileSync('.env', 'utf8').split('\n').reduce((acc, line) => {
  const [key, val] = line.split('=');
  if (key) acc[key] = val;
  return acc;
}, {});

const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);

async function test() {
  const { data, error } = await supabase.from("registration_campaigns").insert([
    { name: "test-node", token: "test-node-1234", status: "OPEN" }
  ]);
  console.log("Error:", error);
  console.log("Data:", data);
}
test();
