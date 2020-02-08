import React, { useState, useMemo, FunctionComponent, useEffect } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import {
  IngredientType,
  INGREDIENT_TYPES
} from '../../components/Burger/BurgerIngredient/BurgerIngredient.d';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../components/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

const INGREDIENT_PRICES: { [key in IngredientType]: number } = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

type IngredientCounts = Map<IngredientType, number>;

const calculatePrice = (ingredients: IngredientCounts | null) =>
  ingredients === null
    ? 0
    : [...ingredients].reduce(
        (sum, [ingredient, amount]) =>
          sum + INGREDIENT_PRICES[ingredient] * amount,
        4
      );

const calculatePurchasable = (ingredients: IngredientCounts | null) =>
  ingredients === null
    ? false
    : [...ingredients.values()].some(amount => amount > 0);

const calculateDisabledInfo = (ingredients: IngredientCounts | null) =>
  ingredients === null
    ? new Set<IngredientType>()
    : new Set([
        ...INGREDIENT_TYPES.filter(type => (ingredients.get(type) || 0) === 0)
      ]);

const BurgerBuilder: FunctionComponent<{}> = () => {
  const [ingredients, setIngredients] = useState<IngredientCounts | null>(null);
  const [purchasing, setPurchasing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const r = (
          await axios.get<{
            meat?: number;
            bacon?: number;
            cheese?: number;
            salad?: number;
          }>('/ingredients.json')
        ).data;
        setIngredients(new Map(INGREDIENT_TYPES.map(i => [i, r[i] || 0])));
      } catch (_err) {
        setIngredients(new Map(INGREDIENT_TYPES.map(i => [i, 0])));
      }
    })();
  }, []);

  const totalPrice = useMemo(() => calculatePrice(ingredients), [ingredients]);
  const purchasable = useMemo(() => calculatePurchasable(ingredients), [
    ingredients
  ]);
  const disabledInfo = useMemo(() => calculateDisabledInfo(ingredients), [
    ingredients
  ]);

  const addIngredientHandler = (type: IngredientType) => {
    if (ingredients === null) {
      return;
    }
    const oldCount = ingredients.get(type) || 0;
    const updatedCount = oldCount + 1;
    const updatedIngredients = new Map(ingredients);
    updatedIngredients.set(type, updatedCount);
    setIngredients(updatedIngredients);
  };

  const removeIngredientHandler = (type: IngredientType) => {
    if (ingredients === null) {
      return;
    }
    const oldCount = ingredients.get(type) || 0;
    const updatedCount = Math.max(oldCount - 1, 0);
    const updatedIngredients = new Map(ingredients);
    updatedIngredients.set(type, updatedCount);
    setIngredients(updatedIngredients);
  };

  const purchaseContinueHandler = async () => {
    if (ingredients === null) {
      return;
    }

    setLoading(true);
    const order = {
      ingredients: {
        meat: ingredients.get('meat') || 0,
        cheese: ingredients.get('cheese') || 0,
        salad: ingredients.get('salad') || 0,
        bacon: ingredients.get('bacon') || 0
      },
      price: totalPrice,
      customer: {
        name: 'Max Schwarzmüller',
        address: {
          street: 'Teststreet 1',
          zipCode: '41351',
          country: 'Germany'
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'fastest'
    };

    try {
      await axios.post('/orders.json', order);
    } catch (e) {
    } finally {
      setLoading(false);
      setPurchasing(false);
    }
  };
  return (
    <>
      <Modal show={purchasing} modalClosed={() => setPurchasing(false)}>
        {loading ? (
          <Spinner />
        ) : ingredients === null ? null : (
          <OrderSummary
            ingredients={ingredients}
            price={totalPrice}
            purchaseCancelled={() => setPurchasing(false)}
            purchaseContinued={purchaseContinueHandler}
          />
        )}
      </Modal>
      {ingredients !== null ? (
        <>
          <Burger ingredients={ingredients} />
          <BuildControls
            ordered={() => setPurchasing(true)}
            ingredientAdded={addIngredientHandler}
            ingredientRemoved={removeIngredientHandler}
            disabled={disabledInfo}
            price={totalPrice}
            purchasable={purchasable}
          />{' '}
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default withErrorHandler(BurgerBuilder, axios);
