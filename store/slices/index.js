// redux/reducer/index.js
import { combineReducers } from 'redux';

//import authReducer from './authSlice'
import globalReducer from './globalSlice';
//import companyReducer from './companySlice';
// import wishlistReducer from './wishlistSlice';
// import addressReducer from './addressSlice';
// import cartReducer from './cartSlice';
//import productDetailsReducer from "./productDetailsSlice";
//import reviewReducer from "./prodReviewSlice";
import homeReducer from "./homeSlice";
import blogReducer from "./blogSlice";
import clientReducer from "./clientSlice";
import contactReducer from "./contactSlice";
import testimonialReducer from "./testimonialSlice";
import servicesReducer from "./servicesSlice";

const appReducer = combineReducers({
  home: homeReducer,
  blog: blogReducer,
  client: clientReducer,
  contact: contactReducer,
  testimonials: testimonialReducer,
  services: servicesReducer,
  global: globalReducer,
  //company: companyReducer,
  //productDetails: productDetailsReducer,
  //reviews: reviewReducer,
});

const removeState = (state) => {
  const newState = {};
  Object.entries(state || {}).forEach(([key, value]) => {
    if (['user', 'global'].includes(key)) {
      newState[key] = value;
    }
  });
  return newState;
};

const rootReducer = (state, action) => {
  if (action.type === 'RESET_LOGIN_DATA') {
    return appReducer(undefined, action);
  }

  if (action.type === 'RESET_STATE') {
    const newState = removeState(state);
    return appReducer(newState, action);
  }

  return appReducer(state, action);
};

export default rootReducer;
