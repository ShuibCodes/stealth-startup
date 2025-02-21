import { Link } from "react-router-dom";

export default function CourseCard({ data }) {
  return (
    <Link to={`/dashboard/courses/${data.id}`}>
      <div className="h-[300px] max-w-[400px] rounded-3xl border overflow-hidden relative flex p-6 flex-col justify-between items-end cursor-pointer hover:shadow-2xl transition-transform duration-300 hover:scale-105">
        <div className="z-10 bg-green-500 rounded-lg w-fit p-1 text-white">
          {data.duration}
        </div>
        <div className="z-10 w-full p-3 rounded-lg bg-white/20 backdrop-blur-lg text-white">
          {data.name}
        </div>
        <img
          src={data.image}
          className="size-full absolute left-0 top-0 object-cover"
          alt="course"
        />
      </div>
    </Link>
  );
}
