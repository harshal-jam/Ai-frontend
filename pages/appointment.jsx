import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Trash2, MessageSquare, FileText } from "lucide-react";
import Reusetable from "@/componentPages/reusetable";
import api from "@/api";
import { useEffect } from "react";
import Reusesidebar from "@/componentPages/reusesidebar";
function Appointments() {
  const [activeTab, setActiveTab] = useState("ALL");
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(null);
  const [search, setSearch] = useState("");
  const [add, setadd] = useState([]);
  useEffect(() => {
    fetchAppointments();
  }, [activeTab, date, search]);
  const fetchAppointments = async () => {
    try {
      const params = {};

      if (activeTab !== "ALL") {
        params.status = activeTab;
      }

      if (search.trim() !== "") {
        params.search = search;
      }

      if (date) {
        params.date = format(date, "yyyy-MM-dd");
      }
console.log("Sending params:", params);
      const res = await api.get("/api/appointments", { params });

      setadd(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const tabs = ["ALL", "PENDING", "APPROVED", "CANCELLED"];
  return (
    <Reusesidebar>
      <Reusetable headertitle="appointments">
        {/* Header */}

        {/* Main Content Card */}
        <div className="bg-white rounded-lg shadow-sm">
          {/* Tabs */}
          <div className="border-b">
            <div className="flex overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 sm:px-6 py-3 sm:py-4 font-semibold text-sm sm:text-base whitespace-nowrap transition-colors ${
                    activeTab === tab
                      ? "text-teal-700 border-b-2 border-teal-700 bg-green-100"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Filters and Add Button */}
          <div className="p-3 sm:p-4 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between border-b bg-gray-50">
            <div className="flex flex-col sm:flex-row gap-2 flex-1">
              <div className="flex gap-2">
                <Input
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="outline">
                      {date ? format(date, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(selectedDate) => {
                        setDate(selectedDate);
                        setOpen(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>

                <Button
                  variant="outline"
                  onClick={() => {
                    setActiveTab("ALL");
                    setSearch("");
                    setDate(null);
                  }}
                >
                  Reset
                </Button>
              </div>
            </div>
            <Button className="bg-teal-700 hover:bg-teal-800 text-white font-semibold w-full sm:w-auto">
              + ADD NEW
            </Button>
          </div>

          {/* Desktop Table - Hidden on mobile */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-3 sm:px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    # ↕
                  </th>
                  <th className="px-3 sm:px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-3 sm:px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Staff
                  </th>
                  <th className="px-3 sm:px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-3 sm:px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-3 sm:px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-3 sm:px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-3 sm:px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Payment
                  </th>
                  <th className="px-3 sm:px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-3 sm:px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {add.map((appointment, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {index}
                    </td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900">
                          {appointment.customer_name}
                        </span>
                        <span className="text-sm text-blue-600">
                          {appointment.phone}
                        </span>
                      </div>
                    </td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap text-sm text-gray-700">
                      {appointment.staff}
                    </td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4 text-sm text-gray-700">
                      {appointment.service}
                    </td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap text-sm text-gray-700">
                      {appointment.price}
                    </td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap text-sm text-gray-700">
                      {appointment.date}
                    </td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap text-sm text-gray-700">
                      {appointment.time}
                    </td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap">
                      <Badge className="bg-teal-100 text-teal-800 hover:bg-teal-100 font-normal">
                        {appointment.payment}
                      </Badge>
                    </td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg
                            className="w-3 h-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <span className="text-sm text-gray-700">
                          {appointment.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm text-gray-400">
                          Appointment is past
                        </span>
                        <button className="p-1.5 hover:bg-red-50 rounded transition-colors">
                          <Trash2 className="w-4 h-4 text-red-400 hover:text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden divide-y divide-gray-200">
            {add.map((appointment) => (
              <div key={appointment.id} className="p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="font-bold text-gray-900">
                      #{appointment.id} - {appointment.customer_name}
                    </div>
                    <div className="text-sm text-blue-600">
                      {appointment.phone}
                    </div>
                  </div>
                  <button className="p-1.5 hover:bg-red-50 rounded">
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Staff:</span>
                    <span className="text-gray-900">{appointment.staff}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service:</span>
                    <span className="text-gray-900 text-right">
                      {appointment.service}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date & Time:</span>
                    <span className="text-gray-900">
                      {appointment.date} {appointment.time}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Status:</span>
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-gray-700">
                        {appointment.status}
                      </span>
                    </div>
                  </div>
                  <Badge className="bg-teal-100 text-teal-800 hover:bg-teal-100 font-normal w-full justify-center">
                    {appointment.payment}
                  </Badge>
                  <div className="text-xs text-gray-400 text-center pt-1">
                    Appointment is past
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reusetable>
    </Reusesidebar>
  );
}

export default Appointments;
