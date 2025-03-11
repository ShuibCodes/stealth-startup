import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://plbuzznwhpvbcdiyiqmg.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYnV6em53aHB2YmNkaXlpcW1nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE3MDYzMzgsImV4cCI6MjA1NzI4MjMzOH0.EGcTZBPaJkyRtAHQqvw_SAB0ohoouQ4ajgZAT-jhEhI"
);

export default supabase;
