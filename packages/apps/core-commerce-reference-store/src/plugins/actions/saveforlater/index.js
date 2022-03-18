import actions from '@oracle-cx-commerce/actions/currency/actions';
import {combineReducers, createReducer} from '@oracle-cx-commerce/store/utils';
/**
 * This is a contrived example of a reducer. It copies a value
 * from the action payload into a location in the application state.
 * The destination location is partially specified here and also in
 * the "reducer" property of this module's default export (see below).
 */

/**
 * Reducer that updates the application state. To run the reducer, please add a --reducer flag.
 * For example, yarn occ create-action --action-name getCurrency --endpoint _getCurrency --reducer.
 */
let initialState = {
  saveForLater:[]
}

const saveforlaterReducer = (state = initialState, action) => {
  switch(action.type){
    case "saveforlater":
      return {...state,saveforlater:state.saveforlater && action.payload ? [...state.saveforlater,action.payload] :action.payload?[action.payload]:state.saveforlater}; 
    case "saveforlaterremove":
      if(action.payload && action.payload.removeIndex>=0){
        state.saveforlater.splice(action.payload.removeIndex,1)
        return {...state,saveforlater:state.saveforlater}
      }
      else{
      return {...state}
    }
    default:
      return state
  }
};
/**
 * The saveforlater action.
 *
 * This exports an object with a "reducer" property specifying a set of reducer to
 * be associated with the action. Run API the first time the action is dispatched
 * via the store API.
 */
export default {
  reducer:  combineReducers({
    saveForLater:createReducer({
    saveforlater:saveforlaterReducer,
    saveforlaterremove:saveforlaterReducer
  })
})
};

// reducer: combineReducers({
//   saveForLater: createReducer({
//     saveforlater: saveforlaterReducer
//   })
// })