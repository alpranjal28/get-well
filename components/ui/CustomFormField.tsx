"use client";
import {
  FormControl,
  FormField,
  FormLabel,
  FormDescription,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";

interface CustomFormFieldProps {
  control: Control<any>;
}

const CustomFormField = ({ control }: CustomFormFieldProps) => {
  return (
    <FormField
      control={control}
      name="username"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Username</FormLabel>
          <FormControl>
            <Input placeholder="shadcn" {...field} />
          </FormControl>
          <FormDescription>This is your public display name.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
