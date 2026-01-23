import Popup from "@/componentPages/popupreuse";
import Reusetable from "@/componentPages/reusetable";
import { Button } from "@/components/ui/button";
import { PiPencilLight } from "react-icons/pi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
Select,
SelectContent,
SelectItem,
SelectTrigger,
SelectValue,
} from "@/components/ui/select";
import {
Accordion,
AccordionContent,
AccordionItem,
AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import TimeSelect from "@/componentPages/timeslectreuse";
import DayOffRow from "@/componentPages/reuseday";
function Staff() {
  const tablebody = [
    {
      fullName: "DR BC Lakhera",
      email: "Lakherahomoeopathycentre@gmail.com",
      phone: "+919311057767",
      services: [
        "Joint and Spine Care",
        "Metabolic Disorders",
        "Urinary and Kidney Care",
        "Men's Health",
        "Women's Health",
        "Child Health",
        "Skin and Hair",
        "Neurological Disorders",
        "Mental Health",
        "Digestive Disorders",
        "Respiratory Disorders",
      ],
      workingHours: {
        Monday: "09:00 - 18:00",
        Tuesday: "09:00 - 18:00",
        Wednesday: "09:00 - 18:00",
        Thursday: "Day Off",
        Friday: "09:00 - 18:00",
        Saturday: "09:00 - 18:00",
        Sunday: "Day Off",
      },
    },
  ];
  const [open,setopen]=useState(false)
  return (
    <Reusetable headertitle="add staff">
      <div className="bg-white p-4">
        {/* search bar */}
        <div className="flex flex-col sm:flex-row gap-1 mb-3">
          <Input
            placeholder="SEARCH HERE..."
            className="w-full sm:max-w-xs rounded-xs"
          />
          <Button className="capitalize bg-green-700 rounded-xs">
            add new
          </Button>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-green-50">
              <TableRow className="font-bold text-sm sm:text-base">
                {[
                  "FULL NAME",
                  "EMAIL",
                  "PHONE",
                  "SERVICES",
                  "WORKING HOURS",
                  "ACTIONS",
                ].map((item, i) => (
                  <TableHead key={i}>{item}</TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {tablebody.map((item, i) => (
                <TableRow key={i} className="text-sm sm:text-base">
                  <TableCell>{item.fullName}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.phone}</TableCell>
                  <TableCell>
                    <div className="max-h-[72px] overflow-y-auto ">
                      {item.services.map((service, idx) => (
                        <div key={idx}>{service}</div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-2 max-w-sm">
                      {Object.entries(item.workingHours).map(([day, time]) => (
                        <div
                          key={day}
                          className={
                            time === "Day Off"
                              ? "bg-gray-300 text-gray-700 text-xs px-2 py-1 rounded"
                              : "bg-green-500 text-white text-xs px-2 py-1 rounded"
                          }
                        >
                          {time}
                        </div>
                      ))}
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex gap-2">
                      <PiPencilLight
                        onClick={() => setopen(true)}
                        className="text-green-800 bg-green-200 p-1 rounded cursor-pointer"
                        size={22}
                      />
                      <RiDeleteBin6Line
                        className="text-red-800 bg-red-300 p-1 rounded cursor-pointer"
                        size={22}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <Popup open={open} onOpenChange={setopen} title="edit staff #4">

    <div className="space-y-4">
      {/* DETAILS */}
      <Accordion type="single" collapsible defaultValue="details">
        <AccordionItem value="details" className="border rounded-md">
          <AccordionTrigger className="px-4 py-3 bg-emerald-50 text-emerald-800 font-bold text-xl rounded-t-md">
            Details
          </AccordionTrigger>
          <AccordionContent className="px-4 py-4 bg-emerald-50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-xs font-semibold">FULL NAME</Label>
                <Input defaultValue="DR BC Lakhera" className="mt-1" />
              </div>
              <div>
                <Label className="text-xs font-semibold">EMAIL</Label>
                <Input defaultValue="Lakherahomoeopathycentre@" className="mt-1" />
              </div>
              <div>
                <Label className="text-xs font-semibold">PHONE</Label>
                <Input defaultValue="+919311057767" className="mt-1" />
              </div>
            </div>

            <div className="mt-4 flex flex-col md:flex-row gap-3 items-end">
              <div className="flex-1">
                <Label className="text-xs font-semibold">WP USER</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="--WP User--" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">User 1</SelectItem>
                    <SelectItem value="2">User 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="bg-emerald-700 hover:bg-emerald-800 rounded-md px-6">
                NEW WP USER
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* SERVICES */}
      <Accordion type="single" collapsible>
        <AccordionItem value="services" className="border rounded-md">
          <AccordionTrigger className="hover:border-0 px-4 py-3 font-bold text-emerald-800 text-xl ">
            Services
          </AccordionTrigger>
          <AccordionContent className="px-4 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {["Joint and Spine Care", "Metabolic Disorders", "Urinary and Kidney Care", "Men's Health", "Women's Health", "Child Health"].map(
                (service) => (
                  <label key={service} className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="accent-emerald-600" />
                    {service}
                  </label>
                )
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* WORKING HOURS */}
     <Accordion type="single" collapsible>
  <AccordionItem value="hours" className="border rounded-md">
    <AccordionTrigger className="px-4 py-3 no-underline text-xl font-bold text-emerald-800">
      Working Hours
    </AccordionTrigger>

    <AccordionContent className="px-6 py-5 bg-emerald-50 space-y-4">
      {[
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
      ].map((day) => (
        <div
          key={day}
          className="grid grid-cols-[120px_1fr_auto_1fr] gap-3 items-center"
        >
          <span className="text-sm font-medium">{day}</span>

          <TimeSelect defaultValue="09:00 am" />
          <span className="text-sm text-muted-foreground">to</span>
          <TimeSelect defaultValue="06:00 pm" />
        </div>
      ))}

      {/* Saturday */}
      <DayOffRow day="Saturday" />

      {/* Sunday */}
      <DayOffRow day="Sunday" />

      <hr className="my-3" />

      {/* Lunch Break */}
      <div className="grid grid-cols-[120px_1fr_auto_1fr]  items-center">
        <span className="text-sm font-medium">Lunch Break</span>
        <TimeSelect defaultValue="12:00 am" />
        <span className="text-sm text-muted-foreground">to</span>
        <TimeSelect defaultValue="12:00 am" />
      </div>
    </AccordionContent>
  </AccordionItem>
</Accordion>

      {/* SAVE BUTTON */}
      <div className="pt-2">
        <Button className="bg-emerald-700 hover:bg-emerald-800 px-8">
          SAVE
        </Button>
      </div>
    </div>
      </Popup>
    </Reusetable>
  );
}
export default Staff;
