"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  PlusCircle, 
  Search,

  AlignLeft,
  Calendar,
  Clock,
  Bookmark,
  MoreVertical,
  FileEdit,
  Copy,
  Trash2,
  ArrowDownUp,
  ChevronDown
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type LessonPlan = {
  id: number;
  title: string;
  subject: string;
  gradeLevel: string;
  date: string;
  duration: string;
  status: "draft" | "published" | "archived";
};

// Mock data for lesson plans
const mockLessonPlans: LessonPlan[] = [
  {
    id: 1,
    title: "Introduction to Romeo and Juliet",
    subject: "English",
    gradeLevel: "10th Grade",
    date: "Sep 15, 2023",
    duration: "60 min",
    status: "published"
  },
  {
    id: 2,
    title: "Quadratic Equations",
    subject: "Math",
    gradeLevel: "9th Grade",
    date: "Sep 12, 2023",
    duration: "45 min",
    status: "published"
  },
  {
    id: 3,
    title: "Cell Structure and Function",
    subject: "Biology",
    gradeLevel: "10th Grade",
    date: "Sep 10, 2023",
    duration: "90 min",
    status: "published"
  },
  {
    id: 4,
    title: "Civil War: Causes and Effects",
    subject: "History",
    gradeLevel: "11th Grade",
    date: "Sep 8, 2023",
    duration: "60 min",
    status: "published"
  },
  {
    id: 5,
    title: "Introduction to Poetry",
    subject: "English",
    gradeLevel: "9th Grade",
    date: "Sep 5, 2023",
    duration: "45 min",
    status: "draft"
  },
  {
    id: 6,
    title: "Chemical Reactions Lab",
    subject: "Chemistry",
    gradeLevel: "11th Grade",
    date: "Sep 1, 2023",
    duration: "90 min",
    status: "archived"
  },
  {
    id: 7,
    title: "Spanish Verb Conjugation",
    subject: "Spanish",
    gradeLevel: "10th Grade",
    date: "Aug 28, 2023",
    duration: "60 min",
    status: "published"
  },
];

export default function LessonPlansListPage() {
  const [lessonPlans, setLessonPlans] = useState<LessonPlan[]>(mockLessonPlans);
  const [searchQuery, setSearchQuery] = useState("");
  const [view, setView] = useState<"grid" | "table">("grid");
  
  const filteredLessonPlans = lessonPlans.filter((plan) => 
    plan.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    plan.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const statusColors = {
    draft: "text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30",
    published: "text-green-500 bg-green-100 dark:bg-green-900/30",
    archived: "text-gray-500 bg-gray-100 dark:bg-gray-800"
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Lesson Plans</h1>
          <p className="text-muted-foreground">
            Browse, search and manage your lesson plans.
          </p>
        </div>
        <Button asChild>
          <Link href="/lesson-plans/new">
            <PlusCircle className="h-4 w-4 mr-2" />
            New Lesson Plan
          </Link>
        </Button>
      </div>
      
      <Separator />
      
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
        <div className="relative w-full sm:w-72 flex-1 sm:flex-none">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search lesson plans..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 flex-wrap sm:flex-nowrap">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Subjects" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="math">Math</SelectItem>
              <SelectItem value="science">Science</SelectItem>
              <SelectItem value="history">History</SelectItem>
              <SelectItem value="spanish">Spanish</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Grades" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Grades</SelectItem>
              <SelectItem value="9">9th Grade</SelectItem>
              <SelectItem value="10">10th Grade</SelectItem>
              <SelectItem value="11">11th Grade</SelectItem>
              <SelectItem value="12">12th Grade</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="ml-auto">
                <ArrowDownUp className="h-4 w-4" />
                <span className="sr-only">Sort</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>
                Newest first
              </DropdownMenuItem>
              <DropdownMenuItem>
                Oldest first
              </DropdownMenuItem>
              <DropdownMenuItem>
                A-Z
              </DropdownMenuItem>
              <DropdownMenuItem>
                Z-A
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="flex border rounded-md">
            <Button
              variant={view === "grid" ? "subtle" : "ghost"}
              size="icon"
              className="h-9 w-9 rounded-none rounded-l-md"
              onClick={() => setView("grid")}
            >
              <Bookmark className="h-4 w-4" />
              <span className="sr-only">Grid view</span>
            </Button>
            <Separator orientation="vertical" className="h-9" />
            <Button
              variant={view === "table" ? "subtle" : "ghost"}
              size="icon"
              className="h-9 w-9 rounded-none rounded-r-md"
              onClick={() => setView("table")}
            >
              <AlignLeft className="h-4 w-4" />
              <span className="sr-only">Table view</span>
            </Button>
          </div>
        </div>
      </div>
      
      {filteredLessonPlans.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <FileEdit className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold">No lesson plans found</h3>
          <p className="text-muted-foreground mt-2 mb-4 max-w-md">
            We couldn't find any lesson plans matching your search criteria. Try adjusting your filters or create a new lesson plan.
          </p>
          <Button asChild>
            <Link href="/lesson-plans/new">
              <PlusCircle className="h-4 w-4 mr-2" />
              New Lesson Plan
            </Link>
          </Button>
        </div>
      ) : view === "grid" ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredLessonPlans.map((plan) => (
            <Card key={plan.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="p-4">
                  <Link href={`/lesson-plans/${plan.id}`} className="inline-block hover:underline">
                    <h3 className="font-semibold">{plan.title}</h3>
                  </Link>
                  <div className="flex items-center mt-1 text-sm text-muted-foreground space-x-2">
                    <span>{plan.subject}</span>
                    <span>•</span>
                    <span>{plan.gradeLevel}</span>
                  </div>
                  
                  <div className="mt-3 flex flex-wrap gap-2">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5 mr-1" />
                      <span>{plan.date}</span>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3.5 w-3.5 mr-1" />
                      <span>{plan.duration}</span>
                    </div>
                    <div className={`ml-auto text-xs px-2 py-1 rounded-full ${statusColors[plan.status]}`}>
                      {plan.status.charAt(0).toUpperCase() + plan.status.slice(1)}
                    </div>
                  </div>
                </div>
                
                <div className="border-t p-3 flex justify-between items-center bg-muted/50">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/lesson-plans/${plan.id}`}>View Details</Link>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                        <span className="sr-only">More options</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <FileEdit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="h-4 w-4 mr-2" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">
                  <Button variant="ghost" className="p-0 h-auto font-medium flex items-center">
                    Title
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLessonPlans.map((plan) => (
                <TableRow key={plan.id}>
                  <TableCell className="font-medium">
                    <Link href={`/lesson-plans/${plan.id}`} className="hover:underline">
                      {plan.title}
                    </Link>
                  </TableCell>
                  <TableCell>{plan.subject}</TableCell>
                  <TableCell>{plan.gradeLevel}</TableCell>
                  <TableCell>{plan.date}</TableCell>
                  <TableCell>{plan.duration}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[plan.status]}`}>
                      {plan.status.charAt(0).toUpperCase() + plan.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/lesson-plans/${plan.id}`}>
                            View details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}