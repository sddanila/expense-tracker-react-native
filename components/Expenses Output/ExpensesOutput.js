import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import ExpsensesList from "./ExpensesList";
import ExpenseSummary from "./ExpensesSummary";

export default function ExpensesOutput({ expenses, expensesPeriod, fallbackText }) {
  let content = <Text style={styles.infoText}>{fallbackText}</Text>

  if (expenses.length) {
    content = <ExpsensesList expenses={expenses} />
  }
  return (
    <View style={styles.container}>
      {/* SUMMARY */}
      <ExpenseSummary
        periodName={expensesPeriod}
        expenses={expenses}
        />
      {content}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
    flex: 1
  },
  infoText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32
  }
})
