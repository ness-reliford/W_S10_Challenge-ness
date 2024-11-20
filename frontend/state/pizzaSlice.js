import { createSlice } from "@reduxjs/toolkit";

export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState: {
        orders: [],
        filterSize: 'All'
    },
    reducers: {
        setFilter: (state, action) => {
            state.filterSize = action.payload
        },
        addOrder: (state,action)=>{
            state.orders= [...state.orders, action.payload]
        }
        
    }
})

export const {
    setFilter
} = pizzaSlice.actions

//export const selectFilter = (state) => state.pizza.filter
export const selectOrders = (state) => state.pizza.orders

export default pizzaSlice.reducer