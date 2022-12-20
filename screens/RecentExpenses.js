import { useContext, useEffect, useState } from "react"
import { isLogBoxErrorMessage } from "react-native/Libraries/LogBox/Data/LogBoxData"
import ExpensesOutput from "../components/Expenses Output/ExpensesOutput"
import ErrorOverlay from "../components/ui/ErrorOverlay"
import LoadingOverlay from "../components/ui/LoadingOverlay"
import { ExpensesContext } from "../store/expenses-context"
import { getDateMinusDays } from "../util/date"
import { fetchExpenses } from "../util/http"

export default function RecentExpenses() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState()
  const expensesCtx = useContext(ExpensesContext)
  // const [fetchedExpenses, setFetchedExpenses] = useState([])

  useEffect(() => {
    async function getExpenses() {
      setLoading(true)
      try {
        const expenses = await fetchExpenses()
        expensesCtx.setExpenses(expenses)
      } catch (error) {
        setError('Could not fetch expenses!')
      }
      // setFetchedExpenses(expenses)
      setLoading(false)
    }

    getExpenses()
  }, [])

  function errorHandler() {
    setError(null)
  }

  if (loading) {
    return (
      <LoadingOverlay />
    )
  }

  if (error && !loading) {
    return (
      <ErrorOverlay message={error} onConfirm={errorHandler}/>
    )
  }

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
  // const recentExpenses = fetchedExpenses.filter((expense) => {
    const today = new Date()
    const date7DaysAgo = getDateMinusDays(today, 7)
    return (expense.date >= date7DaysAgo) && (expense.date <= today)
  })

  return (
    <ExpensesOutput
      expensesPeriod="Last 7 Days"
      expenses={recentExpenses}
      fallbackText="No recent expenses have been entered!"
    />
  )
}
