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
  hourlySalary: z
    .number({
      message: "The annual salary is required.",
    })
    .positive(),
  numberOfHoursPerDay: z
    .number({
      message: "The number of hours per day is required.",
    })
    .positive(),
  numberOfDaysPerWeek: z
    .number({
      message: "The number of days per week is required.",
    })
    .positive()
    .int(),
});

type ResultsType = {
  annualy: string;
  monthly: string;
  biweekly: string;
  weekly: string;
  daily: string;
} | null;

export const Hourly = () => {
  const [results, setResults] = useState<ResultsType>(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const { hourlySalary, numberOfHoursPerDay, numberOfDaysPerWeek } = data;

    const daily = hourlySalary * numberOfHoursPerDay;
    const weekly = daily * numberOfDaysPerWeek;
    const biweekly = weekly * 2;
    const monthly = biweekly * 2;
    const annualy = monthly * 12;

    setResults({
      annualy: formatCurrency(annualy),
      monthly: formatCurrency(monthly),
      biweekly: formatCurrency(biweekly),
      weekly: formatCurrency(weekly),
      daily: formatCurrency(daily),
    });
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <h1 className="text-2xl font-bold text-center mt-10">
        Hourly to Annual Salary
      </h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4 sm:w-3/4 rounded-md p-4 bg-slate-900 shadow-md"
        >
          <FormField
            control={form.control}
            name="hourlySalary"
            render={({ field }: any) => (
              <FormItem>
                <FormLabel>
                  Hourly Salary <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    placeholder="Please enter the hourly salary"
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(parseFloat(value));
                    }}
                  />
                </FormControl>
                <FormDescription>
                  The hourly salary of the employee.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="numberOfHoursPerDay"
            render={({ field }: any) => (
              <FormItem>
                <FormLabel>
                  Number of Hours Per Day{" "}
                  <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    placeholder="Please enter the number of hours per day"
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(parseFloat(value));
                    }}
                  />
                </FormControl>
                <FormDescription>
                  The number of hours the employee works per day.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="numberOfDaysPerWeek"
            render={({ field }: any) => (
              <FormItem>
                <FormLabel>
                  Number of Days Per Week{" "}
                  <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    placeholder="Please enter the number of days per week"
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(parseInt(value));
                    }}
                  />
                </FormControl>
                <FormDescription>
                  The number of days the employee works per week.
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

      {results &&
        !form.formState.errors.hourlySalary &&
        !form.formState.errors.numberOfHoursPerDay &&
        !form.formState.errors.numberOfDaysPerWeek && (
          <div className="w-full sm:w-3/4 space-y-4">
            <div className="bg-slate-900 rounded-md p-4 shadow-md text-white space-y-4">
              <h2 className="text-xl font-bold mb-8">Results</h2>
              <div className="flex flex-wrap justify-between items-center gap-4">
                <div className="flex flex-col gap-1 text-center">
                  <span className="font-bold">Daily</span> {results.daily}
                </div>
                <div className="flex flex-col gap-1 text-center">
                  <span className="font-bold">Weekly</span> {results.weekly}
                </div>
                <div className="flex flex-col gap-1 text-center">
                  <span className="font-bold">Bi-Weekly</span>{" "}
                  {results.biweekly}
                </div>
                <div className="flex flex-col gap-1 text-center">
                  <span className="font-bold">Monthly</span> {results.monthly}
                </div>
                <div className="flex flex-col gap-1 text-center">
                  <span className="font-bold">Annualy</span> {results.annualy}
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default Hourly;
