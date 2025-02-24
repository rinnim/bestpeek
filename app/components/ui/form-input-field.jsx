import InputText from "@/app/components/ui/input-text";
import Label from "@/app/components/ui/label";
import { twMerge } from "tailwind-merge";
export default function FormInputField({ className, error, ...props }) {
  return (
    <div className={twMerge("w-full relative", className)}>
      <Label {...props} />
      {props.required && (
        <span className="font-bold px-1 absolute text-error">*</span>
      )}
      <InputText {...props} />
      {error && <div className="text-error text-xs md:text-sm ">{error}</div>}
    </div>
  );
}
