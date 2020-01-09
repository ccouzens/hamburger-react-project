import React, { Component } from 'react';

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

class BurgerBuilder extends Component {
  state: {
    ingredients: Map<IngredientType, number>;
    totalPrice: number;
    purchasable: boolean;
    purchasing: boolean;
  } = {
    ingredients: new Map(),
    totalPrice: 4,
    purchasable: false,
    purchasing: false
  };

  updatePurchaseState(ingredients: Map<IngredientType, number>) {
    this.setState({
      purchasable: [...ingredients.values()].some(amount => amount > 0)
    });
  }

  addIngredientHandler = (type: IngredientType) => {
    const oldCount = this.state.ingredients.get(type) || 0;
    const updatedCount = oldCount + 1;
    const updatedIngredients = new Map(this.state.ingredients);
    updatedIngredients.set(type, updatedCount);
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = (type: IngredientType) => {
    const oldCount = this.state.ingredients.get(type) || 0;
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = new Map(this.state.ingredients);
    updatedIngredients.set(type, updatedCount);
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  render() {
    const disabledInfo = new Set([
      ...INGREDIENT_TYPES.filter(
        type => (this.state.ingredients.get(type) || 0) == 0
      )
    ]);

    return (
      <>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          <OrderSummary ingredients={this.state.ingredients} />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ordered={this.purchaseHandler}
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
        />
      </>
    );
  }
}

export default BurgerBuilder;
