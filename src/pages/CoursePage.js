import CourseModuleSelect from "../components/CourseModuleSelect";
import CoursesSidebar from "../components/CoursesSidebar";
import CourseView from "../components/CourseView";
import {
  doc,
  updateDoc,
  arrayUnion,
  getDoc,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";
import { useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import { useParams } from "react-router-dom";

export default function CoursePage() {
  const { courseId, moduleId } = useParams();
  const getUserId = () => {
    const user = auth.currentUser;
    return user ? user.uid : null;
  };
  const startCourse = async (userId, courseId) => {
    try {
      const userRef = doc(db, "users", userId);
      const userDoc = await getDoc(userRef);
      if (!userDoc.exists()) {
        console.error("user not found");
        return;
      }
      let startedCourses = userDoc.data().startedCourses || [];
      const isCourseStarted = startedCourses.some(
        (course) => course.courseId === courseId
      );
      if (!isCourseStarted) {
        await updateDoc(userRef, {
          startedCourses: arrayUnion({
            courseId,
            progress: 0, // Initial progress
            completedModules: [],
          }),
        });
      }
    } catch (error) {
      console.error("Error starting course:", error);
    }
  };
  const completeModule = async (userId, courseId, moduleId) => {
    try {
      console.log("Fetching course with field ID:", courseId);
      const courseQuery = query(
        collection(db, "courses"),
        where("id", "==", courseId)
      );
      const courseSnapshot = await getDocs(courseQuery);

      if (courseSnapshot.empty) {
        console.error("Course not found for ID:", courseId);
        return;
      }

      const courseDoc = courseSnapshot.docs[0];
      const courseData = courseDoc.data();

      console.log("Course Data:", courseData);
      let totalModules = courseData.modules.length;
      const userRef = doc(db, "users", userId);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        console.error("User not found:", userId);
        return;
      }

      let startedCourses = userDoc.data().startedCourses || [];
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
        await updateDoc(userRef, { startedCourses });

        console.log(`Module ${moduleId} completed. Progress: ${progress}%`);
      }
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };
  useEffect(() => {
    const userId = getUserId();
    startCourse(userId, courseId);
  }, [courseId]);
  useEffect(() => {
    const userId = getUserId();
    completeModule(userId, courseId, moduleId);
  }, [moduleId, courseId]);
  return (
    <div className="h-full flex gap-5">
      <CoursesSidebar />
      <CourseView />
      <CourseModuleSelect />
    </div>
  );
}
