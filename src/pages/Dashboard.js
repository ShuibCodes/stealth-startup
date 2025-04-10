import { VisitorsChart } from "../components/VisitorsChart";
import { TrafficSourcesChart } from "../components/TrafficSourcesChart";
import { EngagementChart } from "../components/EngagementChart";
import { Leaderboard } from "../components/Leaderboard";

const visitorsData = [
  { name: "Mon", value: 4000 },
  { name: "Tue", value: 3000 },
  { name: "Wed", value: 2000 },
  { name: "Thu", value: 2780 },
  { name: "Fri", value: 1890 },
  { name: "Sat", value: 2390 },
  { name: "Sun", value: 3490 },
];

const trafficSourceData = [
  { name: "Direct", value: 400 },
  { name: "Organic Search", value: 300 },
  { name: "Paid Search", value: 300 },
  { name: "Referral", value: 200 },
  { name: "Social", value: 100 },
];

const engagementData = [
  { name: "Comments", value: 800 },
  { name: "Shares", value: 400 },
  { name: "Likes", value: 1200 },
  { name: "Saves", value: 300 },
  { name: "Views", value: 5000 },
];

const activeUsers = [
  {
    name: "Alice Johnson",
    activity: 120,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Bob Smith",
    activity: 98,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Charlie Brown",
    activity: 86,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Diana Martinez",
    activity: 75,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Ethan Lee",
    activity: 62,
    avatar: "/placeholder.svg?height=40&width=40",
  },
];

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-8 w-8 text-blue-600" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" 
                />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Prompt Pal</h3>
              <p className="text-gray-600">Your AI assistant for generating prompts and ideas</p>
            </div>
          </div>
          <div className="mt-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors duration-300">
              Launch Prompt Pal
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <VisitorsChart
          title="Visitors Over Time"
          description="Daily visitor count for the past week"
          data={visitorsData}
        />
        <TrafficSourcesChart
          title="Traffic Sources"
          description="Breakdown of traffic sources"
          data={trafficSourceData}
        />
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <EngagementChart
          title="User Engagement"
          description="Breakdown of user interactions"
          data={engagementData}
        />
        <Leaderboard
          title="Most Active Users"
          description="Top 5 users by activity"
          users={activeUsers}
        />
      </div>
    </div>
  );
}
