"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { set, z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { calculatePeriodicToAnnual } from "@/lib/calculations";

const periods = [
  {
    label: "Monthly",
    value: "monthly",
  },
  {
    label: "Bi-Weekly",
    value: "biweekly",
  },
  {
    label: "Weekly",
    value: "weekly",
  },
  {
    label: "Daily",
    value: "daily",
  },
  {
    label: "Hourly",
    value: "hourly",
  },
];

const formSchema = z.object({
  periodicSalary: z
    .number({
      message: "The annual salary is required.",
    })
    .positive(),
});

type PeriodType = "monthly" | "biweekly" | "weekly" | "daily" | "hourly" | null;
type ResultsType = string | null;

export const PeriodicToAnnual = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>(null);
  const [result, setResult] = useState<ResultsType>(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const { periodicSalary } = data;
    setResult(calculatePeriodicToAnnual(periodicSalary, selectedPeriod!));
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <h1 className="text-2xl font-bold text-center mt-10">
        Periodic to Annual Salary
      </h1>

      <div className="flex flex-col sm:flex-row w-full gap-4">
        <Select
          onValueChange={(value) => {
            setSelectedPeriod(value as PeriodType);
            if (form.formState.isValid) {
              setResult(
                calculatePeriodicToAnnual(
                  form.getValues("periodicSalary"),
                  value
                )
              );
            }
          }}
        >
          <SelectTrigger className="w-full sm:w-1/4">
            <SelectValue placeholder="Select A Period" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select A Period</SelectLabel>
              {periods.map((period) => (
                <SelectItem key={period.value} value={period.value}>
                  {period.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <div className="w-full flex flex-col gap-8">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-4 rounded-md p-4 bg-slate-900 shadow-md"
            >
              <FormField
                control={form.control}
                name="periodicSalary"
                render={({ field }: any) => (
                  <FormItem>
                    <FormLabel>Periodic Salary</FormLabel>
                    <Input
                      {...field}
                      type="number"
                      placeholder="Enter Periodic Salary"
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(parseFloat(value));
                      }}
                    />
                    <FormDescription>
                      Enter the periodic salary to convert to annual salary.
                    </FormDescription>
                    <FormMessage>
                      {form.formState.errors.periodicSalary?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              <Button
                onClick={form.handleSubmit(onSubmit)}
                disabled={!form.formState.isValid || !selectedPeriod}
                className="w-full"
              >
                Calculate
              </Button>
            </form>
          </Form>

          {result && !form.formState.errors.periodicSalary && (
            <div className="w-full space-y-4">
              <div className="w-full bg-slate-900 rounded-md p-4 shadow-md text-white space-y-4 text-center">
                <h2 className="text-xl font-bold mb-8">Result</h2>
                <div className="flex flex-wrap justify-center items-center gap-4">
                  <div className="flex flex-col gap-1 text-center">
                    <span className="font-bold capitalize">Annual Salary</span>
                    {result}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PeriodicToAnnual;
