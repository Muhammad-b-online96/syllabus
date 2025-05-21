"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ChevronLeft, 
  Calendar, 
  FileText, 
  Book, 
  Users, 
  Clock, 
  Share2, 
  Download, 
  Edit, 
  Trash2,
  Bookmark,
  BookmarkPlus
} from "lucide-react";

export default function CurriculumDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [bookmarked, setBookmarked] = useState(false);
  
  // Mock curriculum data
  const curriculum = {
    id: parseInt(params.id),
    title: "English Literature Grade 10",
    subject: "English",
    gradeLevel: "High School",
    author: "John Peterson",
    date: "April 12, 2023",
    description: "This curriculum covers major literary works from American and British literature designed for 10th grade students. It includes poetry, short stories, novels, and plays with a focus on critical analysis and writing skills.",
    outcomes: [
      "Analyze and interpret complex literary texts",
      "Develop critical thinking and analytical writing skills",
      "Understand historical and cultural contexts of literature",
      "Compare themes across different literary works",
      "Develop vocabulary and language skills"
    ],
    units: [
      {
        title: "Introduction to Literary Analysis",
        duration: "2 weeks",
        description: "Fundamentals of literary analysis including themes, characters, setting, and narrative techniques."
      },
      {
        title: "American Literature: 19th Century",
        duration: "4 weeks",
        description: "Focus on major American writers such as Edgar Allan Poe, Nathaniel Hawthorne, and Emily Dickinson."
      },
      {
        title: "Shakespeare: Romeo and Juliet",
        duration: "3 weeks",
        description: "In-depth study of Shakespeare's famous tragedy, including themes of love, conflict, and fate."
      },
      {
        title: "Modern Short Stories",
        duration: "3 weeks",
        description: "Analysis of 20th century short stories from diverse authors around the world."
      },
      {
        title: "Poetry and Poetic Devices",
        duration: "2 weeks",
        description: "Study of various poetic forms and devices through classic and contemporary examples."
      },
      {
        title: "Novel Study: To Kill a Mockingbird",
        duration: "4 weeks",
        description: "Comprehensive analysis of Harper Lee's classic novel focusing on themes of justice, prejudice, and coming of age."
      }
    ],
    resources: [
      { title: "Literary Terms Glossary", type: "PDF" },
      { title: "Essay Writing Guide", type: "PDF" },
      { title: "Romeo and Juliet Text", type: "Book" },
      { title: "To Kill a Mockingbird Text", type: "Book" },
      { title: "Poetry Anthology", type: "Book" },
      { title: "Video: Shakespeare's Life and Times", type: "Video" }
    ],
    lessonPlans: [
      { id: 1, title: "Introduction to Literary Analysis", date: "Week 1, Day 1" },
      { id: 2, title: "Character Analysis in Short Fiction", date: "Week 1, Day 3" },
      { id: 3, title: "Edgar Allan Poe: The Tell-Tale Heart", date: "Week 3, Day 2" },
      { id: 4, title: "Introduction to Romeo and Juliet", date: "Week 7, Day 1" },
      { id: 5, title: "Analyzing Poetic Devices", date: "Week 13, Day 1" }
    ]
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" size="sm" onClick={() => router.back()} className="mr-2">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{curriculum.title}</h1>
          <div className="flex flex-wrap gap-x-2 mt-2 text-muted-foreground">
            <span>{curriculum.subject}</span>
            <span>•</span>
            <span>{curriculum.gradeLevel}</span>
            <span>•</span>
            <span>Created by {curriculum.author}</span>
            <span>•</span>
            <span>{curriculum.date}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setBookmarked(!bookmarked)}>
            {bookmarked ? (
              <>
                <Bookmark className="h-4 w-4 mr-2" />
                Bookmarked
              </>
            ) : (
              <>
                <BookmarkPlus className="h-4 w-4 mr-2" />
                Bookmark
              </>
            )}
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </div>
      </div>
      
      <Separator />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="units">Units</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="lesson-plans">Lesson Plans</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{curriculum.description}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Learning Outcomes</CardTitle>
                  <CardDescription>What students will learn from this curriculum</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    {curriculum.outcomes.map((outcome, index) => (
                      <li key={index}>{outcome}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="units" className="space-y-6">
              {curriculum.units.map((unit, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex justify-between">
                      <CardTitle>Unit {index + 1}: {unit.title}</CardTitle>
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{unit.duration}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>{unit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="resources" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Curriculum Resources</CardTitle>
                  <CardDescription>Materials needed for this curriculum</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="divide-y">
                    {curriculum.resources.map((resource, index) => (
                      <li key={index} className="py-3 flex justify-between items-center">
                        <div className="flex items-center">
                          {resource.type === "PDF" && <FileText className="h-4 w-4 mr-2 text-primary" />}
                          {resource.type === "Book" && <Book className="h-4 w-4 mr-2 text-primary" />}
                          {resource.type === "Video" && <FileText className="h-4 w-4 mr-2 text-primary" />}
                          <span>{resource.title}</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Download</span>
                        </Button>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="lesson-plans" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Related Lesson Plans</CardTitle>
                  <CardDescription>Individual lessons based on this curriculum</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="divide-y">
                    {curriculum.lessonPlans.map((lesson) => (
                      <li key={lesson.id} className="py-3 flex justify-between items-center">
                        <div>
                          <Link href={`/lesson-plans/${lesson.id}`} className="font-medium hover:underline">
                            {lesson.title}
                          </Link>
                          <div className="text-sm text-muted-foreground">{lesson.date}</div>
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/lesson-plans/${lesson.id}`}>
                            View
                          </Link>
                        </Button>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4">
                    <Button asChild>
                      <Link href="/lesson-plans/list">
                        View All Lesson Plans
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Curriculum Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Academic Year</p>
                    <p className="text-sm text-muted-foreground">2023-2024</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Duration</p>
                    <p className="text-sm text-muted-foreground">Full Year (36 weeks)</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Book className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Units</p>
                    <p className="text-sm text-muted-foreground">{curriculum.units.length} units</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Lesson Plans</p>
                    <p className="text-sm text-muted-foreground">{curriculum.lessonPlans.length} lessons</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Target Audience</p>
                    <p className="text-sm text-muted-foreground">10th Grade Students</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Classes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-muted rounded-lg">
                  <div className="font-medium">English 10A - Period 3</div>
                  <div className="text-sm text-muted-foreground">Today, 10:30 AM</div>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <div className="font-medium">English 10B - Period 6</div>
                  <div className="text-sm text-muted-foreground">Tomorrow, 1:45 PM</div>
                </div>
              </div>
              <div className="mt-4">
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/calendar">
                    <Calendar className="h-4 w-4 mr-2" />
                    View Calendar
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="destructive" className="w-full">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Curriculum
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}