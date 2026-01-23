import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PiPencilLight } from "react-icons/pi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineCancel } from "react-icons/md";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Popup from "@/componentPages/popupreuse";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Field } from "@/components/ui/field";
import Reusetable from "@/componentPages/reusetable";
function Service() {
  const tablebody = [
    {
      title: "Joint and Spine Care",
      category: "Homeopathic Treatments",
      duration: "15 min",
      price: "0.00",
    },
    {
      title: "Metabolic Disorders",
      category: "Homeopathic Treatments",
      duration: "15 min",
      price: "0.00",
    },
    {
      title: "Urinary and Kidney Care",
      category: "Homeopathic Treatments",
      duration: "15 min",
      price: "0.00",
    },
    {
      title: "Men's Health",
      category: "Homeopathic Treatments",
      duration: "30 min",
      price: "0.00",
    },
    {
      title: "Child Health",
      category: "Homeopathic Treatments",
      duration: "30 min",
      price: "0.00",
    },
    {
      title: "Women's Health",
      category: "Homeopathic Treatments",
      duration: "15 min",
      price: "0.00",
    },
    {
      title: "Neurological Disorders",
      category: "Homeopathic Treatments",
      duration: "30 min",
      price: "0.00",
    },
    {
      title: "Skin and Hair",
      category: "Homeopathic Treatments",
      duration: "30 min",
      price: "0.00",
    },
    {
      title: "Mental Health",
      category: "Homeopathic Treatments",
      duration: "30 min",
      price: "0.00",
    },
    {
      title: "Digestive Disorders",
      category: "Homeopathic Treatments",
      duration: "30 min",
      price: "0.00",
    },
    {
      title: "Respiratory Disorders",
      category: "Homeopathic Treatments",
      duration: "30 min",
      price: "0.00",
    },
  ];
  const [open,setopen]=useState(false);
  return (
    <Reusetable
    headertitle="service">
      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-3">
        {/* Service Table */}
        <div className="lg:col-span-4 bg-white p-3 rounded-md">
          {/* Search + Add */}
          <div className="flex flex-col sm:flex-row gap-1 mb-3">
            <Input
              placeholder="SEARCH HERE..."
              className="w-full sm:max-w-xs rounded-xs"
            />
            <Button className="capitalize bg-green-700 rounded-xs">add new</Button>
          </div>

          {/* Table with scroll */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-green-50">
                <TableRow className="font-bold text-sm sm:text-base">
                  {["Title", "Category", "Duration", "Price", "Actions"].map(
                    (item, i) => (
                      <TableHead key={i}>{item}</TableHead>
                    ),
                  )}
                </TableRow>
              </TableHeader>

              <TableBody>
                {tablebody.map((item, i) => (
                  <TableRow key={i} className="text-sm sm:text-base">
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.duration}</TableCell>
                    <TableCell>{item.price}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <PiPencilLight
                        onClick={()=>setopen(true)}
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

        {/* Categories */}
        <div className="lg:col-span-2 ">
          <div className="bg-white">
          <div className="border-b px-3 py-7">
            <p className="font-bold text-xl">categories</p>
          </div>

          <div className="px-3 py-7 flex flex-wrap gap-2">
            <div className="flex items-center gap-2 bg-amber-100 text-green-800 font-bold px-3 py-2 rounded">
              homeopathic treatment
              <MdOutlineCancel className="cursor-pointer" />
            </div>
          </div>

          {/* Add Category */}
          <div className="bg-green-50 p-3">
            <p className="font-bold mb-2">add new category</p>

            <div className="flex flex-col sm:flex-row ">
              <Input placeholder="CATEGORY NAME" className="w-full rounded-xs" />
              <Button className="capitalize bg-green-900 rounded-xs">add</Button>
            </div>
          </div>
          </div>
        </div>
      </div>
      <Popup open={open} onOpenChange={setopen} title="Add service #">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-5">

    {/* TITLE */}
    <div>
      <Label className="text-xs font-bold uppercase">Title</Label>
      <Input className="mt-1 h-10 rounded-md" />
    </div>

    {/* CATEGORY */}
    <div>
      <Label className="text-xs font-bold uppercase">Category</Label>
      <Field>
      <Select>
        <SelectTrigger className="mt-1 h-10 rounded-md">
          <SelectValue placeholder="-- No Category --" />
        </SelectTrigger>
        <SelectContent className="shadow-2xl font-bold">
          <SelectItem value="none" className="hover:bg-blue-400 " >-- No Category --</SelectItem>
          <SelectItem value="homeopathic" >
            Homeopathic Treatments
          </SelectItem>
        </SelectContent>
      </Select>
      </Field>
    </div>

    {/* DURATION */}
    <div>
      <Label className="text-xs font-bold uppercase">Duration</Label>
      <Field>
      <Select defaultValue="15" >
        <SelectTrigger className="mt-1 p-2.5 h-10 rounded-md">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="15">15 min</SelectItem>
          <SelectItem value="30">30 min</SelectItem>
        </SelectContent>
      </Select>
      </Field>
    </div>

    {/* PRICE */}
    <div>
      <Label className="text-xs font-bold uppercase">Price</Label>
      <Input
        type="number"
        defaultValue="0.00"
        className="mt-1 h-10 rounded-md"
      />
    </div>

    {/* ICON */}
    <div>
      <Label className="text-xs font-bold uppercase">Icon</Label>
      <Button
        className="mt-2 bg-green-600 hover:bg-green-700 text-white h-9 px-4 rounded-md"
      >
        ADD ICON
      </Button>
    </div>
  </div>

  {/* ADD BUTTON */}
  <div >
    <Button className="bg-green-700 hover:bg-green-800 px-8 h-10 rounded-md w-full lg:w-3">
      ADD
    </Button>
  </div>
</Popup>

    </Reusetable>
  );
}
export default Service;
