/**
 * author : Nidhi gadhavi
 * purpose : Root Reducer
 */

import { combineReducers } from 'redux';
import { authentication } from './authentication.reducer';
import { alert } from './alert.reducer';
import { salaryReview } from './salaryReview';

const rootReducer = combineReducers({
  authentication,  
  alert,  
  salaryReview
});

export default rootReducer;