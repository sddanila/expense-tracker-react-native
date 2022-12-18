import { useContext } from "react"
import { Text } from "react-native"
import ExpensesOutput from "../components/Expenses Output/ExpensesOutput"
import { ExpensesContext } from "../store/expenses-context"

export default function AllExpenses() {
  const expensesCtx = useContext(ExpensesContext)
  return (
    <ExpensesOutput
      expensesPeriod="Total"
      expenses={expensesCtx.expenses}
      fallbackText="No expenses found!"
    />
  )
}
