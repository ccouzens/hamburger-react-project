import React, { useState } from 'react';

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

const burgerBuilder = () => {
  const [ingredients, setIngredients] = useState<IngredientCounts>(new Map());
  const [totalPrice, setTotalPrice] = useState(4);
  const [purchasable, setPurchasable] = useState(false);
  const [purchasing, setPurchasing] = useState(false);

  const disabledInfo = new Set([
    ...INGREDIENT_TYPES.filter(type => (ingredients.get(type) || 0) == 0)
  ]);

  const updatePurchaseState = (ingredients: Map<IngredientType, number>) =>
    setPurchasable([...ingredients.values()].some(amount => amount > 0));

  const addIngredientHandler = (type: IngredientType) => {
    const oldCount = ingredients.get(type) || 0;
    const updatedCount = oldCount + 1;
    const updatedIngredients = new Map(ingredients);
    updatedIngredients.set(type, updatedCount);
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = totalPrice;
    const newPrice = oldPrice + priceAddition;
    setTotalPrice(newPrice);
    setIngredients(updatedIngredients);
    updatePurchaseState(updatedIngredients);
  };

  const removeIngredientHandler = (type: IngredientType) => {
    const oldCount = ingredients.get(type) || 0;
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = new Map(ingredients);
    updatedIngredients.set(type, updatedCount);
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = totalPrice;
    const newPrice = oldPrice - priceDeduction;
    setTotalPrice(newPrice);
    setIngredients(updatedIngredients);
    updatePurchaseState(updatedIngredients);
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
