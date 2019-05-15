import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.module.css';
import {
  IngredientType,
  INGREDIENT_TYPES
} from '../../components/Burger/BurgerIngredient/BurgerIngredient.d';

const burger = (props: {
  ingredients: { [key in IngredientType]: number };
}) => {
  let transformedIngredients = INGREDIENT_TYPES.map(igKey => {
    return [...Array(props.ingredients[igKey])].map((_, i) => {
      return <BurgerIngredient key={igKey + i} type={igKey} />;
    });
  }).reduce((arr, el) => [...arr, ...el], []);
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
