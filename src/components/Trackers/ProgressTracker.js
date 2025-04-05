import { useEffect } from "react";
import supabase from "../../database/supabaseClient";
import { useAuth } from "../../context/AuthContext";

function ProgressTracker({ projectName, currentStepIndex, totalSteps }) {
  const { user } = useAuth();

  useEffect(() => {
    const updateProgress = async () => {
      if (!user || !projectName) return;

      const stepsCompleted = currentStepIndex + 1;
      let status = "not started";

      if (stepsCompleted > 0) status = "in progress";
      if (stepsCompleted >= totalSteps) status = "completed";

      const { data: existing, error: fetchError } = await supabase
        .from("project_completion_status")
        .select("id")
        .eq("user_id", user.id)
        .eq("project_name", projectName)
        .single();

      if (fetchError && !existing) {
        const { error: insertError } = await supabase
          .from("project_completion_status")
          .insert({
            user_id: user.id,
            project_name: projectName,
            steps_completed: stepsCompleted,
            total_steps: totalSteps,
            status,
          });
        if (insertError) console.error("Insert error:", insertError);
      } else if (existing) {
        const { error: updateError } = await supabase
          .from("project_completion_status")
          .update({
            steps_completed: stepsCompleted,
            total_steps: totalSteps,
            status,
          })
          .eq("id", existing.id);
        if (updateError) console.error("Update error:", updateError);
      }
    };

    updateProgress();
  }, [user, projectName, currentStepIndex, totalSteps]);

  return null;
}

export default ProgressTracker;
