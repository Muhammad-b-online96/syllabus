"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, Clock, User } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format, addMonths, subMonths } from "date-fns";

// Mock data for events
const mockEvents = [
  {
    id: 1,
    title: "Grade 10 English - Romeo and Juliet",
    date: "2023-09-14",
    time: "10:00 AM - 11:00 AM",
    location: "Room 202",
    type: "class"
  },
  {
    id: 2,
    title: "Department Meeting",
    date: "2023-09-14",
    time: "2:30 PM - 3:30 PM",
    location: "Conference Room",
    type: "meeting"
  },
  {
    id: 3,
    title: "Grade 11 History - Civil War",
    date: "2023-09-15",
    time: "9:00 AM - 10:30 AM",
    location: "Room 103",
    type: "class"
  },
  {
    id: 4,
    title: "Parent-Teacher Conference",
    date: "2023-09-16",
    time: "4:00 PM - 7:00 PM",
    location: "School Gymnasium",
    type: "event"
  },
  {
    id: 5,
    title: "Grade 10 English - Poetry Analysis",
    date: "2023-09-18",
    time: "10:00 AM - 11:00 AM",
    location: "Room 202",
    type: "class"
  }
];

export default function CalendarPage() {
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState<"month" | "week" | "day">("month");
  
  const formattedDate = format(date, "MMMM yyyy");
  
  // Filter events for the current date in day view
  const todaysEvents = mockEvents.filter(event => 
    event.date === format(date, "yyyy-MM-dd")
  );
  
  // Generate hours for day view
  const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 7 PM
  
  const eventTypes = {
    class: "bg-blue-100 border-blue-500 text-blue-800 dark:bg-blue-900/40 dark:border-blue-600 dark:text-blue-300",
    meeting: "bg-purple-100 border-purple-500 text-purple-800 dark:bg-purple-900/40 dark:border-purple-600 dark:text-purple-300",
    event: "bg-amber-100 border-amber-500 text-amber-800 dark:bg-amber-900/40 dark:border-amber-600 dark:text-amber-300",
    deadline: "bg-red-100 border-red-500 text-red-800 dark:bg-red-900/40 dark:border-red-600 dark:text-red-300"
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
          <p className="text-muted-foreground">
            Manage your schedule and view upcoming events.
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Event
        </Button>
      </div>
      
      <Separator />
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-64">
          <Card>
            <CardContent className="p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(date) => date && setDate(date)}
                className="rounded-md border shadow-sm"
              />
            </CardContent>
          </Card>
          
          <div className="mt-6 space-y-2">
            <h3 className="font-medium text-sm">Event Types</h3>
            <div className="space-y-2">
              {Object.entries(eventTypes).map(([type, className]) => (
                <div key={type} className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${className.split(" ")[1]}`}></div>
                  <span className="text-sm capitalize">{type}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-6">
            <Button variant="outline" className="w-full">Show Filtered Events</Button>
          </div>
        </div>
        
        <div className="flex-1">
          <Card className="mb-6">
            <CardHeader className="p-4 flex flex-row items-center space-y-0">
              <div className="flex-1 flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setDate(subMonths(date, 1))}
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Previous month</span>
                </Button>
                <h3 className="font-bold text-lg">{formattedDate}</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setDate(addMonths(date, 1))}
                >
                  <ChevronRight className="h-4 w-4" />
                  <span className="sr-only">Next month</span>
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <Select value={view} onValueChange={(value) => setView(value as "month" | "week" | "day")}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="View" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="month">Month</SelectItem>
                    <SelectItem value="week">Week</SelectItem>
                    <SelectItem value="day">Day</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  Today
                </Button>
              </div>
            </CardHeader>
          </Card>
          
          {view === "month" && (
            <div className="grid grid-cols-7 gap-1">
              {/* Day headers */}
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="p-2 text-center font-medium text-sm">
                  {day}
                </div>
              ))}
              
              {/* Calendar grid - in a real app, this would be dynamically generated */}
              {Array.from({ length: 35 }, (_, i) => (
                <div 
                  key={i} 
                  className={`
                    min-h-24 p-1 border rounded-md
                    ${i % 7 === 0 || i % 7 === 6 ? 'bg-muted/50' : ''}
                    ${i === 13 ? 'ring-2 ring-primary ring-offset-2' : ''}
                  `}
                >
                  <div className="font-medium text-sm p-1">{(i - 3 > 0 && i - 3 <= 30) ? i - 3 : ''}</div>
                  {i === 13 && (
                    <div className="space-y-1">
                      <div className={`text-xs p-1 rounded border-l-2 truncate ${eventTypes.class}`}>
                        10:00 AM - English Class
                      </div>
                      <div className={`text-xs p-1 rounded border-l-2 truncate ${eventTypes.meeting}`}>
                        2:30 PM - Department Meeting
                      </div>
                    </div>
                  )}
                  {i === 14 && (
                    <div className="space-y-1">
                      <div className={`text-xs p-1 rounded border-l-2 truncate ${eventTypes.class}`}>
                        9:00 AM - History Class
                      </div>
                    </div>
                  )}
                  {i === 15 && (
                    <div className="space-y-1">
                      <div className={`text-xs p-1 rounded border-l-2 truncate ${eventTypes.event}`}>
                        4:00 PM - Parent-Teacher Conf.
                      </div>
                    </div>
                  )}
                  {i === 17 && (
                    <div className="space-y-1">
                      <div className={`text-xs p-1 rounded border-l-2 truncate ${eventTypes.class}`}>
                        10:00 AM - English Class
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          
          {view === "day" && (
            <div className="space-y-6">
              <h3 className="font-medium text-lg">
                {format(date, "EEEE, MMMM d, yyyy")}
              </h3>
              
              {todaysEvents.length > 0 ? (
                <div className="space-y-4">
                  {todaysEvents.map(event => (
                    <Card key={event.id}>
                      <CardContent className="p-4">
                        <div className={`p-4 rounded-md border-l-4 ${eventTypes[event.type as keyof typeof eventTypes]}`}>
                          <h4 className="font-medium">{event.title}</h4>
                          <div className="mt-2 space-y-1">
                            <div className="flex items-center text-sm">
                              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center text-sm">
                              <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>{event.location}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <CalendarIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No events scheduled</h3>
                  <p className="text-muted-foreground mt-2 mb-6">
                    There are no events scheduled for this day.
                  </p>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Event
                  </Button>
                </div>
              )}
            </div>
          )}
          
          {view === "week" && (
            <div className="space-y-4">
              <div className="grid grid-cols-7 gap-1">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
                  <div key={day} className={`text-center p-2 rounded-md ${index === 3 ? 'bg-primary/10' : ''}`}>
                    <div className="font-medium">{day}</div>
                    <div className={`h-8 w-8 rounded-full mx-auto flex items-center justify-center mt-1 ${index === 3 ? 'bg-primary text-primary-foreground' : ''}`}>
                      {10 + index}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border rounded-md">
                <div className="grid grid-cols-8 border-b">
                  <div className="p-2 text-center text-sm font-medium">Time</div>
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="p-2 text-center text-sm font-medium">
                      {day}
                    </div>
                  ))}
                </div>
                
                {hours.map((hour) => (
                  <div key={hour} className="grid grid-cols-8 border-b last:border-b-0">
                    <div className="p-2 text-center text-sm font-medium border-r">
                      {hour > 12 ? hour - 12 : hour} {hour >= 12 ? "PM" : "AM"}
                    </div>
                    {Array.from({ length: 7 }).map((_, dayIndex) => (
                      <div key={dayIndex} className="p-2 min-h-16 border-r last:border-r-0 relative">
                        {dayIndex === 3 && hour === 10 && (
                          <div className={`absolute top-2 left-2 right-2 p-1 text-xs rounded ${eventTypes.class}`}>
                            <div className="font-medium truncate">Grade 10 English</div>
                            <div className="truncate">Room 202</div>
                          </div>
                        )}
                        {dayIndex === 3 && hour === 14 && (
                          <div className={`absolute top-2 left-2 right-2 p-1 text-xs rounded ${eventTypes.meeting}`}>
                            <div className="font-medium truncate">Department Meeting</div>
                            <div className="truncate">Conference Room</div>
                          </div>
                        )}
                        {dayIndex === 4 && hour === 9 && (
                          <div className={`absolute top-2 left-2 right-2 p-1 text-xs rounded ${eventTypes.class}`}>
                            <div className="font-medium truncate">Grade 11 History</div>
                            <div className="truncate">Room 103</div>
                          </div>
                        )}
                        {dayIndex === 5 && hour === 16 && (
                          <div className={`absolute top-2 left-2 right-2 p-1 text-xs rounded ${eventTypes.event}`}>
                            <div className="font-medium truncate">Parent-Teacher Conference</div>
                            <div className="truncate">Gymnasium</div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}