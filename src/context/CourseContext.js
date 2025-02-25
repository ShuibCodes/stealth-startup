import { createContext, useContext, useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

// Create Context
const CourseContext = createContext();

// Course Provider Component
export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch courses from Firestore
  const fetchCourses = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "courses"));
      const courseList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCourses(courseList);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
    setLoading(false);
  };

  // Add a new course
  const addCourse = async (title, description, instructor) => {
    try {
      const docRef = await addDoc(collection(db, "courses"), {
        title,
        description,
        instructor,
        modules: [],
        createdAt: new Date().toISOString(),
      });
      setCourses([
        ...courses,
        { id: docRef.id, title, description, instructor, modules: [] },
      ]);
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  // Update an existing course
  const updateCourse = async (courseId, newData) => {
    try {
      const courseRef = doc(db, "courses", courseId);
      await updateDoc(courseRef, newData);
      setCourses(
        courses.map((course) =>
          course.id === courseId ? { ...course, ...newData } : course
        )
      );
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <CourseContext.Provider
      value={{ courses, loading, addCourse, updateCourse }}
    >
      {children}
    </CourseContext.Provider>
  );
};

// Custom Hook to use Courses Context
export const useCourses = () => useContext(CourseContext);
