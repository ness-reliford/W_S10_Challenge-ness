import { configureStore } from '@reduxjs/toolkit'
import { pizzaSlice } from './pizzaSlice'
import { pizzaApi } from './pizzaApi'
import pizzaReducer from './pizzaSlice'

export const resetStore = () => configureStore({
  reducer: {
    pizzaReducer,
    pizza: pizzaSlice.actions,
    [pizzaApi.reducerPath]: pizzaApi.reducer,
  },
  middleware: getDefault => getDefault().concat(
    pizzaApi.middleware
  ),
})

export const store = resetStore()
