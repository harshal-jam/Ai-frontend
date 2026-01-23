import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
function TimeSelect({ defaultValue }) {
  return (
    <Select defaultValue={defaultValue}>
      <SelectTrigger >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {[
          "09:00 am",
          "10:00 am",
          "11:00 am",
          "12:00 pm",
          "01:00 pm",
          "02:00 pm",
          "03:00 pm",
          "04:00 pm",
          "05:00 pm",
          "06:00 pm",
        ].map((time) => (
          <SelectItem key={time} value={time}>
            {time}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
export default TimeSelect;