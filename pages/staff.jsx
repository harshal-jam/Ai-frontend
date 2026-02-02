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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import TimeSelect from "@/componentPages/timeslectreuse";
import DayOffRow from "@/componentPages/reuseday";
import Reusesidebar from "@/componentPages/reusesidebar";
import { useForm } from "react-hook-form";
import { useServiceTitles } from "../src/context/servicecontext";
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
  const {titles} = useServiceTitles();
  const newtitle = [...new Set(titles)]
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      wp: "",
      services: [],
      workingHours: {
        Monday: { from: "", to: "" },
        Tuesday: { from: "", to: "" },
        Wednesday: { from: "", to: "" },
        Thursday: { from: "", to: "" },
        Friday: { from: "", to: "" },
        Saturday: { off: true },
        Sunday: { off: true },
        Lunch: { from: "", to: "" },
      },
    },
  });
  const [open, setopen] = useState(false);
  const [staffpopup, setstaffpopup] = useState(false);
  const setTime = (day, type, value) => {
    setValue(`workingHours.${day}.${type}`, value);
  };
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Reusesidebar>
      <Reusetable headertitle="add staff">
        <div className="bg-white p-4 shadow-xl">
          {/* search bar */}
          <div className="flex flex-col sm:flex-row gap-1 mb-3">
            <Input
              placeholder="SEARCH HERE..."
              className="w-full sm:max-w-xs rounded-xs"
            />
            <Button
              onClick={() => setstaffpopup(true)}
              className="capitalize bg-green-700 rounded-xs cursor-pointer"
            >
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
                        {Object.entries(item.workingHours).map(
                          ([day, time]) => (
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
                          ),
                        )}
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
            <Accordion type="single" className="space-y-1.5" collapsible>
              {/* DETAILS */}
              <AccordionItem
                value="details"
                className="border rounded-md data-[state=open]:bg-emerald-50"
              >
                <AccordionTrigger className="px-4 py-3  text-emerald-800 font-bold text-xl rounded-t-md">
                  Details
                </AccordionTrigger>
                <AccordionContent className="px-4 py-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-xs font-semibold">FULL NAME</Label>
                      <Input defaultValue="DR BC Lakhera" className="mt-1" />
                    </div>
                    <div>
                      <Label className="text-xs font-semibold">EMAIL</Label>
                      <Input
                        defaultValue="Lakherahomoeopathycentre@"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-semibold">PHONE</Label>
                      <Input defaultValue="+919311057767" className="mt-1" />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* SERVICES */}
              <AccordionItem
                value="services"
                className="border rounded-md data-[state=open]:bg-emerald-50"
              >
                <AccordionTrigger className="px-4 py-3 font-bold text-emerald-800 text-xl">
                  Services
                </AccordionTrigger>
                <AccordionContent className="px-4 py-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                        "Joint and Spine Care",
                        "Metabolic Disorders",
                        "Urinary and Kidney Care",
                        "Men's Health",
                        "Women's Health",
                        "Child Health",
                      ].map((service,i) => (
                      <label
                        key={i}
                        className="flex items-center gap-2 text-sm"
                      >
                        <input type="checkbox" className="accent-emerald-600" />
                        {service}
                      </label>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* WORKING HOURS */}
              <AccordionItem
                value="hours"
                className="border rounded-md data-[state=open]:bg-emerald-50"
              >
                <AccordionTrigger className="px-4 py-3 text-xl font-bold text-emerald-800">
                  Working Hours
                </AccordionTrigger>

                <AccordionContent className="bg-emerald-50 px-6 py-6 space-y-3">
                  {/* Working Days */}
                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(
                    (day) => (
                      <div
                        key={day}
                        className=" grid grid-cols-[110px_110px_30px_110px] items-center gap-2"
                      >
                        <span className="text-sm text-gray-700">{day}</span>

                        <TimeSelect className="m-0" defaultValue="09:00 am" />

                        <span className="text-center text-sm text-muted-foreground">
                          to
                        </span>

                        <TimeSelect defaultValue="06:00 pm" />
                      </div>
                    ),
                  )}

                  {/* Saturday */}
                  <DayOffRow day="Saturday" />

                  {/* Sunday */}
                  <DayOffRow day="Sunday" />

                  {/* Divider */}
                  <div className="border-t pt-3 mt-3" />

                  {/* Lunch Break */}
                  <div className="grid grid-cols-[110px_110px_30px_110px] gap-2 items-center ">
                    <span className="text-sm text-gray-700">Lunch Break</span>

                    <TimeSelect defaultValue="12:00 pm" />

                    <span className="text-center text-sm text-muted-foreground">
                      to
                    </span>

                    <TimeSelect defaultValue="12:30 pm" />
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
        {/* add staff popup */}

        <Popup
          open={staffpopup}
          onOpenChange={setstaffpopup}
          title="edit staff #4"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              {/* ✅ ONE Accordion Wrapper */}
              <Accordion type="single" className="space-y-1.5" collapsible>
                {/* DETAILS */}
                <AccordionItem
                  value="details"
                  className="border rounded-md data-[state=open]:bg-emerald-50"
                >
                  <AccordionTrigger className="px-4 py-3  text-emerald-800 font-bold text-xl rounded-t-md">
                    Details
                  </AccordionTrigger>
                  <AccordionContent className="px-4 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label className="text-xs font-semibold">
                          FULL NAME
                        </Label>
                        <Input
                          {...register("name")}
                          defaultValue="DR BC Lakhera"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-xs font-semibold">EMAIL</Label>
                        <Input
                          defaultValue="Lakherahomoeopathycentre@"
                          className="mt-1"
                          {...register("email")}
                        />
                      </div>
                      <div>
                        <Label className="text-xs font-semibold">PHONE</Label>
                        <Input
                          defaultValue="+919311057767"
                          className="mt-1"
                          {...register("phone")}
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* SERVICES */}
                <AccordionItem
                  value="services"
                  className="border rounded-md data-[state=open]:bg-emerald-50"
                >
                  <AccordionTrigger className="px-4 py-3 font-bold text-emerald-800 text-xl">
                    Services
                  </AccordionTrigger>
                  <AccordionContent className="px-4 py-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {newtitle.map((service) =>(
                        <label
                          key={service}
                          className="flex items-center gap-2 text-sm"
                        >
                          <input
                            type="checkbox"
                            value={service}
                            {...register("services")}
                            className="accent-emerald-600 uppercase"
                          />
                          {service.toUpperCase()}
                        </label>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* WORKING HOURS */}
                <AccordionItem
                  value="hours"
                  className="border rounded-md data-[state=open]:bg-emerald-50"
                >
                  <AccordionTrigger className="px-4 py-3 text-xl font-bold text-emerald-800">
                    Working Hours
                  </AccordionTrigger>

                  <AccordionContent className="bg-emerald-50 px-6 py-6 space-y-3">
                    {/* Working Days */}
                    {[
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                    ].map((day) => (
                      <div
                        key={day}
                        className="grid grid-cols-[110px_110px_30px_110px] items-center gap-2"
                      >
                        <span className="text-sm text-gray-700">{day}</span>

                        <TimeSelect
                          value={watch(`workingHours.${day}.from`)}
                          onChange={(value) => setTime(day, "from", value)}
                        />

                        <span className="text-center text-sm text-muted-foreground">
                          to
                        </span>

                        <TimeSelect
                          value={watch(`workingHours.${day}.to`)}
                          onChange={(value) => setTime(day, "to", value)}
                        />
                      </div>
                    ))}

                    {/* Saturday */}
                    <DayOffRow day="Saturday" />

                    {/* Sunday */}
                    <DayOffRow day="Sunday" />

                    {/* Divider */}
                    <div className="border-t pt-3 mt-3" />

                    {/* Lunch Break */}
                    <div className="grid grid-cols-[110px_110px_30px_110px] items-center gap-3">
                      <span className="text-sm text-gray-700">Lunch Break</span>

                      <TimeSelect
                        value={watch("workingHours.Lunch.from")}
                        onChange={(value) => setTime("Lunch", "from", value)}
                      />

                      <span className="text-center text-sm text-muted-foreground">
                        to
                      </span>

                      <TimeSelect
                        value={watch("workingHours.Lunch.to")}
                        onChange={(value) => setTime("Lunch", "to", value)}
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* SAVE BUTTON */}
              <div className="pt-2">
                <Button
                  type="submit"
                  className="bg-emerald-700 hover:bg-emerald-800 px-8"
                >
                  SAVE
                </Button>
              </div>
            </div>
          </form>
        </Popup>
      </Reusetable>
    </Reusesidebar>
  );
}
export default Staff;
