import { Search } from "lucide-react";
import { useCourses } from "../context/CourseContext";
import pcImage from "../images/pc-image.jpg";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { useEffect, useState } from "react";

export default function CoursesSidebar() {
  const [startedCourses, setStartedCourses] = useState([]);
  const { courses, loading } = useCourses();
  const { courseId, moduleId } = useParams();

  const getUserId = () => {
    const user = auth.currentUser;
    return user ? user.uid : null;
  };
  const getCompletedCourses = async () => {
    const userId = getUserId();
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);
    setStartedCourses(userDoc.data().startedCourses);
  };
  const getProgress = (id) => {
    const item = startedCourses.find((item) => {
      return item.courseId === id;
    });
    return item ? item.progress : 0;
  };
  useEffect(() => {
    getCompletedCourses();
  }, [courseId, moduleId]);
  return (
    <div className=" bg-white w-[300px] p-4 h-full flex flex-col shrink-0">
      <h1 className="font-semibold text-xl mb-3">My Courses</h1>
      <div className="bg-gray-100 h-10 rounded-md flex items-center justify-center gap-2 px-3 mb-3">
        <Search className="text-gray-600" />
        <input
          className="h-full w-full bg-transparent outline-none"
          type="text"
          placeholder="Search courses"
        />
      </div>
      <div className="courses-scroll flex flex-col gap-4 overflow-auto h-full pr-2">
        {!loading &&
          courses.map((item) => (
            <Link to={`/dashboard/courses/${item.id}/${item.modules[0].id}`}>
              <div
                className={`flex h-28 gap-2 shrink-0 cursor-pointer hover:bg-gray-100 rounded-lg transition-all duration-300 ${
                  item.id === courseId && "bg-gray-100"
                }`}
              >
                <img
                  className="w-20 object-cover rounded-lg"
                  src={pcImage}
                  alt="course"
                />
                <div className="flex flex-col justify-between w-full py-3 px-1">
                  <span className="text-lg font-semibold">{item.name}</span>
                  <div className="relative w-full h-3 bg-green-100 rounded-full border-2">
                    <div
                      className="absolute h-2 bg-green-500 rounded-full transition-all duration-300"
                      style={{ width: `${getProgress(item.id)}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500">
                    40+ lessons · 4+ hours
                  </span>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
