import React, { useReducer } from 'react'
import { useCreatePizzaMutation } from '../state/pizzaApi'

const CHANGE_NAME = 'CHANGE_NAME'
const CHANGE__SIZE = 'CHANGE_SIZE'
const CHANGE_TOPPINGS = 'CHANGE_TOPPINGS'


const initialFormState = { 
  fullName: '',
  size: '',
  toppings: []
}

const reducer = (state, action) => {
  switch(action.type){
    case CHANGE_NAME:
      return{...state, fullName: action.payload}
    case CHANGE__SIZE:
      return{...state, size: action.payload}
    case CHANGE_TOPPINGS:
      return{...state, toppings: action.payload}
    default:
        return state
  }
}

export default function PizzaForm() {
  //const [state, dispatch] = useReducer(reducer, initialFormState)
  //const [createPizza] = useCreatePizzaMutation()

  return (
    <form>
      <h2>Pizza Form</h2>
      {true && <div className='pending'>Order in progress...</div>}
      {true && <div className='failure'>Order failed: fullName is required</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input
            data-testid="fullNameInput"
            id="fullName"
            name="fullName"
            placeholder="Type full name"
            type="text"
          />
        </div>
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select data-testid="sizeSelect" id="size" name="size">
            <option value="">----Choose size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
      </div>

      <div className="input-group">
        <label>
          <input data-testid="checkPepperoni" name="1" type="checkbox" />
          Pepperoni<br /></label>
        <label>
          <input data-testid="checkGreenpeppers" name="2" type="checkbox" />
          Green Peppers<br /></label>
        <label>
          <input data-testid="checkPineapple" name="3" type="checkbox" />
          Pineapple<br /></label>
        <label>
          <input data-testid="checkMushrooms" name="4" type="checkbox" />
          Mushrooms<br /></label>
        <label>
          <input data-testid="checkHam" name="5" type="checkbox" />
          Ham<br /></label>
      </div>
      <input data-testid="submit" type="submit" />
    </form>
  )
}
