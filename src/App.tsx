import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerLoader from './containers/BurgerLoader/BurgerLoader';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <BurgerLoader />
        </Layout>
      </div>
    );
  }
}

export default App;
