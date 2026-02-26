import React, { useEffect, useState } from "react";
import { ArrowRight, ArrowLeft, Calendar as CalendarIcon, User } from "lucide-react";
import { format, startOfDay } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import api from "@/api";

const AppointmentScheduler = ({
  onNext,
  onBack,
  bookingData,
  setBookingData,
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [employees, setEmployees] = useState([]);
  const [workingHours, setWorkingHours] = useState([]);

  /* ================================
     1️⃣  Fetch staff by selected service (using service TITLE now)
  ==================================*/
  useEffect(() => {
    if (bookingData?.service) {
     api.get(`/api/staff/by-service?service=${bookingData.service}`)
        .then((res) => {
          setEmployees(res.data);
        })
        .catch((err) => {
          console.log("Error fetching employees:", err);
          alert("Failed to load employees for this service");
        });
    }
  }, [bookingData?.service]);

  /* ================================
     2️⃣  Fetch working hours when employee selected
  ==================================*/
  useEffect(() => {
    if (selectedEmployee) {
      api
        .get(`/api/staff/${selectedEmployee}/working-hours`)
        .then((res) => {
          setWorkingHours(res.data);
        })
        .catch((err) => {
          console.log("Error fetching working hours:", err);
        });
    }
  }, [selectedEmployee]);

  /* ================================
     3️⃣  Get working hours for selected date
  ==================================*/
  const selectedDay = selectedDate ? format(selectedDate, "EEEE") : null;

  const todayWorkingHours = workingHours.find(
    (wh) =>
      wh.day?.toLowerCase().trim() === selectedDay?.toLowerCase().trim() &&
      !wh.isDayOff
  );

  // ✅ Get lunch break info
  const lunchBreak = workingHours.find((wh) => wh.day === "Lunch");

  /* ================================
     4️⃣  Generate slots dynamically (excluding lunch break)
  ==================================*/
  const generateSlots = (from, to, lunchFrom, lunchTo) => {
    const slots = [];
    let start = new Date(`2024-01-01 ${from}`);
    const end = new Date(`2024-01-01 ${to}`);

    // Parse lunch times if they exist
    let lunchStart = null;
    let lunchEnd = null;
    if (lunchFrom && lunchTo) {
      lunchStart = new Date(`2024-01-01 ${lunchFrom}`);
      lunchEnd = new Date(`2024-01-01 ${lunchTo}`);
    }

    while (start < end) {
      const currentSlot = start.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      // ✅ Skip slot if it falls within lunch break
      const isLunchTime =
        lunchStart &&
        lunchEnd &&
        start >= lunchStart &&
        start < lunchEnd;

      if (!isLunchTime) {
        slots.push(currentSlot);
      }

      start.setMinutes(start.getMinutes() + 30);
    }

    return slots;
  };

  const slots =
    todayWorkingHours?.from && todayWorkingHours?.to
      ? generateSlots(
          todayWorkingHours.from,
          todayWorkingHours.to,
          lunchBreak?.from,
          lunchBreak?.to
        )
      : [];

  /* ================================
     5️⃣  Save selection to bookingData
  ==================================*/
  useEffect(() => {
    setBookingData((prev) => ({
      ...prev,
      employee: selectedEmployee,
      date: selectedDate,
      time: selectedTime,
    }));
  }, [selectedEmployee, selectedDate, selectedTime]);

  console.log("Selected Day:", selectedDay);
  console.log("Working Hours:", workingHours);
  console.log("Available Slots:", slots);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-6 md:p-8">
          <h1 className="text-2xl font-bold mb-6">
            Schedule Your Appointment
          </h1>

          {/* ================= Date & Employee ================= */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {/* Date Picker */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Select Date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <button className="w-full border px-4 py-3 rounded-lg text-left">
                    {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                  </button>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < startOfDay(new Date())}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Employee Dropdown - Shows only employees who provide selected service */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Select Employee
              </label>
              <Select
                value={selectedEmployee}
                onValueChange={setSelectedEmployee}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose employee" />
                </SelectTrigger>
                <SelectContent>
                  {employees.length === 0 ? (
                    <div className="p-2 text-sm text-gray-500">
                      No employees available for this service
                    </div>
                  ) : (
                    employees.map((emp) => (
                      <SelectItem key={emp._id} value={emp._id}>
                        {emp.fullName}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* ================= Time Slots ================= */}
          <div className="border rounded-xl p-6">
            <h3 className="font-semibold mb-4">Available Time Slots</h3>

            {!selectedEmployee && (
              <p className="text-gray-500 text-sm">
                Please select an employee first
              </p>
            )}

            {selectedEmployee && selectedDay && !todayWorkingHours && (
              <p className="text-red-500 text-sm">
                Employee is not working on {selectedDay}
              </p>
            )}

            {selectedEmployee && todayWorkingHours && slots.length === 0 && (
              <p className="text-amber-500 text-sm">
                No available slots for this day
              </p>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {slots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setSelectedTime(slot)}
                  className={`px-4 py-3 rounded-lg border transition-all
                    ${
                      selectedTime === slot
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-white hover:bg-blue-50 border-gray-200"
                    }`}
                >
                  {slot}
                </button>
              ))}
            </div>

            {/* ✅ Show lunch break info if exists */}
            {lunchBreak?.from && lunchBreak?.to && slots.length > 0 && (
              <p className="text-xs text-gray-500 mt-4">
                Lunch Break: {lunchBreak.from} - {lunchBreak.to}
              </p>
            )}
          </div>

          {/* ================= Buttons ================= */}
          <div className="flex justify-between mt-8">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft size={18} /> Back
            </button>

            <button
              onClick={onNext}
              disabled={!selectedDate || !selectedEmployee || !selectedTime}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
            >
              Confirm & Continue <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentScheduler;


