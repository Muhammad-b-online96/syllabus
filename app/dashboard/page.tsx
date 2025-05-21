"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { Button } from "@/components/ui/button";
import { PlusCircle, FileText, Calendar, BookOpen, LineChart } from "lucide-react";
import Link from "next/link";

const mockActivityData = [
  { name: "Mon", hours: 3 },
  { name: "Tue", hours: 5 },
  { name: "Wed", hours: 2 },
  { name: "Thu", hours: 7 },
  { name: "Fri", hours: 4 },
  { name: "Sat", hours: 1 },
  { name: "Sun", hours: 0 },
];

const mockSubjectData = [
  { name: "English", value: 40 },
  { name: "Math", value: 25 },
  { name: "Science", value: 20 },
  { name: "History", value: 15 },
];

const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))"];

const recentCurricula = [
  { id: 1, title: "English Literature Grade 10", lastEdited: "2 hours ago" },
  { id: 2, title: "World History: Modern Era", lastEdited: "Yesterday" },
  { id: 3, title: "Introduction to Biology", lastEdited: "3 days ago" },
];

const upcomingEvents = [
  { id: 1, title: "Grade 10 English Class", date: "Today, 10:00 AM" },
  { id: 2, title: "Department Meeting", date: "Tomorrow, 2:00 PM" },
  { id: 3, title: "Curriculum Review", date: "May 15, 9:00 AM" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your curriculum planning.
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/curricula/upload">
              <PlusCircle className="h-4 w-4 mr-2" />
              New Curriculum
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/lesson-plans/list">
              <FileText className="h-4 w-4 mr-2" />
              Lesson Plans
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Curricula</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lesson Plans</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">+8 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">Next: Today at 10:00 AM</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weekly Planning</CardTitle>
            <LineChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24h</div>
            <p className="text-xs text-muted-foreground">+5h from last week</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Weekly Activity</CardTitle>
                <CardDescription>Hours spent on curriculum planning</CardDescription>
              </CardHeader>
              <CardContent className="px-2">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={mockActivityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="hours" fill="hsl(var(--chart-1))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Subject Distribution</CardTitle>
                <CardDescription>Breakdown by subject area</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={mockSubjectData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {mockSubjectData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>Track your curriculum planning progress and insights.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Detailed analytics coming soon.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="recent" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Curricula</CardTitle>
                <CardDescription>Your recently edited curricula</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentCurricula.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div className="space-y-1">
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-muted-foreground">Edited {item.lastEdited}</p>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/curricula/${item.id}`}>View</Link>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Your scheduled events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="flex justify-between items-center">
                      <div className="space-y-1">
                        <p className="font-medium">{event.title}</p>
                        <p className="text-sm text-muted-foreground">{event.date}</p>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/calendar`}>View</Link>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}