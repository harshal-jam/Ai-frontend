import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Stethoscope,
} from "lucide-react";
import { useServiceTitles } from "@/context/servicecontext";

export default function SelectService({ onNext, setBookingData }) {
  const { titles } = useServiceTitles();
  const [selected, setSelected] = useState("");

  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white p-6 md:p-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-900">
            Select a Service
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Please choose the service you would like to book from the options
            below.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {titles.map((service) => {
            const isActive = selected === service.title;

            return (
              <Card
                key={service._id}
                onClick={() => setSelected(service.title)} // ✅ Store title instead of _id
                className={`cursor-pointer transition-all rounded-xl border-2 p-1 hover:shadow-md ${
                  isActive
                    ? "border-blue-500"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <CardContent className="flex gap-4 p-5">
                  <div
                    className={`h-10 w-10 flex items-center justify-center rounded-lg ${
                      isActive
                        ? "bg-blue-50 text-blue-600"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    <Stethoscope className="h-5 w-5" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-slate-900">
                        {service.title}
                      </h3>
                      {isActive && (
                        <CheckCircle className="h-5 w-5 text-blue-500" />
                      )}
                    </div>
                    <p className="text-sm text-slate-500 mt-1">
                      {service.category}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-8 flex items-center justify-between">
          <button className="text-sm text-slate-500 hover:text-slate-700">
            Cancel
          </button>
          <Button
            onClick={() => {
              if (!selected) {
                return alert("Please select a service");
              }
              // ✅ Pass service TITLE (not _id) so backend can filter by it
              setBookingData((prev) => ({
                ...prev,
                service: selected, // This is now service.title
              }));
              onNext();
            }}
            className="rounded-lg px-6"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}