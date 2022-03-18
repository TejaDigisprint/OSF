import {
  combineReducers,
  createReducer,
} from "@oracle-cx-commerce/store/utils";

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

let intialState = {
  wishListItems: [],
  wishListed:false
};

const wishListReducerReducer = (state = intialState, action) => {
  switch (action.type) {
    case "wishListReducer":
      // console.log(action.payload);
      return {
        ...state,
        wishListItems:
          state.wishListItems && action.payload
            ? [...state?.wishListItems, action.payload]
            : [action.payload],wishListed:true
      };
    case "wishListReducerRmove":
      const wishList = state.wishListItems
      const UpdatedWishList = wishList.filter((record)=>record.attributes["product.repositoryId"][0]!=action.payload)

      return {...state,wishListItems:UpdatedWishList,wishListed:false}
      
    default:
      return state;
  }
};

/**
 * The wishListReducer action.
 *
 * This exports an object with a "reducer" property specifying a set of reducer to
 * be associated with the action. Run API the first time the action is dispatched
 * via the store API.
 */

export default {
  reducer: combineReducers({
    wishList: createReducer({
      wishListReducer: wishListReducerReducer,
      wishListReducerRmove:wishListReducerReducer
    }),
  }),
};
