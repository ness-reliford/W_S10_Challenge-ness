import { configureStore } from '@reduxjs/toolkit'
import { pizzaSlice } from './pizzaSlice'
import { pizzaApi } from './pizzaApi'


export const resetStore = () => configureStore({
  reducer: {
    pizza: pizzaSlice.actions,
    [pizzaApi.reducerPath]: pizzaApi.reducer,
  },
  middleware: getDefault => getDefault().concat(
    pizzaApi.middleware
  ),
})

export const store = resetStore()
