import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import supabase from "../supabaseClient";

/**
 * SessionDurationTracker:
 * - Checks if a row exists for (user_id, session_id).
 * - If not, inserts a new row (sets created_at automatically).
 * - If yes, updates that row's last_update.
 */
function SessionDurationTracker() {
  const { user, sessionId } = useAuth();
  const [sessionRowId, setSessionRowId] = useState(null);

  useEffect(() => {
    // Only proceed if user is logged in and sessionId is defined
    if (!user || !sessionId) return;

    const handleSession = async () => {
      // 1. Check if there's already a row for (user_id, session_id)
      const { data: existingRow, error: fetchError } = await supabase
        .from("session_duration")
        .select("id, created_at, last_update")
        .eq("user_id", user.id)
        .eq("session_id", sessionId)
        .single(); 
        // .single() -> expects 0 or 1 rows. If multiple, it throws an error.

      if (fetchError && !existingRow) {
        // Means no row found (or a "row not found" error).
        // => Insert a new row
        console.log("No existing session row => inserting new row...");
        const now = new Date();
        const { data: inserted, error: insertError } = await supabase
          .from("session_duration")
          .insert({
            user_id: user.id,
            session_id: sessionId,
            // created_at defaults to now() in DB
            last_update: now,
          })
          .select(); 
        

        if (insertError) {
          console.error("Insert error:", insertError);
        } else if (inserted && inserted.length > 0) {
          console.log("Session row created:", inserted[0]);
          setSessionRowId(inserted[0].id);
        }
      } else if (existingRow) {
        // 2. If a row already exists => update that row
        console.log("Existing session row found => updating last_update...");
        const now = new Date();
        const createdAt = new Date(existingRow.created_at);
        const durationSeconds = Math.floor((now - createdAt) / 1000);
        const { error: updateError } = await supabase
          .from("session_duration")
          .update({ last_update: now, duration_seconds: durationSeconds })
          .eq("id", existingRow.id);

        if (updateError) {
          console.error("Update error:", updateError);
        } else {
          console.log("Session row updated. ID:", existingRow.id);
          setSessionRowId(existingRow.id);
        }
      }
    };

    handleSession();
  }, [user, sessionId]);

  return null; 
}

export default SessionDurationTracker;

