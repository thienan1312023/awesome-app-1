import React from "react";
import { createAppContainer } from 'react-navigation';

import MainNavigator from './navigations';

const App = createAppContainer(MainNavigator);

export default App;