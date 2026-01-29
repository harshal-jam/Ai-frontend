import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
const DayOffRow = ({ day }) => {
  return (
    <div className="grid grid-cols-[110px_140px] items-center gap-3">
      <span className="text-sm text-gray-700">{day}</span>

      <Select defaultValue="off">
        <SelectTrigger className="h-9">
          <SelectValue placeholder="Day Off" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="off">Day Off</SelectItem>
          <SelectItem value="working">Working</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
export default DayOffRow;
