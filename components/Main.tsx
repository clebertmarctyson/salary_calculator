"use client";

type Props = {
  children: React.ReactNode;
};

const Main = ({ children }: Props) => {
  return (
    <section className="bg-slate-950 rounded-lg p-4 flex-1 min-h-dvh">
      {children}
    </section>
  );
};

export default Main;
