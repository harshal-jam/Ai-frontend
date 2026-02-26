import { Progress } from "@/components/ui/progress";
import { Stepper } from "react-form-stepper";
import SelectService from "@/componentPages/stepperservice";
import AppointmentScheduler from "@/componentPages/appointmentsecdule";
import BookingConfirmation from "@/componentPages/confirmation";
import PersonalInformation from "@/componentPages/personalinformation";
import { useState } from "react";
import Service from "./service";

const steps = [
  { label: "Service" },
  { label: "Select Date & Time" },
  { label: "Your Details" },
  { label: "Final Confirmation" },
];

function Booking() {
  const [activesteps, setactivesteps] = useState(0);
  const [bookingdata, setbookingdata] = useState({
    service: null,
    date: null,
    time: null,
    personalInfo: {
      fullName: "",
      mobileNumber: "",
      email: "",
      description: "",
    },
  });

  const progress = ((activesteps + 1) / steps.length) * 100;
  console.log(bookingdata);

  return (
    <div className="min-h-screen bg-white flex justify-center p-4">
      {/* CENTER CARD */}
      <div className="w-full max-w-4xl bg-white  shadow-lg">
        {/* STICKY HEADER (Stepper + Progress) */}
        <div className="sticky top-0 z-50 bg-white rounded-t-2xl border-b p-4">
          {/* Same line layout */}
          <div className="flex flex-col gap-3">
            <Stepper
              steps={steps}
              activeStep={activesteps}
              styleConfig={{
                activeBgColor: "#2563eb",
                completedBgColor: "#22c55e",
                inactiveBgColor: "#cbd5e1",
                activeTextColor: "#ffffff",
                completedTextColor: "#ffffff",
                inactiveTextColor: "#000000",
              }}
            />

            <div className="flex items-center gap-2">
              <Progress
                value={progress}
                className="h-3 flex-1 bg-gray-200 [&>div]:bg-blue-600 [&>div]:transition-all [&>div]:duration-500"
              />
              <p className="text-sm text-muted-foreground w-10 text-right">
                {Math.round(progress)}%
              </p>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div>
          {activesteps === 0 && (
            <SelectService
              onNext={() => setactivesteps(1)}
              setBookingData={setbookingdata}
            />
          )}

          {activesteps === 1 && (
            <AppointmentScheduler
              onNext={() => setactivesteps(2)}
              onBack={() => setactivesteps(0)}
               bookingData={bookingdata}
  setBookingData={setbookingdata}
            />
          )}

          {activesteps === 2 && (
            <PersonalInformation
              onNext={() => setactivesteps(3)}
              onBack={() => setactivesteps(1)}
              setBookingData={setbookingdata}
            />
          )}

          {activesteps === 3 && (
            <BookingConfirmation onBack={() => setactivesteps(2)} 
            setBookingData={setbookingdata}
            bookingdata={bookingdata}/>
          )}
        </div>
      </div>
    </div>
  );
}

export default Booking;
