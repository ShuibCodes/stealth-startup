import { MonitorPlay, Check } from "lucide-react";

export default function CourseModuleSelect() {
  return (
    <div className="w-[260px] bg-white mt-5 rounded-tl-xl rounded-tr-xl shrink-0 mr-5">
      <h1 className="text-xl p-3">Modules</h1>
      <div className="flex hover:bg-green-100 py-2 cursor-pointer">
        <div className="flex items-center justify-center px-4">
          <div className="size-5 border-2 rounded-full border-green-500 bg-green-500 flex items-center justify-center">
            <Check size={15} color="white" />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex gap-2 items-center mb-2">
            <MonitorPlay size={18} />
            01 - Welcome!
          </div>
          <span className="text-xs text-gray-500">(14:55)</span>
        </div>
      </div>
      <div className="flex hover:bg-green-100 py-2 cursor-pointer">
        <div className="flex items-center justify-center px-4">
          <div className="size-5 border-2 rounded-full border-green-500 bg-green-500 flex items-center justify-center">
            <Check size={15} color="white" />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex gap-2 items-center mb-2">
            <MonitorPlay size={18} />
            02 - What is Programming?
          </div>
          <span className="text-xs text-gray-500">(14:55)</span>
        </div>
      </div>
      <div className="flex hover:bg-green-100 py-2 cursor-pointer">
        <div className="flex items-center justify-center px-4">
          <div className="size-5 border-2 rounded-full border-green-500"></div>
        </div>
        <div className="flex flex-col">
          <div className="flex gap-2 items-center mb-2">
            <MonitorPlay size={18} />
            01 - Welcome!
          </div>
          <span className="text-xs text-gray-500">(14:55)</span>
        </div>
      </div>
      <div className="flex hover:bg-green-100 py-2 cursor-pointer">
        <div className="flex items-center justify-center px-4">
          <div className="size-5 border-2 rounded-full border-green-500"></div>
        </div>
        <div className="flex flex-col">
          <div className="flex gap-2 items-center mb-2">
            <MonitorPlay size={18} />
            01 - Welcome!
          </div>
          <span className="text-xs text-gray-500">(14:55)</span>
        </div>
      </div>
    </div>
  );
}
