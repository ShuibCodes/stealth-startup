import { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import supabase from "../../database/supabaseClient";

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
      const { data: existingRows, error: fetchError } = await supabase
        .from("session_duration")
        .select("id, created_at, last_update")
        .eq("user_id", user.id)
        .eq("session_id", sessionId);
      

      if (!fetchError && existingRows && existingRows.length > 0) {
        // Use the first row if multiple exist
        const existingRow = existingRows[0];
        
        // If multiple rows exist, we should clean up duplicates 
        if (existingRows.length > 1) {
          console.log(`Found ${existingRows.length} duplicate sessions, using the first one`);
          // Get all IDs except the first one (which we're keeping)
          // const duplicateIds = existingRows.slice(1).map(row => row.id);
          
          // Delete all duplicate rows
          // const { error: deleteError } = await supabase
          //   .from("session_duration")
          //   .delete()
          //   .in("id", duplicateIds);
            
          // if (deleteError) {
          //   console.error("Error deleting duplicate sessions:", deleteError);
          // } else {
          //   console.log(`Successfully deleted ${duplicateIds.length} duplicate session entries`);
          // }
        }
        
        // Update the existing row
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
      } else {
        // No existing row found => Insert a new row
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
      }
    };

    // Set up interval to update the session regularly
    handleSession();
    
    // Consider adding this for periodic updates
    // const intervalId = setInterval(handleSession, 60000); // Update every minute
    // return () => clearInterval(intervalId);
  }, [user, sessionId]);

  return null;
}

export default SessionDurationTracker;