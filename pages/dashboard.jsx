
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown } from "lucide-react";
import {
  FcFolder,
  FcProcess,
  FcBarChart,
  FcLineChart,
  FcDocument,
  FcFile,
  FcBusinessman,
  FcDiploma2,
} from "react-icons/fc";
import Reusesidebar from "@/componentPages/reusesidebar";
function Dashboard() {
  const sidebarItems = [
    { icon: <FcBarChart />, label: "Dashboard" },
    { icon: <FcProcess />, label: "Lifecycle" },
    { icon: <FcLineChart />, label: "Analytics" },
    { icon: <FcFolder />, label: "Projects" },
    { icon: <FcBusinessman />, label: "Team" },
  ];

  const documentItems = [
    { icon: <FcDiploma2 />, label: "Data Library" },
    { icon: <FcDocument />, label: "Reports" },
    { icon: <FcFile />, label: "Word Assistant" },
    { icon: "⋯", label: "More" },
  ];
  return (
    <Reusesidebar>
        <main className="flex-1 overflow-auto bg-white">
          <div className="p-8">
            <div className="mb-8 flex items-center justify-between">
              <h1 className="text-2xl font-semibold">Documents</h1>
              <Button className="bg-black text-white hover:bg-gray-800">
                Quick Create
              </Button>
            </div>

            <div className="mb-8 grid gap-6 md:grid-cols-4">
              {[
                {
                  title: "Total Revenue",
                  value: "$1,250.00",
                  change: "+12.5%",
                  trend: "up",
                  subtitle: "Trending up this month",
                  description: "Visitors for the last 6 months",
                },
                {
                  title: "New Customers",
                  value: "1,234",
                  change: "-20%",
                  trend: "down",
                  subtitle: "Down 20% this period",
                  description: "Acquisition needs attention",
                },
                {
                  title: "Active Accounts",
                  value: "45,678",
                  change: "+12.5%",
                  trend: "up",
                  subtitle: "Strong user retention",
                  description: "Engagement exceed targets",
                },
                {
                  title: "Growth Rate",
                  value: "4.5%",
                  change: "+4.5%",
                  trend: "up",
                  subtitle: "Steady performance increase",
                  description: "Meets growth projections",
                },
              ].map((stat) => (
                <div
                  key={stat.title}
                  className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
                >
                  <div className="mb-4 flex items-start justify-between">
                    <p className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </p>
                    <span
                      className={`flex items-center gap-1 text-xs font-medium ${
                        stat.trend === "up" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {stat.trend === "up" ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      {stat.change}
                    </span>
                  </div>
                  <p className="mb-2 text-3xl font-bold">{stat.value}</p>
                  <div className="space-y-1">
                    <p className="flex items-center gap-1 text-xs font-medium text-gray-700">
                      {stat.subtitle}
                      {stat.trend === "up" ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                    </p>
                    <p className="text-xs text-gray-500">{stat.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-lg font-semibold">Total Visitors</p>
                  <p className="text-sm text-gray-500">
                    Total for the last 3 months
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-300"
                  >
                    Last 3 months
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-300"
                  >
                    Last 30 days
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-300"
                  >
                    Last 7 days
                  </Button>
                </div>
              </div>

              <div className="relative h-64">
                <svg
                  className="h-full w-full"
                  viewBox="0 0 800 200"
                  preserveAspectRatio="none"
                >
                  <line
                    x1="0"
                    y1="50"
                    x2="800"
                    y2="50"
                    stroke="#f0f0f0"
                    strokeWidth="1"
                  />
                  <line
                    x1="0"
                    y1="100"
                    x2="800"
                    y2="100"
                    stroke="#f0f0f0"
                    strokeWidth="1"
                  />
                  <line
                    x1="0"
                    y1="150"
                    x2="800"
                    y2="150"
                    stroke="#f0f0f0"
                    strokeWidth="1"
                  />

                  <path
                    d="M 0 120 Q 100 80, 200 100 T 400 90 T 600 110 T 800 95 L 800 200 L 0 200 Z"
                    fill="#e5e5e5"
                    opacity="0.5"
                  />

                  <path
                    d="M 0 140 Q 100 110, 200 120 T 400 115 T 600 130 T 800 120 L 800 200 L 0 200 Z"
                    fill="#9ca3af"
                    opacity="0.6"
                  />

                  <path
                    d="M 0 140 Q 100 110, 200 120 T 400 115 T 600 130 T 800 120"
                    fill="none"
                    stroke="#6b7280"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </div>
          </div>
        </main>
      </Reusesidebar>
  );
}

export default Dashboard;
