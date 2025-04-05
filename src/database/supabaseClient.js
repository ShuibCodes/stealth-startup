import { createClient } from '@supabase/supabase-js';

// Supabase connection details
const supabaseUrl = 'https://uwfrsmcfvqmbxaxxdrgh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3ZnJzbWNmdnFtYnhheHhkcmdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI1OTA2MzAsImV4cCI6MjA1ODE2NjYzMH0.WfnXWgiWaF7eNcQMNsOCy7v91xZPfQGtiQ2efj4-CS0';

// Initialize the Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase, supabaseUrl, supabaseKey };
export default supabase; 