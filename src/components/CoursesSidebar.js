import { Search } from "lucide-react";
import { CoursesDummyData } from "../utils/coursesData";

export default function CoursesSidebar() {
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
        {CoursesDummyData.map((item) => (
          <div className=" flex h-28 gap-2 shrink-0 cursor-pointer hover:bg-gray-100 rounded-lg transition-all duration-300">
            <img
              className="w-20 object-cover rounded-lg"
              src={item.image}
              alt="course"
            />
            <div className="flex flex-col justify-between w-full py-3 px-1">
              <span className="text-lg font-semibold">{item.name}</span>
              <div className="relative w-full h-2 bg-green-100 rounded-full">
                <div
                  className="absolute h-2 bg-green-500 rounded-full"
                  style={{ width: "60%" }}
                ></div>
              </div>
              <span className="text-xs text-gray-500">
                40+ lessons · 4+ hours
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
