import React from "react";
import { Provider } from 'mobx-react';
import { createAppContainer } from "react-navigation";
import POIListStore from "./stores/POIListStore";

import MainNavigator from "./navigations";

const AppNavigation = createAppContainer(MainNavigator);

export default class App extends React.Component {
  constructor() {
    super();
    this.store = new POIListStore();
  }
  render() {
    return (
      <Provider POIListStore={this.store}>
        <AppNavigation />
      </Provider>
    );
  }
}
