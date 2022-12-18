import { StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import { useState } from "react";

import Button from "../ui/Button";
import { GlobalStyles } from "../../constants/styles";

import { getFormattedDate } from "../../util/date";


export default function ExpenseForm({ defaultValues, submitButtonLabel, onCancel, onSubmit }) {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : "",
      isValid: true
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true
    }
  })

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((prev) => {
      return {
        ...prev,
        [inputIdentifier]: { value: enteredValue, isValid: prev[inputIdentifier].isValid }
      }
    })
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value
    }

    const amountIsValid = expenseData.amount > 0 && !isNaN(expenseData.amount)
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date'
    const descriptionIsValid = expenseData.description.trim().length > 0

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      // show feedback
      setInputs((prev) => {
        return {
          amount: {
            value: prev.amount.value,
            isValid: amountIsValid
          },
          date: {
            value: prev.date.value,
            isValid: dateIsValid
          },
          description: {
            value: prev.description.value,
            isValid: descriptionIsValid
          }
        }
      })
      return
    }

    onSubmit(expenseData)
  }

  const formIsInvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label="Amount"
          style={styles.rowInput}
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: "decimalPad",
            onChangeText: inputChangedHandler.bind(this, "amount"),
            value: inputs['amount'].value
          }}
        />
        <Input
          label="Date"
          style={styles.rowInput}
          invalid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, "date"),
            value: inputs['date'].value
          }}
        />
      </View>
      <Input
        label="Description"
        invalid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          // autoCorrect: false,
          // autoCapitalize: 'sentences',
          onChangeText: inputChangedHandler.bind(this, "description"),
          value: inputs['description'].value
        }}
      />
      {formIsInvalid &&
        <Text style={styles.errorText}>Invalid entries - please check the data</Text>
      }
      <View style={styles.buttons}>
        <Button mode="flat" onPress={onCancel} style={styles.button}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  form: {
    marginTop: 40
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 24,
    textAlign: 'center'
  },
  rowInput: {
    flex: 1
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8
  },
  errorText: {
    color: GlobalStyles.colors.error500,
    textAlign: 'center',
    margin: 8
  }
})
