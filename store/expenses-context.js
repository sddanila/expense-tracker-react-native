import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    description: 'shoes',
    amount: 59.99,
    date: new Date('2022-12-09')
  },
  {
    id: 'e2',
    description: 'slippers',
    amount: 29.99,
    date: new Date('2022-11-07')
  },
  {
    id: 'e3',
    description: 'toy',
    amount: 19.99,
    date: new Date('2022-10-13')
  },
  {
    id: 'e4',
    description: 'book',
    amount: 12.99,
    date: new Date('2022-09-13')
  },
  {
    id: 'e5',
    description: 'food',
    amount: 8.99,
    date: new Date('2022-04-18')
  },
  {
    id: 'e6',
    description: 'shoes',
    amount: 59.99,
    date: new Date('2022-12-09')
  },
  {
    id: 'e7',
    description: 'slippers',
    amount: 29.99,
    date: new Date('2022-11-07')
  },
  {
    id: 'e8',
    description: 'toy',
    amount: 19.99,
    date: new Date('2022-10-13')
  },
  {
    id: 'e9',
    description: 'book',
    amount: 12.99,
    date: new Date('2022-09-13')
  },
  {
    id: 'e10',
    description: 'food',
    amount: 8.99,
    date: new Date('2022-04-18')
  }
]

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {console.log("UPDATED")},
  setExpenses: (expenses) => {},
  deleteExpense: (id) => {},
  updateExpense: ( id, { description, amount, date }) => {console.log("UPDATED")},
})

function expensesReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      // const id = new Date().toString() + Math.random().toString()
      return [...action.payload, ...state]
    case 'SET':
      return action.payload.reverse()
    case 'UPDATE':
      const updatableExpenseIndex = state.findIndex((expense) => expense.id === action.payload.id)
      const updatableExpense = state[updatableExpenseIndex]
      const updatedItem = { ...updatableExpense, ...action.payload.data }
      const updatedExpenses = [...state]
      updatedExpenses[updatableExpenseIndex] = updatedItem
      return updatedExpenses
    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload)
    default:
      return state
  }
}

export default function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, [])

  function addExpense(expenseData) {
    dispatch({ type: 'ADD', payload: expenseData })
  }

  function setExpenses(expenses) {
    dispatch({type: 'SET', payload: expenses})
  }

  function deleteExpense(id) {
    dispatch({ type: 'DELETE', payload: id })
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: 'UPDATE', payload: { id: id, data: expenseData }})
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    setExpenses: setExpenses,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense
  }

  return (
    <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
  )
}
