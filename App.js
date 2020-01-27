import React from "react";
import MainNavigator from './navigations';

import { createAppContainer } from 'react-navigation';

const App = createAppContainer(MainNavigator);

export default App;