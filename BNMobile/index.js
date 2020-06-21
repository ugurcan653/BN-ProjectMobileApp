/**
 * @format
 */
import React from "react";
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Provider } from "react-redux";
import configureStore from "./redux/reducers/configureStore";
import { PersistGate } from 'redux-persist/integration/react';
import { BeaconMonitoringAndRanging } from "./beaconMonitoringAndRanging";
const store = configureStore().store;
const persistor = configureStore().persistor;
const Root = () => (
 
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
AppRegistry.registerComponent(appName, () => Root );
