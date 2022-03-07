import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  process.env.REACT_APP_SUPABASE_URL ||
  'https://ncgkgsxlcgmtoedaaaog.supabase.co';
const supabaseApiKey =
  process.env.REACT_APP_SUPABASE_API_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5jZ2tnc3hsY2dtdG9lZGFhYW9nIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDU5NTk5OTksImV4cCI6MTk2MTUzNTk5OX0.ZxDNJ3DwnLuIl0g-BsGDjRt_udpXLl3q3u-JdL4pKd8';

export const supabase = createClient(supabaseUrl, supabaseApiKey);
