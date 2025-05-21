"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "next-themes";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSave = async () => {
    setIsLoading(true);
    
    // Simulate saving delay
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>
      <Separator />
      
      <Tabs defaultValue="account" className="space-y-4">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        
        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>
                Update your account details and personal information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First name</Label>
                  <Input id="firstName" defaultValue="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input id="lastName" defaultValue="Peterson" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="john.peterson@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select defaultValue="teacher">
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="teacher">Teacher</SelectItem>
                    <SelectItem value="admin">Administrator</SelectItem>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="parent">Parent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <textarea
                  id="bio"
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Write a short bio about yourself"
                  defaultValue="English teacher with 10+ years of experience specializing in literature and creative writing."
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save changes"}
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Work Information</CardTitle>
              <CardDescription>
                Update your school and teaching details.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="school">School</Label>
                <Input id="school" defaultValue="Lincoln High School" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input id="department" defaultValue="English" />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="gradeLevel">Grade Level</Label>
                  <Input id="gradeLevel" defaultValue="9-12" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subjects">Subjects Taught</Label>
                  <Input id="subjects" defaultValue="English Literature, Creative Writing" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Theme</CardTitle>
              <CardDescription>
                Customize the appearance of the application.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <Select defaultValue={theme} onValueChange={setTheme}>
                  <SelectTrigger id="theme">
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="fontSize">Font Size</Label>
                  <span className="text-sm text-muted-foreground">Normal</span>
                </div>
                <Slider defaultValue={[50]} max={100} step={1} id="fontSize" />
              </div>
              
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Accessibility</h4>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="reducedMotion" className="flex-1">
                      Reduce motion
                      <span className="block text-xs text-muted-foreground">
                        Reduce the animation and motion effects.
                      </span>
                    </Label>
                    <Switch id="reducedMotion" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="highContrast" className="flex-1">
                      High contrast
                      <span className="block text-xs text-muted-foreground">
                        Increase the color contrast.
                      </span>
                    </Label>
                    <Switch id="highContrast" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Configure how you receive notifications.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Email Notifications</h4>
                <div className="grid gap-2">
                  {[
                    "Curriculum updates",
                    "Lesson plan changes",
                    "Comments on your content",
                    "Calendar events",
                    "System announcements"
                  ].map((item) => (
                    <div key={item} className="flex items-center justify-between">
                      <Label htmlFor={item.toLowerCase().replace(/\s+/g, "-")} className="flex-1">
                        {item}
                      </Label>
                      <Switch id={item.toLowerCase().replace(/\s+/g, "-")} defaultChecked />
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Push Notifications</h4>
                <div className="grid gap-2">
                  {[
                    "Curriculum updates",
                    "Lesson plan changes",
                    "Comments on your content",
                    "Calendar events",
                    "System announcements"
                  ].map((item) => (
                    <div key={item} className="flex items-center justify-between">
                      <Label htmlFor={`push-${item.toLowerCase().replace(/\s+/g, "-")}`} className="flex-1">
                        {item}
                      </Label>
                      <Switch id={`push-${item.toLowerCase().replace(/\s+/g, "-")}`} />
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="emailDigest">Email Digest Frequency</Label>
                <Select defaultValue="daily">
                  <SelectTrigger id="emailDigest">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="realtime">Real-time</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="never">Never</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Calendar Settings</CardTitle>
              <CardDescription>
                Configure your calendar preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="defaultView">Default Calendar View</Label>
                <Select defaultValue="week">
                  <SelectTrigger id="defaultView">
                    <SelectValue placeholder="Select default view" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="day">Day</SelectItem>
                    <SelectItem value="week">Week</SelectItem>
                    <SelectItem value="month">Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="weekStartsOn">Week Starts On</Label>
                <Select defaultValue="sunday">
                  <SelectTrigger id="weekStartsOn">
                    <SelectValue placeholder="Select first day of week" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sunday">Sunday</SelectItem>
                    <SelectItem value="monday">Monday</SelectItem>
                    <SelectItem value="saturday">Saturday</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="defaultDuration">Default Event Duration</Label>
                <Select defaultValue="60">
                  <SelectTrigger id="defaultDuration">
                    <SelectValue placeholder="Select default duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">60 minutes</SelectItem>
                    <SelectItem value="90">90 minutes</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Calendar Display Options</h4>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="showWeekends" className="flex-1">
                      Show weekends
                    </Label>
                    <Switch id="showWeekends" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="showWeekNumbers" className="flex-1">
                      Show week numbers
                    </Label>
                    <Switch id="showWeekNumbers" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="showHolidays" className="flex-1">
                      Show holidays
                    </Label>
                    <Switch id="showHolidays" defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>
                Update your password here. After saving, you'll be logged out.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current password</Label>
                <Input id="currentPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New password</Label>
                <Input id="newPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm password</Label>
                <Input id="confirmPassword" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="mr-2">Cancel</Button>
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? "Updating..." : "Update password"}
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>
                Add an extra layer of security to your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h4 className="text-sm font-medium">
                    Two-factor authentication
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Secure your account with two-factor authentication.
                  </p>
                </div>
                <Switch id="twoFactorAuth" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Sessions</CardTitle>
              <CardDescription>
                Manage your active sessions and devices.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-medium">
                      Chrome on Windows
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      San Francisco, USA • Current session
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Logout
                  </Button>
                </div>
                <div className="flex items-start justify-between">
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-medium">
                      Safari on MacOS
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      San Francisco, USA • Last active: 2 days ago
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Logout
                  </Button>
                </div>
                <div className="flex items-start justify-between">
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-medium">
                      Chrome on iPhone
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      San Francisco, USA • Last active: 5 days ago
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Logout
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="destructive">Logout of all sessions</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}