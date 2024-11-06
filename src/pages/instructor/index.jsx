import { BarChart, Book, LogOut } from "lucide-react";
import InstructorCourses from "./course";
import { Button } from "@/components/ui/button";
import { useState, useContext } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import InstructorDashboard from "./dashboard";
import { AuthContext } from "@/context/auth-context";

function InstructorDashboardPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { resetCredentials } = useContext(AuthContext);

  const menuItems = [
    {
      icon: BarChart,
      label: "Dashboard",
      value: "dashboard",
      component: <InstructorDashboard />,
    },
    {
      icon: Book,
      label: "Course",
      value: "courses",
      component: <InstructorCourses />,
    },
    {
      icon: LogOut,
      label: "Logout",
      value: "logout",
      component: null,
    },
  ];

  function handleLogout() {
    resetCredentials();
    sessionStorage.clear();
  }

  return (
    <div className="flex h-full min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md hidden md:block">
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Instructor View</h2>
          <nav>
            {menuItems.map((item) => (
              <Button
                onClick={
                  item.value === "logout"
                    ? handleLogout
                    : () => setActiveTab(item.value)
                }
                variant={activeTab === item.value ? "secondary" : "ghost"}
                className="w-full justify-start mb-2"
                key={item.value}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            ))}
          </nav>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold mb-8">Dashboard</h1>
          <Tabs value={activeTab} onChange={(val) => setActiveTab(val)}>
            {menuItems.map((item) => (
              item.value !== "logout" && (
                <TabsContent key={item.value} value={item.value}>
                  {activeTab === item.value && item.component}
                </TabsContent>
              )
            ))}
          </Tabs>
        </div>
      </main>
    </div>
  );
}

export default InstructorDashboardPage;
