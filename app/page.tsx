const HomePage = () => {
  return (
    <section className="flex flex-col items-center w-full h-full gap-4 pt-8">
      <div className="flex flex-col items-center justify-center gap-4 w-[calc(100%-2rem)] max-w-2xl p-4">
        <h1 className="text-4xl font-bold text-center">
          Welcome to the Salary Calculator
        </h1>
        <p className="text-lg text-center">
          This is a simple salary calculator that allows you to convert between
          annual, periodic, and hourly salaries.
        </p>
      </div>
    </section>
  );
};

export default HomePage;
