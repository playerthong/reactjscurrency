import React from 'react';
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as convertcurrency from './src/models/convertcurrency';


export default ({ element }) => {
  // generate Redux store
  const store = init({
    convertcurrency,
  });
  return <Provider store={store}>{element}</Provider>
};

