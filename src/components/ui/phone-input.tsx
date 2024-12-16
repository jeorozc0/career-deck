import * as React from "react";
import * as RPNInput from "react-phone-number-input";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PhoneInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  value?: string;
  onChange?: (value: string) => void;
}

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ className, onChange, value, ...props }, ref) => {
    const [selectedCountry, setSelectedCountry] = React.useState("FI");

    const handleCountryChange = (newCountry: string) => {
      setSelectedCountry(newCountry);
    };

    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const phoneNumber = event.target.value;
      if (onChange) {
        // Add the country code if not present
        const formattedNumber = phoneNumber.startsWith("+")
          ? phoneNumber
          : `+${RPNInput.getCountryCallingCode(selectedCountry as RPNInput.Country)}${phoneNumber}`;
        onChange(formattedNumber);
      }
    };

    return (
      <div className="flex gap-2">
        <Select
          value={selectedCountry}
          onValueChange={handleCountryChange}
        >
          <SelectTrigger className="w-[100px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="FI">🇫🇮 +358</SelectItem>
            <SelectItem value="SE">🇸🇪 +46</SelectItem>
            <SelectItem value="NO">🇳🇴 +47</SelectItem>
            <SelectItem value="DK">🇩🇰 +45</SelectItem>
            <SelectItem value="GB">🇬🇧 +44</SelectItem>
            <SelectItem value="US">🇺🇸 +1</SelectItem>
          </SelectContent>
        </Select>
        <Input
          type="tel"
          ref={ref}
          value={value?.replace(/^\+\d+/, "") || ""}
          onChange={handlePhoneChange}
          className={cn("flex-1", className)}
          {...props}
        />
      </div>
    );
  }
);

PhoneInput.displayName = "PhoneInput";

export { PhoneInput };
