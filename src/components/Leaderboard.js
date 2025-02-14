import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./Card";

export function Leaderboard({ title, description, users }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {users.map((user, index) => (
            <li key={index} className="flex items-center space-x-4">
              <div className="relative w-10 h-10">
                <image
                  src={user.avatar || "/placeholder.svg"}
                  alt={user.name}
                  layout="fill"
                  className="rounded-full"
                />
              </div>
              <div className="flex-1">
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-500">{user.activity} actions</p>
              </div>
              <div className="text-sm font-medium text-gray-900">
                #{index + 1}
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
