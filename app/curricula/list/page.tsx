"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  PlusCircle, 
  Search, 
  FileText, 
  MoreVertical, 
  Star, 
  StarOff, 
  Bookmark, 
  Share2, 
  FileEdit, 
  Copy, 
  Trash2 
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

type Curriculum = {
  id: number;
  title: string;
  subject: string;
  gradeLevel: string;
  author: string;
  date: string;
  starred: boolean;
};

// Mock data for curricula
const mockCurricula: Curriculum[] = [
  {
    id: 1,
    title: "English Literature Grade 10",
    subject: "English",
    gradeLevel: "High School",
    author: "John Peterson",
    date: "Apr 12, 2023",
    starred: true
  },
  {
    id: 2,
    title: "World History: Modern Era",
    subject: "History",
    gradeLevel: "High School",
    author: "Sarah Johnson",
    date: "Mar 15, 2023",
    starred: false
  },
  {
    id: 3,
    title: "Algebra Fundamentals",
    subject: "Mathematics",
    gradeLevel: "Middle School",
    author: "John Peterson",
    date: "Feb 28, 2023",
    starred: true
  },
  {
    id: 4,
    title: "Introduction to Biology",
    subject: "Science",
    gradeLevel: "High School",
    author: "Li Zhang",
    date: "Jan 10, 2023",
    starred: false
  },
  {
    id: 5,
    title: "Spanish I",
    subject: "Languages",
    gradeLevel: "High School",
    author: "Maria Rodriguez",
    date: "Dec 5, 2022",
    starred: false
  },
  {
    id: 6,
    title: "Music Theory",
    subject: "Arts",
    gradeLevel: "Middle School",
    author: "David Kim",
    date: "Nov 20, 2022",
    starred: false
  },
];

export default function CurriculaListPage() {
  const [curricula, setCurricula] = useState<Curriculum[]>(mockCurricula);
  const [searchQuery, setSearchQuery] = useState("");
  
  const toggleStar = (id: number) => {
    setCurricula(
      curricula.map((curriculum) =>
        curriculum.id === id
          ? { ...curriculum, starred: !curriculum.starred }
          : curriculum
      )
    );
  };
  
  const filteredCurricula = curricula.filter((curriculum) => 
    curriculum.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    curriculum.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    curriculum.author.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const starredCurricula = filteredCurricula.filter(curriculum => curriculum.starred);
  const recentCurricula = [...filteredCurricula].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Curricula</h1>
          <p className="text-muted-foreground">
            Browse, search and manage your curriculum materials.
          </p>
        </div>
        <Button asChild>
          <Link href="/curricula/upload">
            <PlusCircle className="h-4 w-4 mr-2" />
            New Curriculum
          </Link>
        </Button>
      </div>
      
      <Separator />
      
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
        <div className="relative w-full sm:w-72 flex-1 sm:flex-none">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search curricula..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Subjects" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="math">Mathematics</SelectItem>
              <SelectItem value="science">Science</SelectItem>
              <SelectItem value="history">History</SelectItem>
              <SelectItem value="languages">Languages</SelectItem>
              <SelectItem value="arts">Arts</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Grade Levels" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Grade Levels</SelectItem>
              <SelectItem value="elementary">Elementary School</SelectItem>
              <SelectItem value="middle">Middle School</SelectItem>
              <SelectItem value="high">High School</SelectItem>
              <SelectItem value="college">College</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="starred">
            Starred
            {starredCurricula.length > 0 && (
              <span className="ml-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                {starredCurricula.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          {filteredCurricula.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <FileText className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold">No curricula found</h3>
              <p className="text-muted-foreground mt-2 mb-4 max-w-md">
                We couldn't find any curricula matching your search criteria. Try adjusting your filters or create a new curriculum.
              </p>
              <Button asChild>
                <Link href="/curricula/upload">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  New Curriculum
                </Link>
              </Button>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {filteredCurricula.map((curriculum) => (
                <CurriculumCard 
                  key={curriculum.id} 
                  curriculum={curriculum} 
                  toggleStar={toggleStar} 
                />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="starred" className="space-y-4">
          {starredCurricula.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Star className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold">No starred curricula</h3>
              <p className="text-muted-foreground mt-2 max-w-md">
                Star your favorite curricula to quickly access them here.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {starredCurricula.map((curriculum) => (
                <CurriculumCard 
                  key={curriculum.id} 
                  curriculum={curriculum} 
                  toggleStar={toggleStar} 
                />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="recent" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {recentCurricula.map((curriculum) => (
              <CurriculumCard 
                key={curriculum.id} 
                curriculum={curriculum} 
                toggleStar={toggleStar} 
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface CurriculumCardProps {
  curriculum: Curriculum;
  toggleStar: (id: number) => void;
}

function CurriculumCard({ curriculum, toggleStar }: CurriculumCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <Link href={`/curricula/${curriculum.id}`} className="hover:underline">
              <h3 className="font-semibold truncate">{curriculum.title}</h3>
            </Link>
            <div className="flex items-center mt-1 text-sm text-muted-foreground space-x-2">
              <span>{curriculum.subject}</span>
              <span>•</span>
              <span>{curriculum.gradeLevel}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => toggleStar(curriculum.id)}
            >
              {curriculum.starred ? (
                <Star className="h-4 w-4 fill-primary text-primary" />
              ) : (
                <StarOff className="h-4 w-4 text-muted-foreground" />
              )}
              <span className="sr-only">
                {curriculum.starred ? "Unstar" : "Star"}
              </span>
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
                  <Bookmark className="h-4 w-4 mr-2" />
                  Save
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
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
        </div>
        <div className="mt-4 text-xs text-muted-foreground flex items-center justify-between">
          <span>By {curriculum.author}</span>
          <span>{curriculum.date}</span>
        </div>
      </div>
      <div className="px-4 pb-4 flex justify-end">
        <Button size="sm" variant="outline" asChild>
          <Link href={`/curricula/${curriculum.id}`}>
            View Details
          </Link>
        </Button>
      </div>
    </Card>
  );
}