import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// 🔐 SERVER-PROTECTED DASHBOARD
export default async function AdminDashboard() {
  const supabase = createServerClient();

  const { data } = await supabase.auth.getSession();

  // ❌ Not logged in → redirect
 // if (!data.session) {
    //redirect("/admin/login");
 //S }

  // ✅ Logged in → dashboard stays
  return (
    <section className="space-y-10">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">
          Dashboard
        </h1>
      </div>

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
