import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight, BookOpen, Calendar, Layout, FileText } from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="py-12 md:py-24 lg:py-32 space-y-8">
        <div className="container px-4 md:px-6 space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Welcome to the Curriculum Planner Platform
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            A modern solution for educators to create, manage, and share curriculum materials
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild>
              <Link href="/auth/login">
                Get Started
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/curricula/list">
                Browse Curricula
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="transition-all duration-200 hover:shadow-lg">
              <CardHeader>
                <BookOpen className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>Curriculum Management</CardTitle>
                <CardDescription>Create and manage your curriculum materials in one place</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="ghost" size="sm" className="gap-1" asChild>
                  <Link href="/curricula/list">
                    Explore <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
            <Card className="transition-all duration-200 hover:shadow-lg">
              <CardHeader>
                <FileText className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>Lesson Planning</CardTitle>
                <CardDescription>Develop comprehensive lesson plans with ease</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="ghost" size="sm" className="gap-1" asChild>
                  <Link href="/lesson-plans/list">
                    Explore <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
            <Card className="transition-all duration-200 hover:shadow-lg">
              <CardHeader>
                <Calendar className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>Calendar Integration</CardTitle>
                <CardDescription>Schedule and organize your teaching calendar</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="ghost" size="sm" className="gap-1" asChild>
                  <Link href="/calendar">
                    Explore <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
            <Card className="transition-all duration-200 hover:shadow-lg">
              <CardHeader>
                <Layout className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>Dashboard Analytics</CardTitle>
                <CardDescription>Track progress and get insights on your curriculum</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="ghost" size="sm" className="gap-1" asChild>
                  <Link href="/dashboard">
                    Explore <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}