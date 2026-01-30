import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

export default function AdminDashboard() {
  return (
    <section className="space-y-10">

      {/* Dashboard Title */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">
          Dashboard
        </h1>
      </div>

      {/* Overview */}
      <div>
       <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Overview
        </h2>


        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard title="New Requests" value="12" />
          <StatCard title="Contacted" value="8" />
          <StatCard title="Ongoing" value="0" />
          <StatCard title="Completed" value="15" />
        </div>
      </div>

      {/* Ongoing Constructions */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle>Ongoing Constructions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">
            No ongoing projects yet.
          </p>
        </CardContent>
      </Card>

      {/* ✅ Recent Activity (SAME STYLE AS ONGOING) */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">
            No recent activity yet.
          </p>
        </CardContent>
      </Card>

    </section>
  );
}

function StatCard({ title, value }) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-orange-600">
          {value}
        </p>
      </CardContent>
    </Card>
  );
}
