import { Search } from "lucide-react";
import CourseCard from "../components/CourseCard";
import { CoursesDummyData } from "../utils/coursesData";

export default function Courses() {
  return (
    <div className="bg-white h-full px-20">
      <header className=" h-24 py-6">
        <div className="bg-gray-100 h-full rounded-2xl flex items-center justify-center gap-4 px-5">
          <Search className="text-gray-600" />
          <input
            className="h-full w-full bg-transparent outline-none font-semibold"
            type="text"
            placeholder="Search..."
          />
        </div>
      </header>
      <h1 className="text-4xl font-semibold">Your courses</h1>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-8 py-6">
        {CoursesDummyData.map((item) => (
          <CourseCard data={item} />
        ))}
      </div>
    </div>
  );
}
