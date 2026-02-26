import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PiPencilLight } from "react-icons/pi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineCancel } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";
import { TrendingUp } from "lucide-react";
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
import Popup from "@/componentPages/popupreuse";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Field } from "@/components/ui/field";
import Reusetable from "@/componentPages/reusetable";
import api from "@/api";
import Reusesidebar from "@/componentPages/reusesidebar";
import { useForm } from "react-hook-form";

function Service() {
  const [addservice, setaddservice] = useState([]);
  const [editService, seteditService] = useState(null);
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      title: "",
      category: "",
      duration: "15 min",
      price: "0.00",
    },
  });
  const [open, setopen] = useState(false);
  const [categorylist, setcategorylist] = useState([]);
  const [categorys, setcategory] = useState("");
  const [servicepopup, setservicepopup] = useState(false);

  // add service post method
  const onSubmit = async (data) => {
    try {
      const payload = { ...data };
      const res = await api.post("/api/services", payload);
      fetchservice();
      alert("service add successsfully added");
      setservicepopup(false);
    } catch (error) {
      alert("service add failed");
      console.log(error);
    }
  };

  // fetch the service for print ui
  const fetchservice = async () => {
    try {
      const res = await api.get("/api/services");
      setaddservice(res.data.data);
      alert("fetch successfully done ");
    } catch (error) {
      console.log(error);
      alert("fetch the service is failed");
    }
  };

  const handleEdit = async (item) => {
    seteditService(item);
    setValue("title", item.title);
    setValue("category", item.category);
    setValue("duration", item.duration);
    setValue("price", item.price);
    setopen(true);
  };

  // for category fetch method
  const fetchnotes = async () => {
    try {
      const userid = localStorage.getItem("userid");
      const res = await api.get(`/api/category/${userid}`);
      setcategorylist(res.data.categorys);
    } catch (error) {
      console.log(error);
    }
  };

  const onUpdate = async (data) => {
    try {
      await api.put(`/api/services/${editService._id}`, data);
      fetchservice();
      setopen(false);
      alert("Service updated");
    } catch (err) {
      console.log(err);
      alert("Update failed");
    }
  };

  // delete items
  const dlte = async (id, index) => {
    try {
      await api.delete(`/api/services/${id}`);
      const copy = [...addservice];
      copy.splice(index, 1);
      setaddservice(copy);
      alert("service deleted");
    } catch (err) {
      console.log(err);
      alert("delete failed");
    }
  };

  useEffect(() => {
    fetchnotes();
    fetchservice();
  }, []);

  const fillcategory = async (e) => {
    e.preventDefault();
    try {
      const userid = localStorage.getItem("userid");
      const res = await api.post("/api/category", {
        category: categorys,
        userid,
      });
      fetchnotes();
      alert("creation successfull");
      setcategory("");
    } catch (error) {
      console.log(error);
      alert("category creation failed");
    }
  };

  // Category badge color map
  const categoryColors = [
    "bg-orange-100 text-orange-700",
    "bg-green-100 text-green-700",
    "bg-purple-100 text-purple-700",
    "bg-blue-100 text-blue-700",
    "bg-yellow-100 text-yellow-700",
    "bg-pink-100 text-pink-700",
  ];

  return (
    <Reusesidebar>
      <Reusetable headertitle="Service">
        {/* Page Header */}
        <div className="flex items-center gap-2 mb-6 text-sm text-gray-500">
          <span className="text-gray-400">Catalog</span>
          <span>/</span>
          <span className="text-gray-800 font-semibold">Service List</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
          {/* ── LEFT: Service Table ── */}
          <div className="lg:col-span-4 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Search + Add */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-4 border-b border-gray-100">
              <div className="relative flex-1">
                <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <Input
                  placeholder="Search services by name, category..."
                  className="pl-9 h-10 rounded-lg border-gray-200 text-sm w-full bg-gray-50 focus:bg-white"
                />
              </div>
              {/* Desktop button */}
              <Button
                onClick={() => setservicepopup(true)}
                className="hidden sm:flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white h-10 px-5 rounded-lg text-sm font-semibold"
              >
                <FiPlus size={16} />
                Add New Service
              </Button>
              {/* Mobile icon button */}
              <button
                onClick={() => setservicepopup(true)}
                className="sm:hidden flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white h-10 px-4 rounded-lg text-sm font-semibold w-full"
              >
                <FiPlus size={16} />
                Add New Service
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 border-b border-gray-100">
                    {["STATUS", "SERVICE TITLE", "CATEGORY", "DURATION", "PRICE", "ACTIONS"].map((col, i) => (
                      <TableHead key={i} className="text-xs font-bold text-gray-500 uppercase tracking-wider py-3 px-4">
                        {col}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {addservice.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-gray-400 py-12 text-sm">
                        No services found. Add your first service!
                      </TableCell>
                    </TableRow>
                  ) : (
                    addservice.map((item, i) => (
                      <TableRow key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                        {/* STATUS */}
                        <TableCell className="px-4 py-4">
                          <span className="flex items-center gap-1.5 text-xs font-medium text-green-600">
                            <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
                            Active
                          </span>
                        </TableCell>

                        {/* SERVICE TITLE */}
                        <TableCell className="px-4 py-4">
                          <p className="font-semibold text-gray-900 text-sm">{item.title}</p>
                          {item.description && (
                            <p className="text-xs text-gray-400 mt-0.5">{item.description}</p>
                          )}
                        </TableCell>

                        {/* CATEGORY */}
                        <TableCell className="px-4 py-4">
                          <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[i % categoryColors.length]}`}>
                            {item.category}
                          </span>
                        </TableCell>

                        {/* DURATION */}
                        <TableCell className="px-4 py-4 text-sm text-gray-700">{item.duration}</TableCell>

                        {/* PRICE */}
                        <TableCell className="px-4 py-4 text-sm font-semibold text-gray-900">
                          ${parseFloat(item.price || 0).toFixed(2)}
                        </TableCell>

                        {/* ACTIONS */}
                        <TableCell className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleEdit(item)}
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

            {/* Pagination footer */}
            {addservice.length > 0 && (
              <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 text-sm text-gray-500">
                <span>Showing {addservice.length} of {addservice.length} services</span>
                <div className="flex items-center gap-1">
                  <button className="w-7 h-7 rounded border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-gray-400">‹</button>
                  <button className="w-7 h-7 rounded border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-gray-400">›</button>
                </div>
              </div>
            )}
          </div>

          {/* ── RIGHT: Categories ── */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* Categories Card */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <p className="font-bold text-gray-900 text-sm uppercase tracking-wide">Categories</p>
                <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                  {categorylist.length} TOTAL
                </span>
              </div>

              <div className="px-4 py-4 flex flex-wrap gap-2">
                {categorylist?.map((cat, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${categoryColors[i % categoryColors.length]}`}
                  >
                    {cat.category}
                    <MdOutlineCancel className="cursor-pointer opacity-60 hover:opacity-100 transition-opacity" size={13} />
                  </div>
                ))}
              </div>

              {/* Quick Add Category */}
              <div className="border-t border-gray-100 px-4 py-4 bg-gray-50">
                <p className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-3">Quick Add Category</p>
                <form onSubmit={fillcategory} className="flex flex-col gap-2">
                  <Input
                    placeholder="Category Name"
                    onChange={(e) => setcategory(e.target.value)}
                    name="category"
                    value={categorys}
                    className="h-9 rounded-lg border-gray-200 text-sm bg-white"
                  />
                  <Button
                    type="submit"
                    className="w-full h-9 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-1.5"
                  >
                    <FiPlus size={14} />
                    Create Category
                  </Button>
                </form>
              </div>
            </div>

            {/* Agency Growth Card */}
            <div className="bg-green-700 rounded-xl p-4 text-white shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={18} className="text-green-200" />
                <p className="font-bold text-sm">Agency Growth</p>
              </div>
              <p className="text-green-100 text-xs leading-relaxed">
                Digital Marketing services currently generate 65% of your agency's revenue. Consider adding more 'SEO' specialized services.
              </p>
              <button className="mt-3 text-xs font-bold underline underline-offset-2 text-white hover:text-green-200 transition-colors">
                View Analytics
              </button>
            </div>
          </div>
        </div>

        {/* ── EDIT POPUP ── */}
        <Popup open={open} onOpenChange={setopen} title="Edit Service">
          <form onSubmit={handleSubmit(onUpdate)}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-5">
              <div>
                <Label className="text-xs font-bold uppercase text-gray-600">Title</Label>
                <Input {...register("title")} className="mt-1 h-10 rounded-lg border-gray-200" />
              </div>
              <div>
                <Label className="text-xs font-bold uppercase text-gray-600">Category</Label>
                <Field>
                  <Select onValueChange={(value) => setValue("category", value)}>
                    <SelectTrigger className="mt-1 h-10 rounded-lg border-gray-200">
                      <SelectValue placeholder="-- No Category --" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">-- No Category --</SelectItem>
                      {categorylist.map((item, index) => (
                        <SelectItem value={item.category} key={index}>{item.category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              </div>
              <div>
                <Label className="text-xs font-bold uppercase text-gray-600">Duration</Label>
                <Field>
                  <Select onValueChange={(value) => setValue("duration", value)} defaultValue="15">
                    <SelectTrigger className="mt-1 h-10 rounded-lg border-gray-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 min</SelectItem>
                      <SelectItem value="30">30 min</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              </div>
              <div>
                <Label className="text-xs font-bold uppercase text-gray-600">Price</Label>
                <Input type="number" defaultValue="0.00" className="mt-1 h-10 rounded-lg border-gray-200" {...register("price")} />
              </div>
              <div>
                <Label className="text-xs font-bold uppercase text-gray-600">Icon</Label>
                <Button type="button" className="mt-2 bg-green-600 hover:bg-green-700 text-white h-9 px-4 rounded-lg text-sm">
                  ADD ICON
                </Button>
              </div>
            </div>
            <div className="mt-4">
              <Button type="submit" className="bg-green-700 hover:bg-green-800 text-white px-8 h-10 rounded-lg w-full sm:w-auto">
                Update Service
              </Button>
            </div>
          </form>
        </Popup>

        {/* ── ADD SERVICE POPUP ── */}
        <Popup open={servicepopup} onOpenChange={setservicepopup} title="Add New Service">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-5">
              <div>
                <Label className="text-xs font-bold uppercase text-gray-600">Title</Label>
                <Input {...register("title")} className="mt-1 h-10 rounded-lg border-gray-200" />
              </div>
              <div>
                <Label className="text-xs font-bold uppercase text-gray-600">Category</Label>
                <Field>
                  <Select onValueChange={(val) => setValue("category", val)}>
                    <SelectTrigger className="mt-1 h-10 rounded-lg border-gray-200">
                      <SelectValue placeholder="-- No Category --" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">-- No Category --</SelectItem>
                      {categorylist
                        .filter((item) => item.category && item.category.trim() !== "")
                        .map((item, index) => (
                          <SelectItem value={item.category} key={index}>{item.category}</SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </Field>
              </div>
              <div>
                <Label className="text-xs font-bold uppercase text-gray-600">Duration</Label>
                <Field>
                  <Select defaultValue="15" onValueChange={(val) => setValue("duration", val)}>
                    <SelectTrigger className="mt-1 h-10 rounded-lg border-gray-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 min</SelectItem>
                      <SelectItem value="30">30 min</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              </div>
              <div>
                <Label className="text-xs font-bold uppercase text-gray-600">Price</Label>
                <Input {...register("price")} type="number" defaultValue="0.00" className="mt-1 h-10 rounded-lg border-gray-200" />
              </div>
              <div>
                <Label className="text-xs font-bold uppercase text-gray-600">Icon</Label>
                <Button type="button" className="mt-2 bg-green-600 hover:bg-green-700 text-white h-9 px-4 rounded-lg text-sm">
                  ADD ICON
                </Button>
              </div>
            </div>
            <div className="mt-4">
              <Button type="submit" className="bg-green-700 hover:bg-green-800 text-white px-8 h-10 rounded-lg w-full sm:w-auto">
                Add Service
              </Button>
            </div>
          </form>
        </Popup>
      </Reusetable>
    </Reusesidebar>
  );
}

export default Service;