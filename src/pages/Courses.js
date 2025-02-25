import { Search } from "lucide-react";
import CourseCard from "../components/CourseCard";
import { useCourses } from "../context/CourseContext";

export default function Courses() {
  const { courses, loading } = useCourses();

  return (
    <div className="bg-white h-full px-20 flex flex-col *:shrink-0 overflow-hidden">
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
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 h-full gap-8 py-6 overflow-auto pb-[200px]">
        {!loading &&
          courses?.map((item) => <CourseCard key={item.id} data={item} />)}
      </div>
    </div>
  );
}
