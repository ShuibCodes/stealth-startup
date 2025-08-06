import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../../database/supabaseClient";

// Create Context
const CourseContext = createContext();

// Course Provider Component
export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch courses from Supabase
  const fetchCourses = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("courses").select("*");
      if (error) throw error;
      console.log("🚀 ~ fetchCourses ~ data:", data);
      setCourses(data || []);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
    setLoading(false);
  };

  // Add a new course
  const addCourse = async (title, description, instructor) => {
    try {
      const { data, error } = await supabase
        .from("courses")
        .insert([
          {
            title,
            description,
            instructor,
            modules: [], // Make sure `modules` is stored as JSONB in Supabase
            createdAt: new Date().toISOString(),
          },
        ])
        .select("*")
        .single(); // Return inserted data

      if (error) throw error;
      setCourses([...courses, data]); // Update local state
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  // Update an existing course
  const updateCourse = async (courseId, newData) => {
    try {
      const { data, error } = await supabase
        .from("courses")
        .update(newData)
        .eq("id", courseId)
        .select("*")
        .single(); // Return updated data

      if (error) throw error;
      setCourses(
        courses.map((course) =>
          course.id === courseId ? { ...course, ...data } : course
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