"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { formatCurrency } from "@/lib/format";

const formSchema = z.object({
  annualSalary: z
    .number({
      message: "The annual salary is required.",
    })
    .positive(),
});

type ResultsType = {
  monthly: string;
  biweekly: string;
  weekly: string;
  daily: string;
  hourly: string;
} | null;

export const Page = () => {
  const [results, setResults] = useState<ResultsType>(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: any) => {
    const { annualSalary } = data;

    const monthly = annualSalary / 12;
    const biweekly = monthly / 2;
    const weekly = biweekly / 2;
    const daily = weekly / 5;
    const hourly = daily / 8;

    setResults({
      monthly: formatCurrency(monthly),
      biweekly: formatCurrency(biweekly),
      weekly: formatCurrency(weekly),
      daily: formatCurrency(daily),
      hourly: formatCurrency(hourly),
    });
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <h1 className="text-2xl font-bold text-center mt-10">
        Annual to Periodic Salary
      </h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4 sm:w-3/4 rounded-md p-4 bg-slate-900 shadow-md"
        >
          <FormField
            control={form.control}
            name="annualSalary"
            render={({ field }: any) => (
              <FormItem>
                <FormLabel>
                  Annual Salary <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    placeholder="Please enter the annual salary"
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(parseFloat(value));
                    }}
                  />
                </FormControl>
                <FormDescription>
                  The annual salary of the employee.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            onClick={form.handleSubmit(onSubmit)}
            disabled={!form.formState.isValid}
            className="w-full"
          >
            Calculate
          </Button>
        </form>
      </Form>

      {results && form.formState.errors.annualSalary === undefined && (
        <div className="w-full sm:w-3/4 space-y-4">
          <div className="bg-slate-900 rounded-md p-4 shadow-md text-white space-y-4">
            <h2 className="text-xl font-bold mb-8">Results</h2>
            <div className="flex flex-wrap justify-between items-center gap-4">
              <div className="flex flex-col gap-1 text-center">
                <span className="font-bold">Monthly</span> {results.monthly}
              </div>
              <div className="flex flex-col gap-1 text-center">
                <span className="font-bold">Bi-Weekly</span> {results.biweekly}
              </div>
              <div className="flex flex-col gap-1 text-center">
                <span className="font-bold">Weekly</span> {results.weekly}
              </div>
              <div className="flex flex-col gap-1 text-center">
                <span className="font-bold">Daily</span> {results.daily}
              </div>
              <div className="flex flex-col gap-1 text-center">
                <span className="font-bold">Hourly</span> {results.hourly}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
