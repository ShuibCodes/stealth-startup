import { useState } from "react";
import { useParams } from "react-router-dom";

export default function CourseView() {
  const [selectedTab, setSelectedTab] = useState(1);
  const { courseId, moduleId } = useParams();

  return (
    <div className="w-full bg-white mt-5 rounded-tl-xl rounded-tr-xl overflow-auto ">
      <div className="bg-gray-500 h-[450px] flex items-center justify-center text-white mb-2">
        video player <br /> course ID: {courseId} <br /> module ID: {moduleId}
      </div>
      <div className="p-5">
        <h1 className="mb-2 text-2xl font-semibold">
          Introduction to Programming
        </h1>
        <p className="text-gray-500 font-semibold mb-5">
          John smith ·{" "}
          <span className="font-normal">Sr. Software Engineer</span>
        </p>
        <div className=" text-gray-500 border-b mb-4">
          <button
            onClick={() => {
              setSelectedTab(1);
            }}
            className={`px-6 py-2 hover:bg-gray-100 border-b-2 border-transparent ${
              selectedTab === 1 && "selected"
            }`}
          >
            TAB 1
          </button>
          <button
            onClick={() => {
              setSelectedTab(2);
            }}
            className={`px-6 py-2 hover:bg-gray-100 border-b-2 border-transparent ${
              selectedTab === 2 && "selected"
            }`}
          >
            TAB 2
          </button>
          <button
            onClick={() => {
              setSelectedTab(3);
            }}
            className={`px-6 py-2 hover:bg-gray-100 border-b-2 border-transparent ${
              selectedTab === 3 && "selected"
            }`}
          >
            TAB 3
          </button>
          <button
            onClick={() => {
              setSelectedTab(4);
            }}
            className={`px-6 py-2 hover:bg-gray-100 border-b-2 border-transparent ${
              selectedTab === 4 && "selected"
            }`}
          >
            TAB 4
          </button>
        </div>
        <div>Tab {selectedTab} content</div>
      </div>
    </div>
  );
}
