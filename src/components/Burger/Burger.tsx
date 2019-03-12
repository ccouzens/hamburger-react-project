import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.module.css';

const burger = (props: { ingredients: { [key: string]: number } }) => {
  let transformedIngredients = (['salad', 'bacon', 'cheese', 'meat'] as (
    | 'salad'
    | 'bacon'
    | 'cheese'
    | 'meat')[])
    .map(igKey => {
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        return <BurgerIngredient key={igKey + i} type={igKey} />;
      });
    })
    .reduce((arr, el) => [...arr, ...el], []);
  if (transformedIngredients.length === 0) {
    transformedIngredients = [<p>Please Start Adding ingredients!</p>];
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
