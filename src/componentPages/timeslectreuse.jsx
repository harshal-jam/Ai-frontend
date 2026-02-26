import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
const TimeSelect = ({ value, onChange }) => {
  return (
    <Select value={value} onValueChange={(val) => onChange(val)}>
      <SelectTrigger className="h-9">
        <SelectValue placeholder="Select time" />
      </SelectTrigger>
      <SelectContent>
        {[
          "09:00 am",
          "10:00 am",
          "12:00 pm",
          "01:00 pm",
          "06:00 pm",
        ].map((time) => (
          <SelectItem key={time} value={time}>
            {time}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default TimeSelect;