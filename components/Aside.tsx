"use client";

import Link from "next/link";

import useStore from "@/lib/store";

const options = [
  {
    id: 1,
    label: "Annual to Periodic Salary Calculation",
    value: "annual",
  },
  {
    id: 2,
    label: "Periodic to Annual Salary Calculation",
    value: "periodic",
  },
  {
    id: 3,
    label: "Hourly to Annual Salary Calculation",
    value: "hourly",
  },
];

const Aside = () => {
  const { menuOpen, setMenuOpen } = useStore();

  return (
    <aside
      className={`h-screen p-4 bg-slate-950 ${
        menuOpen ? "absolute z-50" : "hidden"
      }`}
    >
      <h1 className="text-lg font-bold text-center">⚡Salary Calculator⚡</h1>

      <ul className="mt-4">
        {options.map((option) => (
          <li
            key={option.id}
            className="border-b p-4 border-slate-800 hover:bg-slate-800 transition-colors duration-200 ease-in-out text-center cursor-pointer h-12 flex items-center justify-center"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Link href={`/${option.value}`} className="text-xs py-8">
              <span className="mr-1">{"🔗"}</span>
              {option.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Aside;
