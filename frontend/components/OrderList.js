import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useGetPizzaQuery } from '../state/pizzaApi'
import { setFilter } from '../state/pizzaSlice'

export default function OrderList() {
  const {data, error, isLoading, isSuccess} = useGetPizzaQuery()
  const filter = useSelector((state) => state.pizzaReducer.filterSize)
  const dispatch = useDispatch()
  console.log(data)
  console.log(error, isLoading, isSuccess)
  console.log(filter === 'All')
  
  const onClickHandler = (size) => {
    dispatch(setFilter(size))
  }

  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {
          data?.map((element) => {
          return(filter === 'All' || filter === element.size ?
          <li key={element.id}>
            <div>
              {`${element.customer} ordered a size ${element.size} with ${element?.toppings.length} toppings`}
            </div>
          </li> 
          : <div></div>)
           
         
        } ) }
      </ol>
    
      <div id="sizeFilters">
        Filter by size:
        {
          ['All', 'S', 'M', 'L'].map(size => {
            const className = `button-filter${size === filter ? ' active' : ''}`
            return <button
              data-testid={`filterBtn${size}`}
              className={className}
              key={size}
              onClick={() => onClickHandler(size)}
              >

                {size}
              
              </button>
          })
        }
      </div>
    </div>
  )
}
