import React from 'react'
import { useGetPizzaQuery } from '../state/pizzaApi'

export default function OrderList() {
  const {data} = useGetPizzaQuery()
  console.log(data)

  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {
          data?.map((element) => {
            return (
              <li key={element.id}>
                <div>
                  {`${element.customer} ordered a size ${element.size} with ${element.toppings.length} toppings`}
                </div>
              </li>
            )
          })
        }
      </ol>
      <div id="sizeFilters">
        Filter by size:
        {
          ['All', 'S', 'M', 'L'].map(size => {
            const className = `button-filter${size === 'All' ? ' active' : ''}`
            return <button
              data-testid={`filterBtn${size}`}
              className={className}
              key={size}>{size}</button>
          })
        }
      </div>
    </div>
  )
}
