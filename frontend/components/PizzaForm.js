import React, { useReducer, useState } from 'react'
import { useCreatePizzaMutation, useGetPizzaQuery } from '../state/pizzaApi'

const CHANGE_NAME = 'CHANGE_NAME'
const CHANGE_SIZE = 'CHANGE_SIZE'
const TOGGLE_TOPPING = 'TOGGLE_TOPPING'
const RESET_FORM = 'RESET_FORM'

const initialFormState = { 
  fullName: '',
  size: '',
  toppings: []
}

const reducer = (state, action) => {
  switch(action.type){

    case CHANGE_NAME:
      return{...state, fullName: action.payload}

    case CHANGE_SIZE:
      return{...state, size: action.payload}

    case TOGGLE_TOPPING:
      {const { toppingId } = action.payload;
      return{...state, toppings:
         state.toppings.includes(toppingId)
      ? state.toppings.filter((id) => id !== toppingId)
      : [...state.toppings, toppingId],
      }}

    case RESET_FORM:
        return initialFormState;  

    default:
        return state
  }
}

export default function PizzaForm() {
  const [pizzaOrder,setPizzaOrder] = useState(initialFormState)
  const [state, dispatch] = useReducer(reducer, initialFormState)
  const [createPizza, { error: createPizzaError, isLoading, isError}] = useCreatePizzaMutation()
  const [error, setError] = useState("")
  const { refetch } = useGetPizzaQuery()
  //change handlers

  const handleNameChange = (evt) => {
    dispatch({ type: CHANGE_NAME, payload: evt.target.value})
  }

  const handleSizeChange = (evt) => {
    dispatch({ type: CHANGE_SIZE, payload: evt.target.value })
  }

  const handleToppingChange = (evt) => {
    const toppingId = evt.target.value;
    dispatch({ type: TOGGLE_TOPPING, payload: { toppingId } });
  };

  const handleSubmit = async(event) => {
    event.preventDefault()
    const { fullName, size, toppings } = state;
    try{
      await createPizza({fullName, size, toppings}).unwrap()
      // alert('Pizza order created successfully!')
      refetch()
      resetForm();
    } catch (err) {
      console.log(err)
      setError(err.data.message)
    }
  }

  const resetForm = () => {
    dispatch({ type: RESET_FORM})
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Pizza Form</h2>
      {isLoading && <div className='pending'>Order in progress...</div>}
      {isError && <div className='failure'>{`Order failed: ${error}`}</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input
            data-testid="fullNameInput"
            id="fullName"
            name="fullName"
            placeholder="Type full name"
            type="text"
            value={state.fullName}
            onChange={handleNameChange}
          />
        </div>
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select data-testid="sizeSelect" id="size" name="size" value={state.size} onChange={handleSizeChange}>
            <option value="">----Choose size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
      </div>

      <div className="input-group">
        <label>
          <input data-testid="checkPepperoni" name="1" type="checkbox" value={"1"} checked={state.toppings.includes("1")} onChange={handleToppingChange}/>
          Pepperoni<br /></label>
        <label>
          <input data-testid="checkGreenpeppers" name="2" type="checkbox" value={"2"}checked={state.toppings.includes("2")} onChange={handleToppingChange} />
          Green Peppers<br /></label>
        <label>
          <input data-testid="checkPineapple" name="3" type="checkbox" value={"3"}checked={state.toppings.includes("3")} onChange={handleToppingChange}/>
          Pineapple<br /></label>
        <label>
          <input data-testid="checkMushrooms" name="4" type="checkbox"value={"4"} checked={state.toppings.includes("4")} onChange={handleToppingChange}/>
          Mushrooms<br /></label>
        <label>
          <input data-testid="checkHam" name="5" type="checkbox" value={"5"}checked={state.toppings.includes("5")} onChange={handleToppingChange}/>
          Ham<br /></label>
      </div>
      <input data-testid="submit" type="submit" />
    </form>
  )
}
