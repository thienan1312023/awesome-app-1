import React from "react";
import { Provider } from "mobx-react";
import { createAppContainer } from "react-navigation";
import POIListStore from "./stores/POIListStore";

import createRootNavigator from "./navigations";
//import AppNavigation from "./navigations/sidebar";

export default class App extends React.Component {
  constructor() {
    super();
    this.store = new POIListStore();
  }
  render() {
    const Layout = createRootNavigator();
    return (
      <Provider POIListStore={this.store}>
        <Layout />
      </Provider>
    );
  }
}
