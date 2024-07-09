export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

export const formatNumber = (value: number) => {
  return new Intl.NumberFormat("en-US").format(value);
};

export const formatPercentage = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: 2,
  }).format(value);
};

export const formatTime = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "unit",
    unit: "second",
  }).format(value);
};

export const formatDateTime = (value: string) => {
  return new Intl.DateTimeFormat("en-US").format(new Date(value));
};
