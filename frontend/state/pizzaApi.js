import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pizzaApi = createApi({
    reducerPath: 'pizzaApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: `http://localhost:9009/api`
     }),
     endpoints: build => ({
        getPizza: build.query({
            query:() => 'pizza/history',
        }),
        createPizza: build.mutation({
            query: (pizzaData) => ({
              url: 'http://localhost:9009/api/pizza/order', 
              method: 'POST',
              body: pizzaData
            })
          })
     })
})

export const {
 useGetPizzaQuery, useCreatePizzaMutation
} = pizzaApi