import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://uwfrsmcfvqmbxaxxdrgh.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3ZnJzbWNmdnFtYnhheHhkcmdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI1OTA2MzAsImV4cCI6MjA1ODE2NjYzMH0.WfnXWgiWaF7eNcQMNsOCy7v91xZPfQGtiQ2efj4-CS0"
);

export default supabase;
