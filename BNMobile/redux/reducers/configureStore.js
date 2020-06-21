import {createStore, applyMiddleware} from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import rootReducer from './index'
import thunk from 'redux-thunk'
import AsyncStorage from '@react-native-community/async-storage';
const persistCongfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['loginReducer','alarmControlReducer']
}

const persistedReducer = persistReducer(persistCongfig, rootReducer)

export default function configureStore(){
    let store = createStore(persistedReducer,applyMiddleware(thunk))
    let persistor = persistStore(store)
    return { store, persistor}
}