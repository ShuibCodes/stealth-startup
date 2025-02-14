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
