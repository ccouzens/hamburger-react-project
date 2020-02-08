import React, { useState, FunctionComponent, useEffect } from 'react';
import BurgerBuilder from '../BurgerBuilder/BurgerBuilder';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import {
  INGREDIENT_TYPES,
  IngredientType
} from '../../components/Burger/BurgerIngredient/BurgerIngredient.d';
import withErrorHandler from '../../components/withErrorHandler/withErrorHandler';

type IngredientCounts = Map<IngredientType, number>;

const BurgerLoader: FunctionComponent<{}> = () => {
  const [ingredients, setIngredients] = useState<IngredientCounts | null>(null);

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

  if (ingredients === null) {
    return <Spinner></Spinner>;
  }
  return <BurgerBuilder initialIngredients={ingredients} />;
};

export default withErrorHandler(BurgerLoader, axios);
