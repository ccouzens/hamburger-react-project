import React from 'react';
import { IngredientType } from '../../Burger/BurgerIngredient/BurgerIngredient.d';

const orderSummary = (props: { ingredients: Map<IngredientType, number> }) => {
  const ingredientSummary = [...props.ingredients].map(
    ([ingredient, amount]) => (
      <li key={ingredient}>
        <span style={{ textTransform: 'capitalize' }}>{ingredient}</span>:{' '}
        {amount}
      </li>
    )
  );
  return (
    <>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>Continue to Checkout?</p>
    </>
  );
};

export default orderSummary;
