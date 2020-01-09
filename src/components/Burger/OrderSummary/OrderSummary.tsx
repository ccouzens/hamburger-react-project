import React from 'react';
import { IngredientType } from '../../Burger/BurgerIngredient/BurgerIngredient.d';
import Button from '../../UI/Button/Button';

const orderSummary = (props: {
  ingredients: Map<IngredientType, number>;
  purchaseCancelled: () => void;
  purchaseContinued: () => void;
}) => {
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
      <Button btnType="Danger" clicked={props.purchaseCancelled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.purchaseContinued}>
        CONTINUE
      </Button>
    </>
  );
};

export default orderSummary;
