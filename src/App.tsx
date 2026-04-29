import Header from "@/components/common/Header";
import PersonsBox from "@/components/persons/PersonsBox";
import ExpensesBox from "@/components/expenses/ExpensesBox";
import StatsBox from "./components/stats/StatsBox";
import ExpenseContextProvider from "@/context/ExpenseContextProvider";

function App() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 text-white flex flex-col items-center p-10">
      <Header />
      <ExpenseContextProvider>
        <PersonsBox />
        <ExpensesBox />
        <StatsBox />
      </ExpenseContextProvider>
    </div>
  );
}

export default App;
