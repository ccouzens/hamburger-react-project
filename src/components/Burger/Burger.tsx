import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.module.css';
import {
  IngredientType,
  INGREDIENT_TYPES
} from '../../components/Burger/BurgerIngredient/BurgerIngredient.d';

const burger = (props: { ingredients: Map<IngredientType, number> }) => {
  let transformedIngredients = [...props.ingredients]
    .map(([ingredient, quantity]) =>
      [...Array(quantity)].map((_, i) => (
        <BurgerIngredient key={ingredient + i} type={ingredient} />
      ))
    )
    .reduce((arr, el) => [...arr, ...el], []);
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients.length === 0 ? (
        <p>Please Start Adding ingredients!</p>
      ) : (
        transformedIngredients
      )}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
