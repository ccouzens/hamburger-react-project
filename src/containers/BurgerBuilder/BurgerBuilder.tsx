import React, { useState, useMemo } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import {
  IngredientType,
  INGREDIENT_TYPES
} from '../../components/Burger/BurgerIngredient/BurgerIngredient.d';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES: { [key in IngredientType]: number } = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

type IngredientCounts = Map<IngredientType, number>;

const calculatePrice = (ingredients: IngredientCounts) =>
  [...ingredients].reduce(
    (sum, [ingredient, amount]) => sum + INGREDIENT_PRICES[ingredient] * amount,
    4
  );

const calculatePurchasable = (ingredients: IngredientCounts) =>
  [...ingredients.values()].some(amount => amount > 0);

const calculateDisabledInfo = (ingredients: IngredientCounts) =>
  new Set([
    ...INGREDIENT_TYPES.filter(type => (ingredients.get(type) || 0) == 0)
  ]);

const burgerBuilder = () => {
  const [ingredients, setIngredients] = useState<IngredientCounts>(new Map());
  const [purchasing, setPurchasing] = useState(false);

  const totalPrice = useMemo(() => calculatePrice(ingredients), [ingredients]);
  const purchasable = useMemo(() => calculatePurchasable(ingredients), [
    ingredients
  ]);
  const disabledInfo = useMemo(() => calculateDisabledInfo(ingredients), [
    ingredients
  ]);

  const addIngredientHandler = (type: IngredientType) => {
    const oldCount = ingredients.get(type) || 0;
    const updatedCount = oldCount + 1;
    const updatedIngredients = new Map(ingredients);
    updatedIngredients.set(type, updatedCount);
    setIngredients(updatedIngredients);
  };

  const removeIngredientHandler = (type: IngredientType) => {
    const oldCount = ingredients.get(type) || 0;
    const updatedCount = Math.max(oldCount - 1, 0);
    const updatedIngredients = new Map(ingredients);
    updatedIngredients.set(type, updatedCount);
    setIngredients(updatedIngredients);
  };

  return (
    <>
      <Modal show={purchasing} modalClosed={() => setPurchasing(false)}>
        <OrderSummary
          ingredients={ingredients}
          price={totalPrice}
          purchaseCancelled={() => setPurchasing(false)}
          purchaseContinued={() => alert('You continue!')}
        />
      </Modal>
      <Burger ingredients={ingredients} />
      <BuildControls
        ordered={() => setPurchasing(true)}
        ingredientAdded={addIngredientHandler}
        ingredientRemoved={removeIngredientHandler}
        disabled={disabledInfo}
        price={totalPrice}
        purchasable={purchasable}
      />
    </>
  );
};

export default burgerBuilder;
