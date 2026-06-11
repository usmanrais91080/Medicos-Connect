import AsyncStorage from '@react-native-async-storage/async-storage';
import { applyMiddleware, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import SetTransform from './stateTransform';

// added empty whitelist to solve loading button issue bc of cache
const persistConfig = {
    key: 'root',
    transforms: [SetTransform],
    storage: AsyncStorage,
    whitelist: ['']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);


let store = createStore(persistedReducer, applyMiddleware(thunk));
let persistor = persistStore(store);


export default store;

//const configureStore = () => {
//    return createStore(
//        rootReducer,
//        applyMiddleware(thunk)
//    );
//};

//export default configureStore;
