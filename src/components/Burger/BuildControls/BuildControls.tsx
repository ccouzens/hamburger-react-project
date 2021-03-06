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
  ingredientRemoved: (type: IngredientType) => void;
  disabled: Set<IngredientType>;
  price: number;
  purchasable: boolean;
  ordered: () => void;
}) => (
  <div className={classes.BuildControls}>
    <p>
      Current Price: <strong>{props.price.toFixed(2)}</strong>
    </p>
    {controls.map(ctrl => (
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        added={() => props.ingredientAdded(ctrl.type)}
        removed={() => props.ingredientRemoved(ctrl.type)}
        disabled={props.disabled.has(ctrl.type)}
      />
    ))}
    <button
      className={classes.OrderButton}
      disabled={!props.purchasable}
      onClick={props.ordered}
    >
      order now
    </button>
  </div>
);

export default buildControls;
