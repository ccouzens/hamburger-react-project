import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.module.css';
import {
  IngredientType,
  INGREDIENT_TYPES
} from '../../components/Burger/BurgerIngredient/BurgerIngredient.d';

const burger = (props: { ingredients: Map<IngredientType, number> }) => {
  let transformedIngredients = INGREDIENT_TYPES.map(ingredient => {
    return [...Array(props.ingredients.get(ingredient) || 0)].map((_, i) => {
      return <BurgerIngredient key={ingredient + i} type={ingredient} />;
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
