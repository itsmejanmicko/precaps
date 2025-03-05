import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SelectCourseProps {
  value: string;
  onChange: (value: string) => void;
}

export function SelectCourse({ value, onChange }: SelectCourseProps) {
  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger className="border-[#D4AF37]/30 focus:ring-[#800000]">
        <SelectValue placeholder="Select your course" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="bsit">BS Information Technology</SelectItem>
        <SelectItem value="bscs">BS Computer Science</SelectItem>
      </SelectContent>
    </Select>
  );
}
