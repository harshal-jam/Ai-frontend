import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
function DayOffRow({ day }) {
  return (
    <div className="grid grid-cols-[120px_1fr] gap-3 items-center">
      <span className="text-sm font-medium">{day}</span>
      <Select defaultValue="day-off">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="day-off">Day Off</SelectItem>
          <SelectItem value="09:00 am">09:00 am</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
export default DayOffRow;
