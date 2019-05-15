import React from 'react';
import { IngredientType } from '../BurgerIngredient/BurgerIngredient.d';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls: { label: string; type: IngredientType }[] = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' }
];

const buildControls = (props: {
  ingredientAdded: (type: IngredientType) => void;
}) => (
  <div className={classes.BuildControls}>
    {controls.map(ctrl => (
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        added={() => props.ingredientAdded(ctrl.type)}
      />
    ))}
  </div>
);

export default buildControls;
