import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import serviceListReducer from '../reducers/serviceList';
import serviceCategoriesReducer from '../reducers/serviceCategories';
import serviceDataCategoriesReducer from '../reducers/serviceDataCategories';
import serviceSearchReducer from '../reducers/serviceSearch';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  serviceList: serviceListReducer,
  serviceCategories: serviceCategoriesReducer,
  serviceDataCategories: serviceDataCategoriesReducer,
  serviceSearch: serviceSearchReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
