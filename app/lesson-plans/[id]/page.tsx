"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, Clock, Calendar, FileText, Users, Printer, Download, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LessonPlanDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  
  // Mock lesson plan data
  const lessonPlan = {
    id: parseInt(params.id),
    title: "Introduction to Romeo and Juliet",
    subject: "English",
    gradeLevel: "10th Grade",
    date: "September 15, 2023",
    duration: "60 minutes",
    author: "John Peterson",
    status: "published",
    overview: "This lesson introduces students to Shakespeare's Romeo and Juliet, focusing on the historical context, themes, and character introductions. Students will engage with the prologue and analyze its significance.",
    objectives: [
      "Understand the historical context of Shakespeare's works",
      "Identify major themes in Romeo and Juliet",
      "Analyze the prologue and its significance to the play",
      "Predict plot developments based on the prologue"
    ],
    materials: [
      "Romeo and Juliet texts (one per student)",
      "Handout: 'Introduction to Elizabethan England'",
      "Presentation slides",
      "Audio recording of the prologue"
    ],
    procedure: [
      {
        time: "0-10 minutes",
        activity: "Introduction",
        description: "Begin with a brief overview of William Shakespeare and the historical context of Elizabethan England. Discuss the popularity of theater during this time period."
      },
      {
        time: "10-25 minutes",
        activity: "Prologue Analysis",
        description: "Distribute copies of the prologue. Read aloud and ask students to identify unfamiliar words or phrases. Discuss the meaning of the prologue and what it reveals about the play."
      },
      {
        time: "25-40 minutes",
        activity: "Theme Identification",
        description: "In small groups, have students identify potential themes based on the prologue. Groups will share their findings with the class and explain their reasoning."
      },
      {
        time: "40-55 minutes",
        activity: "Character Introduction",
        description: "Introduce the main characters and their relationships. Students will create a simple relationship diagram to help them visualize these connections."
      },
      {
        time: "55-60 minutes",
        activity: "Conclusion & Assignment",
        description: "Recap the main points of the lesson and explain the homework assignment: Read Act 1, Scene 1 and answer the discussion questions."
      }
    ],
    assessment: "Students will be assessed based on their participation in discussions, ability to analyze the prologue, and completion of the character relationship diagram.",
    differentiation: "For advanced students: Additional analysis questions exploring the deeper symbolism in the prologue. For struggling students: Simplified version of the prologue with modern English translations.",
    homework: "Read Act 1, Scene 1 of Romeo and Juliet and answer the provided discussion questions.",
    resources: [
      { title: "Introduction to Elizabethan England Handout", type: "PDF" },
      { title: "Prologue Analysis Worksheet", type: "PDF" },
      { title: "Character Relationship Template", type: "PDF" },
      { title: "Act 1, Scene 1 Discussion Questions", type: "PDF" }
    ],
    standards: [
      "CCSS.ELA-LITERACY.RL.9-10.1: Cite strong and thorough textual evidence to support analysis of what the text says explicitly as well as inferences drawn from the text.",
      "CCSS.ELA-LITERACY.RL.9-10.3: Analyze how complex characters develop over the course of a text, interact with other characters, and advance the plot or develop the theme.",
      "CCSS.ELA-LITERACY.RL.9-10.4: Determine the meaning of words and phrases as they are used in the text, including figurative and connotative meanings."
    ],
    reflection: "This lesson serves as an important foundation for the entire Romeo and Juliet unit. Focus on ensuring students understand the historical context and basic plot outline before proceeding to more complex analysis in subsequent lessons."
  };
  
  // Generate a random status color
  const statusColors = {
    draft: "text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30",
    published: "text-green-500 bg-green-100 dark:bg-green-900/30",
    archived: "text-gray-500 bg-gray-100 dark:bg-gray-800"
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
          <h1 className="text-3xl font-bold tracking-tight">{lessonPlan.title}</h1>
          <div className="flex flex-wrap gap-x-2 mt-2 text-muted-foreground">
            <span>{lessonPlan.subject}</span>
            <span>•</span>
            <span>{lessonPlan.gradeLevel}</span>
            <span>•</span>
            <span>{lessonPlan.date}</span>
            <span>•</span>
            <span>{lessonPlan.duration}</span>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" size="sm">
            <Printer className="h-4 w-4 mr-2" />
            Print
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
      
      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[lessonPlan.status as keyof typeof statusColors]}`}>
        {lessonPlan.status.charAt(0).toUpperCase() + lessonPlan.status.slice(1)}
      </div>
      
      <Separator />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="procedure">Procedure</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="standards">Standards</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Lesson Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{lessonPlan.overview}</p>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Learning Objectives</CardTitle>
                    <CardDescription>What students will learn from this lesson</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-2">
                      {lessonPlan.objectives.map((objective, index) => (
                        <li key={index}>{objective}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Materials</CardTitle>
                    <CardDescription>Required materials for this lesson</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-2">
                      {lessonPlan.materials.map((material, index) => (
                        <li key={index}>{material}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Assessment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{lessonPlan.assessment}</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Differentiation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{lessonPlan.differentiation}</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="procedure" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Lesson Procedure</CardTitle>
                  <CardDescription>Step-by-step guide for conducting this lesson</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {lessonPlan.procedure.map((step, index) => (
                      <div key={index} className="relative pl-10 pb-6 border-l">
                        <div className="absolute left-0 top-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs">
                          {index + 1}
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center">
                            <h4 className="font-medium">{step.activity}</h4>
                            <div className="ml-auto text-sm text-muted-foreground flex items-center">
                              <Clock className="h-3.5 w-3.5 mr-1" />
                              {step.time}
                            </div>
                          </div>
                          <p className="text-muted-foreground">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Homework</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{lessonPlan.homework}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Teacher Reflection</CardTitle>
                  <CardDescription>Notes for implementation</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{lessonPlan.reflection}</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="resources" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Lesson Resources</CardTitle>
                  <CardDescription>Supporting materials for this lesson</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="divide-y">
                    {lessonPlan.resources.map((resource, index) => (
                      <li key={index} className="py-3 flex justify-between items-center">
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 mr-2 text-primary" />
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
            
            <TabsContent value="standards" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Alignment to Standards</CardTitle>
                  <CardDescription>Educational standards addressed in this lesson</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {lessonPlan.standards.map((standard, index) => (
                      <li key={index} className="bg-muted p-3 rounded-md">
                        {standard}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Lesson Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Date</p>
                    <p className="text-sm text-muted-foreground">{lessonPlan.date}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Duration</p>
                    <p className="text-sm text-muted-foreground">{lessonPlan.duration}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Subject & Grade</p>
                    <p className="text-sm text-muted-foreground">{lessonPlan.subject}, {lessonPlan.gradeLevel}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Author</p>
                    <p className="text-sm text-muted-foreground">{lessonPlan.author}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Related Curriculum</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Link href="/curricula/1" className="block hover:underline">
                  English Literature Grade 10
                </Link>
                <p className="text-sm text-muted-foreground">
                  This lesson is part of the English Literature curriculum for 10th grade students.
                </p>
                <Button variant="outline" className="w-full mt-2" asChild>
                  <Link href="/curricula/1">
                    View Curriculum
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Classes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-muted rounded-lg">
                  <div className="font-medium">English 10A - Period 3</div>
                  <div className="text-sm text-muted-foreground">September 15, 10:30 AM</div>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <div className="font-medium">English 10B - Period 6</div>
                  <div className="text-sm text-muted-foreground">September 15, 1:45 PM</div>
                </div>
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
                Delete Lesson Plan
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}