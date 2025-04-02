import CourseModuleSelect from "../components/CourseModuleSelect";
import CoursesSidebar from "../components/CoursesSidebar";
import CourseView from "../components/CourseView";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import supabase from "../supabaseClient";

export default function CoursePage() {
  const { courseId, moduleId } = useParams();

  const getUserId = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    console.log("🚀 ~ getUserId ~ user:", user);
    return user ? user.id : null;
  };

  const startCourse = async (userId, courseId) => {
    try {
      // Fetch the user data
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("startedcourses")
        .eq("id", userId)
        .single();

      if (userError) {
        console.error("Error fetching user:", userError);
        return;
      }

      let startedCourses = userData?.startedCourses || [];
      const isCourseStarted = startedCourses.some(
        (course) => course.courseId === courseId
      );

      if (!isCourseStarted) {
        startedCourses.push({
          courseId,
          progress: 0, // Initial progress
          completedModules: [],
        });

        // Update user data with new startedCourses array
        const { error: updateError } = await supabase
          .from("users")
          .update({ startedCourses })
          .eq("id", userId);

        if (updateError) throw updateError;
      }
    } catch (error) {
      console.error("Error starting course:", error);
    }
  };

  const completeModule = async (userId, courseId, moduleId) => {
    try {
      console.log("Fetching course with field ID:", courseId);

      // Fetch course details
      const { data: courseData, error: courseError } = await supabase
        .from("courses")
        .select("modules")
        .eq("id", courseId)
        .single();

      if (courseError || !courseData) {
        console.error("Course not found for ID:", courseId, courseError);
        return;
      }

      console.log("Course Data:", courseData);
      let totalModules = courseData.modules.length;

      // Fetch user data
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("startedcourses")
        .eq("id", userId)
        .single();

      if (userError || !userData) {
        console.error("User not found:", userId, userError);
        return;
      }

      let startedCourses = userData.startedCourses || [];
      let courseIndex = startedCourses.findIndex(
        (c) => c.courseId === courseId
      );

      if (courseIndex !== -1) {
        let completedModules = new Set(
          startedCourses[courseIndex].completedModules
        );
        completedModules.add(moduleId);
        let progress = Math.round((completedModules.size / totalModules) * 100);

        startedCourses[courseIndex] = {
          ...startedCourses[courseIndex],
          completedModules: Array.from(completedModules),
          progress: progress,
        };

        // Update user progress
        const { error: updateError } = await supabase
          .from("users")
          .update({ startedCourses })
          .eq("id", userId);

        if (updateError) throw updateError;

        console.log(`Module ${moduleId} completed. Progress: ${progress}%`);
      }
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };

  useEffect(() => {
    const initStart = async () => {
      const userId = await getUserId();
      startCourse(userId, courseId);
    };
    initStart();
  }, [courseId]);
  useEffect(() => {
    const initCompleteModule = async () => {
      const userId = await getUserId();
      completeModule(userId, courseId, moduleId);
    };
    initCompleteModule();
  }, [moduleId, courseId]);
  return (
    <div className="h-full flex gap-5">
      <CoursesSidebar />
      <CourseView />
      <CourseModuleSelect />
    </div>
  );
}
