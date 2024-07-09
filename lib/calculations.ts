import { formatCurrency } from "@/lib/format";

export const calculatePeriodicToAnnual = (
  periodicSalary: number,
  selectedPeriod: string
) => {
  if (selectedPeriod === "monthly") {
    return formatCurrency(periodicSalary * 12);
  } else if (selectedPeriod === "biweekly") {
    return formatCurrency(periodicSalary * 2 * 12);
  } else if (selectedPeriod === "weekly") {
    return formatCurrency(periodicSalary * 4 * 12);
  } else if (selectedPeriod === "daily") {
    return formatCurrency(periodicSalary * 5 * 4 * 12);
  } else if (selectedPeriod === "hourly") {
    return formatCurrency(periodicSalary * 8 * 5 * 4 * 12);
  } else {
    return null;
  }
};
