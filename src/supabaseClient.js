import { createClient } from '@supabase/supabase-js';

// Supabase connection details
const supabaseUrl = 'https://glwotllwebjcvtjbmdwe.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdsd290bGx3ZWJqY3Z0amJtZHdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4MjAzMjYsImV4cCI6MjA1ODM5NjMyNn0.LHW6rOsJR6MukOVxhkX1tV3G0gZkI31gmLABlRUvdg4';

// Initialize the Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase, supabaseUrl, supabaseKey };
export default supabase; 