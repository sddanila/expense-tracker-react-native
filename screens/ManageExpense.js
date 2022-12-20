import { useContext, useLayoutEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import ExpenseForm from "../components/ManageExpense/ExpenseForm"
import ErrorOverlay from "../components/ui/ErrorOverlay"
import IconButton from "../components/ui/IconButton"
import LoadingOverlay from "../components/ui/LoadingOverlay"

import { GlobalStyles } from "../constants/styles"
import { ExpensesContext } from "../store/expenses-context"
import { deleteExpense, storeExpense, updateExpense } from "../util/http"

export default function ManageExpense({ route, navigation }) {
  const editedExpenseId = route.params?.expenseId
  const isEditing = !!editedExpenseId
  const expensesCtx = useContext(ExpensesContext)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  const selectedExpense = expensesCtx.expenses.find(expense => expense.id === editedExpenseId)

  async function deleteExpressHandler() {
    setLoading(true)
    try {
      await deleteExpense(editedExpenseId)
      expensesCtx.deleteExpense(editedExpenseId)
      closeModal()
    } catch (error) {
      setError("Could not delete the expense, please try later!")
    }
    setLoading(false)
  }

  function cancelHandler() {
    closeModal()
  }

  async function confirmHandler(expenseData) {
    setLoading(true)
    try {
      if (isEditing) {
        expensesCtx.updateExpense(editedExpenseId, expenseData)
        await updateExpense(editedExpenseId, expenseData)
      } else {
        const id = await storeExpense(expenseData)
        expensesCtx.addExpense({ ...expenseData, id: id })
      }
      closeModal()
    } catch (error) {
      setError('Could not update expense, please try later!')
      setLoading(false)
    }
  }

  function closeModal() {
    navigation.goBack()
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense'
    })
  }, [navigation, isEditing])

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

  function errorHandler() {
    setError(null)
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        defaultValues={selectedExpense}
      />
      { isEditing &&
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpressHandler}
          />
        </View>
      }
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center'
  },
})
