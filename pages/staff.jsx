import Popup from "@/componentPages/popupreuse";
import Reusetable from "@/componentPages/reusetable";
import { Button } from "@/components/ui/button";
import { PiPencilLight } from "react-icons/pi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Input } from "@/components/ui/input";
import { IoSearchOutline } from "react-icons/io5";
import { FiPlus, FiFileText } from "react-icons/fi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import TimeSelect from "@/componentPages/timeslectreuse";
import DayOffRow from "@/componentPages/reuseday";
import Reusesidebar from "@/componentPages/reusesidebar";
import { useForm, Controller } from "react-hook-form";
import { useServiceTitles } from "../src/context/servicecontext";
import api from "@/api";

function Staff() {
  const { titles } = useServiceTitles();
  const [showstaff, setshowstaff] = useState([]);
  const [editstaff, seteditstaff] = useState(null);
  const newtitle = [...new Set(titles)];
  const { register, handleSubmit, setValue, watch, control } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      services: [],
      workingHours: [
        { day: "Monday", from: "", to: "" },
        { day: "Tuesday", from: "", to: "" },
        { day: "Wednesday", from: "", to: "" },
        { day: "Thursday", from: "", to: "" },
        { day: "Friday", from: "", to: "" },
        { day: "Saturday", isDayOff: true },
        { day: "Sunday", isDayOff: true },
        { day: "Lunch", from: "", to: "" },
      ],
    },
  });

  const defaultDays = [
    { day: "Monday", from: "", to: "" },
    { day: "Tuesday", from: "", to: "" },
    { day: "Wednesday", from: "", to: "" },
    { day: "Thursday", from: "", to: "" },
    { day: "Friday", from: "", to: "" },
    { day: "Saturday", isDayOff: true },
    { day: "Sunday", isDayOff: true },
    { day: "Lunch", from: "", to: "" },
  ];

  const edithandle = (item) => {
    seteditstaff(item);
    setValue("name", item.fullName);
    setValue("email", item.email);
    setValue("phone", item.phone);
    setValue("services", item.services);
    const merged = defaultDays.map((day) => {
      const found = item.workingHours?.find((d) => d.day === day.day);
      return found ? found : day;
    });
    setValue("workingHours", merged);
    setopen(true);
  };

  const onupdate = async (data) => {
    try {
      const res = await api.put(`/api/staff/${editstaff._id}`, data);
      fetchstaff();
      setopen(false);
      alert("update successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const dlte = async (id, index) => {
    try {
      const res = await api.delete(`/api/staff/${id}`);
      const copy = [...showstaff];
      copy.splice(index, 1);
      setshowstaff(copy);
      alert("do you want delete");
    } catch (error) {
      console.log(error);
    }
  };

  const [open, setopen] = useState(false);
  const [staffpopup, setstaffpopup] = useState(false);

  const setTime = (index, field, value) => {
    setValue(`workingHours.${index}.${field}`, value);
  };

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const payload = {
        fullName: data.name,
        email: data.email,
        phone: data.phone,
        services: data.services,
        workingHours: data.workingHours,
      };
      const res = await api.post("/api/staff", payload);
      alert("staff creation done successfully");
      fetchstaff();
      setstaffpopup(false);
    } catch (error) {
      console.log(error);
      alert("staff creation failed");
    }
  };

  useEffect(() => {
    fetchstaff();
  }, []);

  const fetchstaff = async () => {
    try {
      const userid = localStorage.getItem("userid");
      console.log("📞 Calling API with userid:", userid);
      const res = await api.get(`/api/staff/user/${userid}`);
      setshowstaff(res.data);
      console.log("✅ Staff data received:", res.data.length, "staff members");
    } catch (error) {
      console.error("❌ Error fetching staff:", error);
      alert("staff fetch failed");
    }
  };

  // Avatar color per initial
  const avatarColors = [
    "bg-blue-200 text-blue-700",
    "bg-green-200 text-green-700",
    "bg-purple-200 text-purple-700",
    "bg-orange-200 text-orange-700",
    "bg-pink-200 text-pink-700",
    "bg-yellow-200 text-yellow-700",
  ];

  return (
    <Reusesidebar>
      <Reusetable headertitle="Staff Management">
        {/* ── Top Bar ── */}
        <div className="flex items-center gap-2 mb-5">
          {/* Search — grows to fill space */}
          <div className="relative flex-1">
            <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <Input
              placeholder="Search staff by name, email or service..."
              className="pl-9 h-10 rounded-lg border-gray-200 text-sm bg-white w-full"
            />
          </div>

          {/* Documentation — hidden on mobile */}
          <button className="hidden sm:flex items-center gap-1.5 h-10 px-4 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 font-medium flex-shrink-0">
            <FiFileText size={15} />
            Documentation
          </button>

          {/* Add button — text on sm+, icon-only circle on mobile */}
          <Button
            onClick={() => setstaffpopup(true)}
            className="hidden sm:flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white h-10 px-5 rounded-lg text-sm font-semibold flex-shrink-0"
          >
            <FiPlus size={16} />
            Add New Staff
          </Button>

          {/* Mobile: icon-only round button */}
          <button
            onClick={() => setstaffpopup(true)}
            className="sm:hidden flex-shrink-0 w-10 h-10 rounded-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center shadow-sm"
            title="Add New Staff"
          >
            <FiPlus size={18} />
          </button>
        </div>

        {/* ── Table Card ── */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 border-b border-gray-100">
                  {["STAFF MEMBER", "CONTACT INFO", "SERVICES", "WORKING HOURS", "ACTIONS"].map((col, i) => (
                    <TableHead key={i} className="text-xs font-bold text-gray-500 uppercase tracking-wider py-3 px-5">
                      {col}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {showstaff?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-gray-400 py-14 text-sm">
                      No staff found. Add your first staff member!
                    </TableCell>
                  </TableRow>
                ) : (
                  showstaff?.map((item, i) => (
                    <TableRow key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      {/* STAFF MEMBER */}
                      <TableCell className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${avatarColors[i % avatarColors.length]}`}>
                            {item.fullName?.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 text-sm">{item.fullName}</p>
                            <p className="text-xs text-gray-400">Joined {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>
                          </div>
                        </div>
                      </TableCell>

                      {/* CONTACT INFO */}
                      <TableCell className="px-5 py-4">
                        <p className="text-sm text-gray-700">{item.email}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{item.phone}</p>
                      </TableCell>

                      {/* SERVICES */}
                      <TableCell className="px-5 py-4">
                        <div className="flex flex-col gap-1">
                          {item.services.map((service, idx) => (
                            <span key={idx} className="inline-block text-xs font-medium text-gray-700 bg-gray-100 rounded px-2 py-0.5 w-fit">
                              {service}
                            </span>
                          ))}
                        </div>
                      </TableCell>

                      {/* WORKING HOURS */}
                      <TableCell className="px-5 py-4">
                        <div className="flex flex-wrap gap-1.5 max-w-xs">
                          {item.workingHours
                            ?.filter((wh) => wh.isDayOff || (wh.from && wh.to))
                            .map((wh) => {
                              if (wh.isDayOff) {
                                return (
                                  <span key={wh.day} className="text-xs font-semibold px-2 py-1 rounded bg-red-100 text-red-600">
                                    {wh.day.slice(0, 3).toUpperCase()}: OFF
                                  </span>
                                );
                              }
                              return (
                                <span key={wh.day} className="text-xs font-medium px-2 py-1 rounded bg-gray-100 text-gray-700">
                                  {wh.day.slice(0, 3)}: {wh.from} - {wh.to}
                                </span>
                              );
                            })}
                        </div>
                      </TableCell>

                      {/* ACTIONS */}
                      <TableCell className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => edithandle(item)}
                            className="p-1.5 rounded-lg bg-gray-100 hover:bg-green-100 text-gray-500 hover:text-green-700 transition-colors"
                            title="Edit"
                          >
                            <PiPencilLight size={16} />
                          </button>
                          <button
                            onClick={() => dlte(item._id, i)}
                            className="p-1.5 rounded-lg bg-gray-100 hover:bg-red-100 text-gray-500 hover:text-red-600 transition-colors"
                            title="Delete"
                          >
                            <RiDeleteBin6Line size={16} />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden divide-y divide-gray-100">
            {showstaff?.length === 0 ? (
              <div className="text-center text-gray-400 py-14 text-sm">No staff found.</div>
            ) : (
              showstaff?.map((item, i) => (
                <div key={i} className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${avatarColors[i % avatarColors.length]}`}>
                        {item.fullName?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{item.fullName}</p>
                        <p className="text-xs text-gray-500">{item.email}</p>
                        <p className="text-xs text-gray-400">{item.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <button
                        onClick={() => edithandle(item)}
                        className="p-1.5 rounded-lg bg-gray-100 hover:bg-green-100 text-gray-500 hover:text-green-700 transition-colors"
                      >
                        <PiPencilLight size={16} />
                      </button>
                      <button
                        onClick={() => dlte(item._id, i)}
                        className="p-1.5 rounded-lg bg-gray-100 hover:bg-red-100 text-gray-500 hover:text-red-600 transition-colors"
                      >
                        <RiDeleteBin6Line size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {item.services.map((service, idx) => (
                      <span key={idx} className="text-xs font-medium text-gray-700 bg-gray-100 rounded px-2 py-0.5">
                        {service}
                      </span>
                    ))}
                  </div>

                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {item.workingHours
                      ?.filter((wh) => wh.isDayOff || (wh.from && wh.to))
                      .map((wh) => {
                        if (wh.isDayOff) {
                          return (
                            <span key={wh.day} className="text-xs font-semibold px-2 py-0.5 rounded bg-red-100 text-red-600">
                              {wh.day.slice(0, 3)}: OFF
                            </span>
                          );
                        }
                        return (
                          <span key={wh.day} className="text-xs font-medium px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                            {wh.day.slice(0, 3)}: {wh.from} - {wh.to}
                          </span>
                        );
                      })}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination Footer */}
          {showstaff?.length > 0 && (
            <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100 text-sm text-gray-500">
              <span>Showing <strong className="text-gray-800">{showstaff.length}</strong> of <strong className="text-gray-800">{showstaff.length}</strong> staff</span>
              <div className="flex items-center gap-1">
                <button className="h-8 px-3 rounded border border-gray-200 text-xs hover:bg-gray-50 text-gray-500">Previous</button>
                <button className="h-8 w-8 rounded border border-gray-800 bg-gray-900 text-white text-xs font-bold">1</button>
                <button className="h-8 px-3 rounded border border-gray-200 text-xs hover:bg-gray-50 text-gray-500">Next</button>
              </div>
            </div>
          )}
        </div>

        {/* ── EDIT POPUP ── */}
        <Popup open={open} onOpenChange={setopen} title="Edit Staff">
          <form onSubmit={handleSubmit(onupdate)}>
            <div className="space-y-4">
              <Accordion type="single" className="space-y-1.5" collapsible>
                <AccordionItem value="details" className="border rounded-md data-[state=open]:bg-emerald-50">
                  <AccordionTrigger className="px-4 py-3 text-emerald-800 font-bold text-xl rounded-t-md">
                    Details
                  </AccordionTrigger>
                  <AccordionContent className="px-4 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label className="text-xs font-semibold">FULL NAME</Label>
                        <Input {...register("name")} defaultValue="DR BC Lakhera" className="mt-1" />
                      </div>
                      <div>
                        <Label className="text-xs font-semibold">EMAIL</Label>
                        <Input {...register("email")} defaultValue="Lakherahomoeopathycentre@" className="mt-1" />
                      </div>
                      <div>
                        <Label className="text-xs font-semibold">PHONE</Label>
                        <Input defaultValue="+919311057767" {...register("phone")} className="mt-1" />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="services" className="border rounded-md data-[state=open]:bg-emerald-50">
                  <AccordionTrigger className="px-4 py-3 font-bold text-emerald-800 text-xl">
                    Services
                  </AccordionTrigger>
                  <AccordionContent className="px-4 py-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {newtitle.map((service) => (
                        <label key={service} className="flex items-center gap-2 text-sm">
                          <input type="checkbox" value={service} {...register("services")} className="accent-emerald-600" />
                          {service}
                        </label>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="hours" className="border rounded-md data-[state=open]:bg-emerald-50">
                  <AccordionTrigger className="px-4 py-3 text-xl font-bold text-emerald-800">
                    Working Hours
                  </AccordionTrigger>
                  <AccordionContent className="bg-emerald-50 px-6 py-6 space-y-3">
                    {watch("workingHours")?.map((wh, index) => {
                      if (wh.day === "Saturday" || wh.day === "Sunday") {
                        return (
                          <div key={wh.day} className="grid grid-cols-[110px_140px] items-center gap-3">
                            <span className="text-sm">{wh.day}</span>
                            <Controller
                              control={control}
                              name={`workingHours.${index}.isDayOff`}
                              render={({ field }) => (
                                <Select value={field.value ? "off" : "working"} onValueChange={(val) => field.onChange(val === "off")}>
                                  <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="off">Day Off</SelectItem>
                                    <SelectItem value="working">Working</SelectItem>
                                  </SelectContent>
                                </Select>
                              )}
                            />
                          </div>
                        );
                      }
                      if (wh.day === "Lunch") {
                        return (
                          <div key="lunch" className="grid grid-cols-[110px_110px_30px_110px] gap-2 items-center">
                            <span className="text-sm">Lunch Break</span>
                            <TimeSelect value={wh.from} onChange={(val) => setValue(`workingHours.${index}.from`, val, { shouldDirty: true })} />
                            <span className="text-center">to</span>
                            <TimeSelect value={wh.to} onChange={(val) => setValue(`workingHours.${index}.to`, val, { shouldDirty: true })} />
                          </div>
                        );
                      }
                      return (
                        <div key={wh.day} className="grid grid-cols-[110px_110px_30px_110px] gap-2 items-center">
                          <span className="text-sm">{wh.day}</span>
                          <TimeSelect value={wh.from} onChange={(val) => setValue(`workingHours.${index}.from`, val, { shouldDirty: true })} />
                          <span className="text-center">to</span>
                          <TimeSelect value={wh.to} onChange={(val) => setValue(`workingHours.${index}.to`, val, { shouldDirty: true })} />
                        </div>
                      );
                    })}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <div className="pt-2">
                <Button type="submit" className="bg-emerald-700 hover:bg-emerald-800 px-8">SAVE</Button>
              </div>
            </div>
          </form>
        </Popup>

        {/* ── ADD STAFF POPUP ── */}
        <Popup open={staffpopup} onOpenChange={setstaffpopup} title="Add Staff">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <Accordion type="single" className="space-y-1.5" collapsible>
                <AccordionItem value="details" className="border rounded-md data-[state=open]:bg-emerald-50">
                  <AccordionTrigger className="px-4 py-3 text-emerald-800 font-bold text-xl rounded-t-md">
                    Details
                  </AccordionTrigger>
                  <AccordionContent className="px-4 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label className="text-xs font-semibold">FULL NAME</Label>
                        <Input {...register("name")} defaultValue="DR BC Lakhera" className="mt-1" />
                      </div>
                      <div>
                        <Label className="text-xs font-semibold">EMAIL</Label>
                        <Input defaultValue="Lakherahomoeopathycentre@" className="mt-1" {...register("email")} />
                      </div>
                      <div>
                        <Label className="text-xs font-semibold">PHONE</Label>
                        <Input defaultValue="+919311057767" className="mt-1" {...register("phone")} />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="services" className="border rounded-md data-[state=open]:bg-emerald-50">
                  <AccordionTrigger className="px-4 py-3 font-bold text-emerald-800 text-xl">
                    Services
                  </AccordionTrigger>
                  <AccordionContent className="px-4 py-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {newtitle.map((service) => (
                        <label key={service._id}>
                          <input type="checkbox" value={service.title} {...register("services")} />
                          {service.title}
                        </label>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="hours" className="border rounded-md data-[state=open]:bg-emerald-50">
                  <AccordionTrigger className="px-4 py-3 text-xl font-bold text-emerald-800">
                    Working Hours
                  </AccordionTrigger>
                  <AccordionContent className="bg-emerald-50 px-6 py-6 space-y-3">
                    {watch("workingHours").map((wh, index) => {
                      if (wh.day === "Saturday" || wh.day === "Sunday") {
                        return (
                          <div key={wh.day} className="grid grid-cols-[110px_140px] items-center gap-3">
                            <span className="text-sm">{wh.day}</span>
                            <Controller
                              control={control}
                              name={`workingHours.${index}.isDayOff`}
                              render={({ field }) => (
                                <Select value={field.value ? "off" : "working"} onValueChange={(val) => field.onChange(val === "off")}>
                                  <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="off">Day Off</SelectItem>
                                    <SelectItem value="working">Working</SelectItem>
                                  </SelectContent>
                                </Select>
                              )}
                            />
                          </div>
                        );
                      }
                      if (wh.day === "Lunch") {
                        return (
                          <div key="lunch" className="grid grid-cols-[110px_110px_30px_110px] gap-2 items-center">
                            <span className="text-sm">Lunch Break</span>
                            <TimeSelect value={wh.from} onChange={(val) => setValue(`workingHours.${index}.from`, val, { shouldDirty: true })} />
                            <span className="text-center">to</span>
                            <TimeSelect value={wh.to} onChange={(val) => setValue(`workingHours.${index}.to`, val, { shouldDirty: true })} />
                          </div>
                        );
                      }
                      return (
                        <div key={wh.day} className="grid grid-cols-[110px_110px_30px_110px] gap-2 items-center">
                          <span className="text-sm">{wh.day}</span>
                          <TimeSelect value={wh.from} onChange={(val) => setValue(`workingHours.${index}.from`, val, { shouldDirty: true })} />
                          <span className="text-center">to</span>
                          <TimeSelect value={wh.to} onChange={(val) => setValue(`workingHours.${index}.to`, val, { shouldDirty: true })} />
                        </div>
                      );
                    })}
                    <div className="border-t pt-3 mt-3" />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <div className="pt-2">
                <Button type="submit" className="bg-emerald-700 hover:bg-emerald-800 px-8">SAVE</Button>
              </div>
            </div>
          </form>
        </Popup>
      </Reusetable>
    </Reusesidebar>
  );
}

export default Staff;