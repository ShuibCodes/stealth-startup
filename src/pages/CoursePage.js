import CourseModuleSelect from "../components/CourseModuleSelect";
import CoursesSidebar from "../components/CoursesSidebar";
import CourseView from "../components/CourseView";

export default function CoursePage() {
  return (
    <div className="h-full flex gap-5">
      <CoursesSidebar />
      <CourseView />
      <CourseModuleSelect />
    </div>
  );
}
