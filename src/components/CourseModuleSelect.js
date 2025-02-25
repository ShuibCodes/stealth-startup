import { MonitorPlay, Check } from "lucide-react";
import { useCourses } from "../context/CourseContext";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export default function CourseModuleSelect() {
  const [currentCourse, setCurrentCourse] = useState({});
  const [completedModules, setCompletedModules] = useState([]);
  const { courses } = useCourses();
  const { courseId, moduleId } = useParams();

  const getUserId = () => {
    const user = auth.currentUser;
    return user ? user.uid : null;
  };

  const getCompletedModules = async () => {
    const userId = getUserId();
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);
    const current = userDoc
      .data()
      .startedCourses.find((item) => item.courseId === courseId);
    setCompletedModules(current?.completedModules || []);
    console.log(
      "🚀 ~ getCompletedModules ~ current.completedModules:",
      current?.completedModules
    );
  };

  useEffect(() => {
    const currentCourseData = courses?.find((item) => item.id === courseId);
    setCurrentCourse(currentCourseData);
    getCompletedModules();
  }, [courses, courseId, moduleId]);

  return (
    <div className="w-[260px] bg-white mt-5 rounded-tl-xl rounded-tr-xl shrink-0 mr-5">
      <h1 className="text-xl p-3">Modules</h1>
      {currentCourse?.modules?.map((item) => (
        <Link to={`/dashboard/courses/${courseId}/${item.id}`}>
          <div
            className={`flex hover:bg-green-100 py-2 cursor-pointer ${
              moduleId === item.id && "bg-green-100"
            }`}
          >
            <div className="flex items-center justify-center px-4">
              <div
                className={`size-5 border-2 rounded-full border-green-500 flex items-center justify-center ${
                  completedModules.some((mod) => mod === item.id) &&
                  "bg-green-500"
                }`}
              >
                {completedModules.some((mod) => mod === item.id) && (
                  <Check size={15} color="white" />
                )}
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex gap-2 items-center mb-2">
                <MonitorPlay size={18} />
                {item.name}
              </div>
              <span className="text-xs text-gray-500">({item.duration})</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
