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
      alert("fetch successfully done ")
      // setTitles(res.data.data);
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
  // for category fetch method..............
  const fetchnotes = async () => {
    try {
      const userid = localStorage.getItem("userid");
      const res = await api.get(`/api/category/${userid}`);

      setcategorylist(res.data.categorys);
      // console.log(res.data, "res.data");
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
  //delete items
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
      // console.log(categorys);
      fetchnotes();
      alert("creation successfull");
      setcategory("");
    } catch (error) {
      console.log(error);
      alert("category creation failed");
    }
  };
  return (
    <Reusesidebar>
      <Reusetable headertitle="Service">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-3">
          {/* Service Table */}
          <div className="lg:col-span-4 bg-white p-3 shadow-xl">
            {/* Search + Add */}
            <div className="flex flex-col sm:flex-row gap-1 mb-3">
              <Input
                placeholder="SEARCH HERE..."
                className="w-full sm:max-w-xs rounded-xs"
              />
              <Button
                onClick={() => setservicepopup(true)}
                className="capitalize bg-green-700 rounded-xs"
              >
                add new
              </Button>
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
                  {addservice.map((item, i) => (
                    <TableRow key={i} className="text-sm sm:text-base">
                      <TableCell>{item.title}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{item.duration}</TableCell>
                      <TableCell>{item.price}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <PiPencilLight
                            onClick={() => handleEdit(item)}
                            className="text-green-800 bg-green-200 p-1 rounded cursor-pointer"
                            size={22}
                          />
                          <RiDeleteBin6Line
                            onClick={() => dlte(item._id, i)}
                            className="text-red-900 bg-red-300 p-1 rounded cursor-pointer"
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
            <div className="bg-white shadow-xl">
              <div className="border-b px-3 py-7">
                <p className="font-bold text-xl">categories</p>
              </div>

              <div className="px-3 py-7 flex flex-wrap gap-2">
                {categorylist?.map((cat, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 bg-amber-100 text-green-800 font-bold px-3 py-2 rounded"
                  >
                    {cat.category}
                    <MdOutlineCancel className="cursor-pointer" />
                  </div>
                ))}
              </div>

              {/* Add Category */}
              <div className="bg-green-50 p-3">
                <p className="font-bold mb-2">add new category</p>
                <form onSubmit={fillcategory}>
                  <div className="flex flex-col sm:flex-row">
                    <Input
                      placeholder="CATEGORY NAME"
                      onChange={(e) => setcategory(e.target.value)}
                      name="category"
                      value={categorys}
                      className="w-full rounded-xs"
                    />
                    <Button
                      type="submit"
                      className="capitalize bg-green-900 rounded-xs"
                    >
                      add
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* edit popup form */}
        <Popup open={open} onOpenChange={setopen} title="edit form">
          <form onSubmit={handleSubmit(onUpdate)}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-5">
              {/* TITLE */}
              <div>
                <Label className="text-xs font-bold uppercase">Title</Label>
                <Input
                  {...register("title")}
                  className="mt-1 h-10 rounded-md"
                />
              </div>

              {/* CATEGORY */}
              <div>
                <Label className="text-xs font-bold uppercase">Category</Label>
                <Field>
                  <Select
                    onValueChange={(value) => setValue("category", value)}
                  >
                    <SelectTrigger className="mt-1 h-10 rounded-md">
                      <SelectValue placeholder="-- No Category --" />
                    </SelectTrigger>
                    <SelectContent className="shadow-2xl font-bold">
                      <SelectItem value="none" className="hover:bg-blue-400 ">
                        -- No Category --
                      </SelectItem>
                      <SelectItem value="homeopathic">homeopathic</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              </div>

              {/* DURATION */}
              <div>
                <Label className="text-xs font-bold uppercase">Duration</Label>
                <Field>
                  <Select
                    onValueChange={(value) => setValue("duration", value)}
                    defaultValue="15"
                  >
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
                  {...register("price")}
                />
              </div>

              {/* ICON */}
              <div>
                <Label className="text-xs font-bold uppercase">Icon</Label>
                <Button className="mt-2 bg-green-600 hover:bg-green-700 text-white h-9 px-4 rounded-md">
                  ADD ICON
                </Button>
              </div>
            </div>

            {/* ADD BUTTON */}
            <div>
              <Button
                type="submit"
                className="bg-green-700 hover:bg-green-800 px-8 h-10 rounded-md w-full lg:w-3 mt-2"
              >
                ADD
              </Button>
            </div>
          </form>
        </Popup>
        {/* add service popup form  */}
        <Popup
          open={servicepopup}
          onOpenChange={setservicepopup}
          title="Add service #"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-5">
              {/* TITLE */}
              <div>
                <Label className="text-xs font-bold uppercase">Title</Label>
                <Input
                  {...register("title")}
                  className="mt-1 h-10 rounded-md"
                />
              </div>

              {/* CATEGORY */}
              <div>
                <Label className="text-xs font-bold uppercase">Category</Label>
                <Field>
                  <Select onValueChange={(val) => setValue("category", val)}>
                    <SelectTrigger className="mt-1 h-10 rounded-md">
                      <SelectValue placeholder="-- No Category --" />
                    </SelectTrigger>
                    <SelectContent className="shadow-2xl font-bold">
                      <SelectItem value="none" className="hover:bg-blue-400 ">
                        -- No Category --
                      </SelectItem>
                      {categorylist.map((item, index) => (
                        <SelectItem value={item.category} key={index}>
                          {item.category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              </div>

              {/* DURATION */}
              <div>
                <Label className="text-xs font-bold uppercase">Duration</Label>
                <Field>
                  <Select
                    defaultValue="15"
                    onValueChange={(val) => setValue("duration", val)}
                  >
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
                  {...register("price")}
                  type="number"
                  defaultValue="0.00"
                  className="mt-1 h-10 rounded-md"
                />
              </div>

              {/* ICON */}
              <div>
                <Label className="text-xs font-bold uppercase">Icon</Label>
                <Button className="mt-2 bg-green-600 hover:bg-green-700 text-white h-9 px-4 rounded-md">
                  ADD ICON
                </Button>
              </div>
            </div>

            {/* ADD BUTTON */}
            <div>
              <Button className="bg-green-700 hover:bg-green-800 px-8 h-10 rounded-md w-full lg:w-3 mt-2 cursor-pointer">
                ADD
              </Button>
            </div>
          </form>
        </Popup>
      </Reusetable>
    </Reusesidebar>
  );
}
export default Service;
