import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {
  state: {
    ingredients: { salad: number; bacon: number; cheese: number; meat: number };
  } = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    }
  };

  render() {
    return (
      <>
        <Burger ingredients={this.state.ingredients} />
        <div>Build Controls</div>
      </>
    );
  }
}

export default BurgerBuilder;
