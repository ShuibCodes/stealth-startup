import { Card } from "../components/Card";
import { Grab, Hand, Scissors, X, Circle } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProjectsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="/new-project/rock-paper-scissors">
          <Card>
            <div className="h-[400px] flex items-center justify-center flex-col gap-5">
              <span className="flex gap-5 ">
                <Grab />
                <Hand />
                <Scissors />
              </span>
              <h1 className="text-2xl">Rock Paper Scissors</h1>
            </div>
          </Card>
        </Link>
        <Link to="/new-project/tic-tac-toe">
          <Card>
            <div className="h-[400px] flex items-center justify-center flex-col gap-5">
              <span className="flex gap-5 ">
                <X />
                <Circle />
                <X />
              </span>
              <h1 className="text-2xl">Tic Tac Toe</h1>
            </div>
          </Card>
        </Link>
      </div>
    </div>
  );
}
