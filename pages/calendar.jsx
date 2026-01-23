import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Calendar as BigCalendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Reusetable from "@/componentPages/reusetable";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "./calendar.css";

const localizer = dayjsLocalizer(dayjs);

const Calendar = () => {
  const [date, setDate] = useState(new Date(2026, 0, 1));

  const events = [
    {
      id: 1,
      title: "10:40am - 10:55am\nJoint and Spine Care",
      start: new Date(2026, 0, 7, 10, 40),
      end: new Date(2026, 0, 7, 10, 55),
    },
    {
      id: 2,
      title: "01:00pm - 01:15pm\nJoint and Spine Care",
      start: new Date(2026, 0, 8, 13, 0),
      end: new Date(2026, 0, 8, 13, 15),
    },
    {
      id: 3,
      title: "10:20am - 10:35am\nJoint and Spine Care",
      start: new Date(2026, 0, 13, 10, 20),
      end: new Date(2026, 0, 13, 10, 35),
    },
  ];

  return (
    <Reusetable headertitle="calendar">
      <div className="w-full min-h-screen bg-white flex flex-col">

        {/* Header Controls */}
        <div className="px-4 sm:px-6 py-4 border-b bg-white">
          <div className="flex flex-wrap gap-3">
            <Select defaultValue="all-services">
              <SelectTrigger className="w-full sm:w-[180px] bg-gray-50">
                <SelectValue placeholder="Services: All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-services">Services: All</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="all-staff">
              <SelectTrigger className="w-full sm:w-[180px] bg-gray-50">
                <SelectValue placeholder="Staff: All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-staff">Staff: All</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="all-status">
              <SelectTrigger className="w-full sm:w-[180px] bg-gray-50">
                <SelectValue placeholder="Status: All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-status">Status: All</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="disabled">
              <SelectTrigger className="w-full sm:w-[200px] bg-gray-50">
                <SelectValue placeholder="Auto Refresh: disabled" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="disabled">Auto Refresh: disabled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* View + Navigation */}
        <div className="px-4 sm:px-6 py-4 flex flex-col lg:flex-row gap-4 border-b bg-white">

          <div className="flex flex-wrap gap-2">
            <button className="px-3 py-2 rounded-md text-sm sm:text-base hover:bg-gray-50">Day</button>
            <button className="px-3 py-2 rounded-md text-sm sm:text-base hover:bg-gray-50">Week</button>
            <button className="px-3 py-2 rounded-md text-sm sm:text-base bg-gray-100">Month</button>
          </div>

          <div className="flex flex-wrap items-center gap-4 justify-between w-full lg:w-auto">

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setDate(dayjs(date).subtract(1, "month").toDate())}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>

              <span className="font-semibold text-base sm:text-lg min-w-[140px] text-center">
                {dayjs(date).format("MMMM YYYY")}
              </span>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setDate(dayjs(date).add(1, "month").toDate())}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-gray-500 text-sm hidden sm:block">Detailed view</span>
              <button className="w-12 h-6 bg-gray-200 rounded-full relative">
                <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 shadow-sm"></div>
              </button>
              <Button variant="outline" size="sm" onClick={() => setDate(new Date())}>
                Today
              </Button>
            </div>

          </div>
        </div>

        {/* Calendar */}
        <div className="flex-1 p-2 sm:p-4 overflow-x-auto">
          <BigCalendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            date={date}
            onNavigate={(d) => setDate(d)}
            defaultView="month"
            views={["month"]}
            toolbar={false}
          />
        </div>

      </div>
    </Reusetable>
  );
};

export default Calendar;
